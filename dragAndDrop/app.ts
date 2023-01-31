//
//
// validation
interface Validatable {
    value: string | number
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
}

function validate(input: Validatable) {
    let isValid = true
    if (input.required) {
        isValid = isValid && input.value.toString().trim().length !== 0
    }
    if (input.minLength != null && typeof input.value === 'string') {
        isValid = isValid && input.value.length >= input.minLength
    }
    if (input.maxLength != null && typeof input.value === 'string') {
        isValid = isValid && input.value.length <= input.maxLength
    }
    if (input.min != null && typeof input.value === 'number') {
        isValid = isValid && input.value >= input.min
    }
    if (input.max != null && typeof input.value === 'number') {
        isValid = isValid && input.value <= input.max
    }
    return isValid
}

//
//
// autobind decorator
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

//
//
// ProjectInput Class
class ProjectInput {
    templateElement: HTMLTemplateElement
    app: HTMLElement
    element: HTMLFormElement
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        this.templateElement = document.getElementById(
            'project-input'
        )! as HTMLTemplateElement
        this.app = document.getElementById('app')! as HTMLDivElement

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        )
        this.element = importedNode.firstElementChild as HTMLFormElement
        this.element.id = 'user-input'

        this.titleInputElement = this.element.querySelector(
            '#title'
        )! as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector(
            '#description'
        )! as HTMLInputElement
        this.peopleInputElement = this.element.querySelector(
            '#people'
        )! as HTMLInputElement

        this.configure()
        this.attach()
    }

    @Autobind
    private submitHandler(e: Event) {
        e.preventDefault()
        const userInput = this.gatherUserInput()
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput
            console.log(title, desc, people)
        }
        this.clearInputs()
    }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value
        const enteredDescription = this.descriptionInputElement.value
        const enteredPeople = this.peopleInputElement.value

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        }
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 5,
            max: 20,
        }

        if (
            validate(
                titleValidatable && descriptionValidatable && peopleValidatable
            )
        ) {
            return [enteredTitle, enteredDescription, +enteredPeople]
        } else {
            alert('invalid input, please try again')
            return
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }
    private attach() {
        this.app.insertAdjacentElement('afterbegin', this.element)
    }

    private clearInputs() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }
}
const projInput = new ProjectInput()
console.log('hello')
