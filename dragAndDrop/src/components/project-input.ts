import Component from './base-component'
import { Autobind } from '../decorators/autobind'
import { projectState } from '../state/project'
import { Validatable, validate } from '../util/validation'

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        super('project-input', 'app', true, 'user-input')

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
        this.renderContent()
    }

    @Autobind
    private submitHandler(e: Event) {
        e.preventDefault()
        const userInput = this.gatherUserInput()
        // if valid input is given, userInput will be tuple
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput
            projectState.addProject(title, desc, people)
        }
        this.clearInputs()
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler)
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
            min: 0,
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

    renderContent(): void {}

    private clearInputs() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }
}
