import { Project } from './project.js';
import { Todo } from './todo.js';

let projects = [];
let activeProjectId = null;
const STORAGE_KEY = 'todoApp.projects';

function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

function load() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;

    try {
        const parsed = JSON.parse(raw);
        projects = parsed.map(projectData => {
            const todos = projectData.todos.map(todoData => new Todo(todoData));
            const project = new Project({
                name: projectData.name,
                description: projectData.description,
                todos: todos,
                id: projectData.id
            });
            return project;
        });
        activeProjectId = parsed[0]?.id ?? null;
        return true;
    } catch (error) {
        console.error('Error loading projects from localStorage:', error);
        return false;
    }
}

function init() {
    const loaded = load();

    if (!loaded || projects.length === 0) {
        const defaultProject = new Project({ name: 'Default Project' });
        projects.push(defaultProject);
        activeProjectId = defaultProject.id;
        save();
    }
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
    const project = new Project({ name });
    projects.push(project);
    save();
}

function removeProject(projectId) {
    projects = projects.filter(project => project.id !== projectId);

    if (activeProjectId === projectId) {
        activeProjectId = projects[0]?.id??null;
    }
    save();
}

function addTodoToProject(projectId, todoInfo) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
       const todo = new Todo(todoInfo);
       project.addTodo(todo);
       save();
       return todo;
    }
}

function removeTodoFromProject(projectId, todoId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.removeTodo(todoId);
        save();
    }
}

function toggleTodoCompletion(projectId, todoId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const todo = project.getTodo(todoId);
        if (todo) {
            todo.toggleCompleted();
            save();
        }
    }
}

function updateTodoDetails(projectId, todoId, details) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        const todo = project.getTodo(todoId);
        if (todo) {
            todo.updateDetails(details);
            save();
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