var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("components/base-component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Component = void 0;
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    exports.Component = Component;
});
define("decorators/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Autobind = void 0;
    function Autobind(target, methodName, descriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            enumerable: false,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjDescriptor;
    }
    exports.Autobind = Autobind;
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Project = exports.ProjectStatus = void 0;
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
    class Project {
        constructor(title, description, people, status) {
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
            this.id = Math.random().toString();
        }
    }
    exports.Project = Project;
});
define("state/project", ["require", "exports", "models/project"], function (require, exports, project_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.projectState = exports.ProjectState = void 0;
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            else {
                this.instance = new ProjectState();
                return this.instance;
            }
        }
        addProject(title, description, people) {
            const newProject = new project_js_1.Project(title, description, people, project_js_1.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((p) => {
                return p.id === projectId;
            });
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice()); // slice method returns shallow copy of array
            }
        }
    }
    exports.ProjectState = ProjectState;
    exports.projectState = ProjectState.getInstance();
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validate = void 0;
    function validate(input) {
        let isValid = true;
        if (input.required) {
            isValid = isValid && input.value.toString().trim().length !== 0;
        }
        if (input.minLength != null && typeof input.value === 'string') {
            isValid = isValid && input.value.length >= input.minLength;
        }
        if (input.maxLength != null && typeof input.value === 'string') {
            isValid = isValid && input.value.length <= input.maxLength;
        }
        if (input.min != null && typeof input.value === 'number') {
            isValid = isValid && input.value >= input.min;
        }
        if (input.max != null && typeof input.value === 'number') {
            isValid = isValid && input.value <= input.max;
        }
        return isValid;
    }
    exports.validate = validate;
});
define("components/project-input", ["require", "exports", "components/base-component", "decorators/autobind", "state/project", "util/validation"], function (require, exports, base_component_js_1, autobind_1, project_js_2, validation_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectInput = void 0;
    class ProjectInput extends base_component_js_1.Component {
        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInputElement = this.element.querySelector('#title');
            this.descriptionInputElement = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
            this.renderContent();
        }
        submitHandler(e) {
            e.preventDefault();
            const userInput = this.gatherUserInput();
            // if valid input is given, userInput will be tuple
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                project_js_2.projectState.addProject(title, desc, people);
            }
            this.clearInputs();
        }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
        gatherUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable = {
                value: +enteredPeople,
                required: true,
                min: 0,
                max: 20,
            };
            if ((0, validation_js_1.validate)(titleValidatable && descriptionValidatable && peopleValidatable)) {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
            else {
                alert('invalid input, please try again');
                return;
            }
        }
        renderContent() { }
        clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }
    }
    __decorate([
        autobind_1.Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    exports.ProjectInput = ProjectInput;
});
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/project-item", ["require", "exports", "components/base-component", "decorators/autobind"], function (require, exports, base_component_js_2, autobind_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectItem = void 0;
    class ProjectItem extends base_component_js_2.Component {
        get people() {
            if (this.project.people === 1) {
                return '1 Person';
            }
            else {
                return `${this.project.people} People`;
            }
        }
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(event) { }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.people;
            this.element.querySelector('p').textContent = this.project.description;
        }
    }
    __decorate([
        autobind_2.Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        autobind_2.Autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    exports.ProjectItem = ProjectItem;
});
define("components/project-list", ["require", "exports", "components/base-component", "models/project", "decorators/autobind", "state/project", "components/project-item"], function (require, exports, base_component_js_3, project_js_3, autobind_js_1, project_js_4, project_item_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ProjectList = void 0;
    class ProjectList extends base_component_js_3.Component {
        constructor(status) {
            super('project-list', 'app', false, `${project_js_3.ProjectStatus[status]}-projects`);
            this.status = status;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            var _a;
            if (((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.types[0]) === 'text/plain') {
                event.preventDefault();
                const ulEl = document.getElementById(`${project_js_3.ProjectStatus[this.status]}-projects-list`);
                ulEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            var _a;
            const prjId = (_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text/plain');
            project_js_4.projectState.moveProject(prjId, this.status);
        }
        dragLeaveHandler(event) {
            const ulEl = document.getElementById(`${project_js_3.ProjectStatus[this.status]}-projects-list`);
            ulEl.classList.remove('droppable');
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);
            project_js_4.projectState.addListener((projects) => {
                this.assignedProjects = projects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${project_js_3.ProjectStatus[this.status]}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = `${project_js_3.ProjectStatus[this.status]} PROJECTS`;
        }
        renderProjects() {
            const ulEl = document.getElementById(`${project_js_3.ProjectStatus[this.status]}-projects-list`);
            ulEl.textContent = '';
            for (const project of this.assignedProjects) {
                if (project.status === this.status) {
                    new project_item_js_1.ProjectItem(`${this.element.id}-list`, project);
                }
            }
        }
    }
    __decorate([
        autobind_js_1.Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_js_1.Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_js_1.Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    exports.ProjectList = ProjectList;
});
define("app", ["require", "exports", "components/project-input", "components/project-list", "models/project"], function (require, exports, project_input_js_1, project_list_js_1, project_js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new project_input_js_1.ProjectInput();
    new project_list_js_1.ProjectList(project_js_5.ProjectStatus.Active);
    new project_list_js_1.ProjectList(project_js_5.ProjectStatus.Finished);
});
