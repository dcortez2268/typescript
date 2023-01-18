//
// CLASSES
//
//abstract keyword has to be added if there is 1 or more abstract methods
abstract class Department {
    // private id: string
    // name: string
    protected employees: string[] = [] // initializing here same as in constructor fn
    //protected modifier is like private with difference that employees will be available in inherited classes

    constructor(protected readonly id: string, public name: string) {
        //shorthand for initializing
        // this.id = id
        // this.name = n
    }

    // static method and property
    static fiscalYear = 2023
    static createEmployee(name: string) {
        return { name, yearOfHire: Department.fiscalYear }
    }

    // abstract methods do not provide implementation
    abstract describe(this: Department): void
    // setting this type lets ts know this should always reference an instance of Department

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    printEmployeeInformation() {
        console.log(this.employees.length)
        console.log(this.employees)
    }
}

//
// INHERITANCE
//
class ITDepartment extends Department {
    // private static instance used for singleton pattern
    private static instance: ITDepartment
    private lastReport: string

    // getters and setters allow you to get and set properties with dot notation
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport
        }
        throw new Error('No report found')
    }
    set mostRecentReport(report: string) {
        if (!report) {
            throw new Error('Please pass in valid report')
        }
        this.addReport(report)
    }

    //base constructor by default is called if we do not add a constructor
    private constructor(id: string, private reports: string[]) {
        super(id, 'IT')
        //if you want to use 'this' in constructor, it has to be after super
        this.lastReport = reports[0]
    }

    // singleton design pattern method that implements private constructor
    static getInstance() {
        if (this.instance) {
            return this.instance //ITDepartment.instance === this.instance
        }
        ITDepartment.instance = new ITDepartment('d2', [])
        return this.instance
    }

    addEmployee(name: string) {
        if (name === 'max') {
            return
        }
        this.employees.push(name)
    }

    private addReport(text: string) {
        this.reports.push(text)
        this.lastReport = text
    }

    //abstract method implementation
    describe() {
        console.log(`IT department id is: ${this.id}`)
    }
}
// static method and property
const employee1 = Department.createEmployee('raelynn')
console.log(employee1)

// const business = new Department('b1', 'business')
// business.addEmployee('max')
// business.addEmployee('dominick')
// console.log(business)

// const newBusiness = new ITDepartment("d2", [])
const newBusiness = ITDepartment.getInstance()! // implements singleton pattern
newBusiness.addEmployee('max')
newBusiness.addEmployee('dominick')
newBusiness.mostRecentReport = 'report 4'
newBusiness.mostRecentReport = 'report 2'
console.log(newBusiness)

//
//  INTERFACES
//
interface Greetable extends Named {
    greet(phrase: string): void
}
interface Named {
    readonly name: string
    optionalName?: string
    optionalMethod?(n1: number): string
}

class Person implements Greetable, Named {
    constructor(public name: string, public age: number = 29) {}
    greet(phrase: string) {
        console.log(
            `${phrase}, my name is ${this.name} and I am ${this.age} yrs old`
        )
    }
}
let user1: Greetable
user1 = new Person('Dominick')
console.log(user1.greet('Yo'))

// implementing function types via interfaces
interface AddFn {
    (a: number, b: number): number
}
let add: AddFn
add = (n1: number, n2: number) => n1 + n2
