import todoManager from '../todoManager.js';
import { renderProjectList } from './projectListView.js';
import { renderTodoList } from './todoListView.js';

export function render() {
    const app = document.getElementById('app');
    app.textContent = ''; // Clear previous content

    const projects = todoManager.getAllProjects();
    const activeProject = todoManager.getActiveProject();

    app.appendChild(renderProjectList(projects, activeProject));
    app.appendChild(renderTodoList(activeProject));
}