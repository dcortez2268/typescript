namespace App {
    export class ProjectItem
        extends Component<HTMLUListElement, HTMLLIElement>
        implements Draggable
    {
        private project: Project

        get people() {
            if (this.project.people === 1) {
                return '1 Person'
            } else {
                return `${this.project.people} People`
            }
        }

        constructor(hostId: string, project: Project) {
            super('single-project', hostId, false, project.id)
            this.project = project

            this.configure()
            this.renderContent()
        }

        @Autobind
        dragStartHandler(event: DragEvent): void {
            event.dataTransfer!.setData('text/plain', this.project.id)
            event.dataTransfer!.effectAllowed = 'move'
        }

        @Autobind
        dragEndHandler(event: DragEvent): void {}

        configure(): void {
            this.element.addEventListener('dragstart', this.dragStartHandler)
            this.element.addEventListener('dragend', this.dragEndHandler)
        }

        renderContent(): void {
            this.element.querySelector('h2')!.textContent = this.project.title
            this.element.querySelector('h3')!.textContent = this.people
            this.element.querySelector('p')!.textContent =
                this.project.description
        }
    }
}
