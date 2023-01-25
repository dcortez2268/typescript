//
//
//  DECORATORS
//
//
//
//
// FIRST CLASS DECORATOR
function Logger(constructor: Function) {
    console.log('Logging...')
    console.log(constructor)
}
@Logger
class Person {
    name = 'Max'
    constructor() {
        console.log('Creating person object...')
    }
}
const person = new Person()
//
//
// DECORATOR FACTORY
function Logger2(logString: string) {
    return function (constructor: Function) {
        console.log(logString)
        console.log(constructor)
    }
}
@Logger
@Logger2('Logger string')
class Person2 {
    name = 'Mike'
    constructor() {
        console.log('Creating a person2 object')
    }
}
const person2 = new Person2()
//
//
// PROPERTY, ACCESSOR, METHOD, AND PARAMETER DECORATORS
function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!')
    console.log(target, propertyName)
}
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}
function Log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
) {
    console.log('Method decorator!')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}
function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!')
    console.log(target)
    console.log(name)
    console.log(position)
}
class Product {
    @Log
    title: string
    constructor(t: string, private _price: number) {
        this.title = t
    }
    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            throw new Error('Price must be greater than zero')
        }
    }
    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax)
    }
}
//
//
// RETURNING AND CHANGING A CLASS IN A CLASS DECORATOR
function WithTemplate(template: string, hookId: string) {
    console.log('template factory')
    return function <T extends { new (...args: any[]): { name: string } }>(
        originalConstructor: T
    ) {
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super()
                console.log('rendering template')
                const hookEl = document.getElementById(hookId)
                if (hookEl) {
                    hookEl.innerHTML = template
                    hookEl.querySelector('h1')!.textContent = this.name
                }
            }
        }
    }
}
@WithTemplate('<h1> My Person Object </h1>', 'hook')
class Person5 {
    name = 'Max'
    constructor() {
        console.log('Creating person object...')
    }
}
const person5 = new Person5()
//
//
// CREATING AN AUTOBIND DECORATOR
function Autobind(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        },
    }
    return adjDescriptor
}
class Printer {
    message = 'this works!'
    @Autobind
    showMessage() {
        console.log(this.message)
    }
}
const p = new Printer()
const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)
//
//
// VALIDATION WITH DECORATORS
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] // Class: { price : ['required', 'positive'],
        //   title: ['required']
        // }
    }
}
const registeredValidators: ValidatorConfig = {}
function Required(target: any, propName: string) {
    //target.constructor.name = "Class"
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required'],
    }
}
function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive'],
    }
}
function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name]
    if (!objValidatorConfig) return true
    for (const prop in objValidatorConfig) {
        console.log(`prop is:`, prop)
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    if (obj[prop].trim() === '') {
                        return false
                    }
                case 'positive':
                    if (+obj[prop] < 1) {
                        return false
                    }
            }
        }
    }
    return true
}
class Course {
    @Required
    title: string
    @PositiveNumber
    price: number

    constructor(t: string, p: number) {
        this.title = t
        this.price = p
    }
}
const courseForm = document.querySelector('form')
courseForm?.addEventListener('submit', (event) => {
    event.preventDefault()
    const titleEl = document.getElementById('title') as HTMLInputElement
    const priceEl = document.getElementById('price') as HTMLInputElement
    const title = titleEl.value
    const price = +priceEl.value

    const createdCourse = new Course(title, price)
    if (!validate(createdCourse)) {
        alert('invalid input, please try again!')
        return
    }
    console.log(createdCourse)
})
