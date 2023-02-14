namespace App {
    type Listener<T> = (items: T[]) => void

    abstract class State<T> {
        protected listeners: Listener<T>[] = []

        addListener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn)
        }
    }

    export class ProjectState extends State<Project> {
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
            this.updateListeners()
        }

        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find((p) => {
                return p.id === projectId
            })
            if (project && project.status !== newStatus) {
                project.status = newStatus
                this.updateListeners()
            }
        }

        private updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice()) // slice method returns shallow copy of array
            }
        }
    }
    export const projectState = ProjectState.getInstance()
}
