var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ProjectStatus } from '../models/project';
import Component from './base-component';
import { Autobind } from '../decorators/autobind';
import { projectState } from '../state/project';
import { ProjectItem } from '../components/project-item';
export class ProjectList extends Component {
    constructor(status) {
        super('project-list', 'app', false, `${ProjectStatus[status]}-projects`);
        this.status = status;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        var _a;
        if (((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types[0]) === 'text/plain') {
            event.preventDefault();
            const ulEl = document.getElementById(`${ProjectStatus[this.status]}-projects-list`);
            ulEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        var _a;
        const prjId = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text/plain');
        projectState.moveProject(prjId, this.status);
    }
    dragLeaveHandler(event) {
        const ulEl = document.getElementById(`${ProjectStatus[this.status]}-projects-list`);
        ulEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${ProjectStatus[this.status]}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = `${ProjectStatus[this.status]} PROJECTS`;
    }
    renderProjects() {
        const ulEl = document.getElementById(`${ProjectStatus[this.status]}-projects-list`);
        ulEl.textContent = '';
        for (const project of this.assignedProjects) {
            if (project.status === this.status) {
                new ProjectItem(`${this.element.id}-list`, project);
            }
        }
    }
}
__decorate([
    Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dragLeaveHandler", null);
