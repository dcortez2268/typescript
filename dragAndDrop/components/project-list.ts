namespace App {
    export class ProjectList
        extends Component<HTMLDivElement, HTMLElement>
        implements DragTarget
    {
        assignedProjects: Project[] = []

        constructor(private status: ProjectStatus) {
            super(
                'project-list',
                'app',
                false,
                `${ProjectStatus[status]}-projects`
            )
            this.configure()
            this.renderContent()
        }

        @Autobind
        dragOverHandler(event: DragEvent): void {
            if (event.dataTransfer?.types[0] === 'text/plain') {
                event.preventDefault()
                const ulEl = document.getElementById(
                    `${ProjectStatus[this.status]}-projects-list`
                )!
                ulEl.classList.add('droppable')
            }
        }

        @Autobind
        dropHandler(event: DragEvent): void {
            const prjId = event.dataTransfer?.getData('text/plain')!
            projectState.moveProject(prjId, this.status)
        }

        @Autobind
        dragLeaveHandler(event: DragEvent): void {
            const ulEl = document.getElementById(
                `${ProjectStatus[this.status]}-projects-list`
            )! as HTMLUListElement
            ulEl.classList.remove('droppable')
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler)
            this.element.addEventListener('dragleave', this.dragLeaveHandler)
            this.element.addEventListener('drop', this.dropHandler)

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
            const ulEl = document.getElementById(
                `${ProjectStatus[this.status]}-projects-list`
            )! as HTMLUListElement
            ulEl.textContent = ''

            for (const project of this.assignedProjects) {
                if (project.status === this.status) {
                    new ProjectItem(`${this.element.id}-list`, project)
                }
            }
        }
    }
}
