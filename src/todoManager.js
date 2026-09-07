import { Project } from './project.js';
import { Todo } from './todo.js';

let projects = [];
let activeProjectId = null;

function init() {
    const defaultProject = new Project('Default Project');
    projects.push(defaultProject);
    activeProjectId = defaultProject.id;
}

function getAllProjects() {
    return projects;
}
function getActiveProject() {
    return projects.find(project => project.id === activeProjectId);
}

function setActiveProject(projectId) {
    activeProjectId = projectId;
}

function addProject(name) {
    const project = new Project(name);
    projects.push(project);
}

function removeProject(projectId) {
    projects = projects.filter(project => project.id !== projectId);

    if (activeProjectId === projectId) {
        activeProjectId = projects[0]?.id??null;
    }
}

function addTodoToProject(projectId, todoInfo) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
       const todo = new Todo(todoInfo);
       project.addTodo(todo);
       return todo;
    }
}

function removeTodoFromProject(projectId, todoId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.removeTodo(todoId);
    }
}

function toggleTodoCompletion(projectId, todoId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const todo = project.getTodo(todoId);
        if (todo) {
            todo.toggleCompleted();
        }
    }
}

function updateTodoDetails(projectId, todoId, details) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const todo = project.getTodo(todoId);
        if (todo) {
            todo.updateDetails(details);
        }
    }
}

export default {
    init,
    getAllProjects,
    getActiveProject,
    setActiveProject,
    addProject,
    removeProject,
    addTodoToProject,
    removeTodoFromProject,
    toggleTodoCompletion,
    updateTodoDetails
};