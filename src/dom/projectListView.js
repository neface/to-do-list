import todoManager from "../todoManager";

export function renderProjectList(projects, activeProject) {
    const container = document.createElement("div");
    container.classList.add("project-list");

    const title = document.createElement("h2");
    title.textContent = "Projects";
    container.appendChild(title);

    const list = document.createElement("ul");

    projects.forEach(project => {
        const listItem = document.createElement("li");
        listItem.textContent = project.name;
        listItem.dataset.projectId = project.id;
        listItem.classList.add("project-item");

        if (activeProject && project.id === activeProject.id) {
            listItem.classList.add("active");
        }

        listItem.addEventListener("click", () => {
            todoManager.setActiveProject(project.id);
            window.dispatchEvent(new Event("app:render"));
        });

        list.appendChild(listItem);
    });

    container.appendChild(list);
    container.appendChild(createProjectForm());

    return container;
}

function createProjectForm() {
    const form = document.createElement("form");
    form.classList.add("project-form");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "New project name";
    input.required = true;

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Add Project";

    form.append(input, button);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const projectName = input.value.trim();
        if (!projectName) return;

        todoManager.addProject(projectName);
        window.dispatchEvent(new Event("app:render"));
    });

    return form;
}