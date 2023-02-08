//
//
// PROJECT CLASS
enum ProjectStatus {
    Active,
    Finished,
}
class Project {
    public id
    constructor(
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {
        this.id = Math.random().toString()
    }
}
//
//
//
//
// PROJECT STATE MANAGEMENT
type Listener<T> = (items: T[]) => void

abstract class State<T> {
    protected listeners: Listener<T>[] = []

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn)
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = []
    private static instance: ProjectState

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        } else {
            this.instance = new ProjectState()
            return this.instance
        }
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(
            title,
            description,
            people,
            ProjectStatus.Active
        )
        this.projects.push(newProject)
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()) // slice method returns shallow copy of array
        }
    }
}
const projectState = ProjectState.getInstance()
//
//
//
//
// VALIDATION
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
//
//
// AUTOBIND DECORATOR
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
//
//
// COMPONENT CLASS
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement
    hostElement: T
    element: U

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string
    ) {
        this.templateElement = document.getElementById(
            templateId
        )! as HTMLTemplateElement
        this.hostElement = document.getElementById(hostElementId)! as T

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        )
        this.element = importedNode.firstElementChild as U
        if (newElementId) {
            this.element.id = newElementId
        }

        this.attach(insertAtStart)
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin' : 'beforeend',
            this.element
        )
    }

    abstract configure(): void
    abstract renderContent(): void
}
//
//
//
//
// ProjectList CLASS
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[] = []

    constructor(private status: ProjectStatus) {
        super('project-list', 'app', false, `${ProjectStatus[status]}-projects`)
        this.configure()
        this.renderContent()
    }

    configure() {
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects
            this.renderProjects()
        })
    }
    renderContent() {
        const listId = `${ProjectStatus[this.status]}-projects-list`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = `${
            ProjectStatus[this.status]
        } PROJECTS`
    }
    private renderProjects() {
        const listEl = document.getElementById(
            `${ProjectStatus[this.status]}-projects-list`
        )! as HTMLUListElement
        listEl.textContent = ''

        for (const project of this.assignedProjects) {
            if (project.status === this.status) {
                const listItem = document.createElement('li')
                listItem.textContent = project.title
                listEl.appendChild(listItem)
            }
        }
    }
}
//
//
//
//
// ProjectInput CLASS
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

const projInput = new ProjectInput()
const activeProjectList = new ProjectList(ProjectStatus.Active)
const finishedProjectList = new ProjectList(ProjectStatus.Finished)
