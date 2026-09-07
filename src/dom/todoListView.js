import todoManager from "../todoManager";

let expandedTodoId = null;

export function renderTodoList(activeProject) {
    const container = document.createElement("div");
    container.classList.add("todo-list");

    if (!activeProject) {
        container.textContent = "No active project selected.";
        return container;
    }

    const title = document.createElement("h2");
    title.textContent = activeProject.name;
    container.appendChild(title);

    const list = document.createElement("ul");

    activeProject.todos.forEach(todo => {
        const item = document.createElement("li");
        item.classList.add("todo-item", `priority-${todo.priority}`);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => {
            todoManager.toggleTodoCompletion(activeProject.id, todo.id);
            window.dispatchEvent(new Event("app:render"));
        });

        const label = document.createElement("span");
        label.textContent = `${todo.title} - Due: ${todo.dueDate} - Priority: ${todo.priority}`;
        if (todo.completed) {
            label.style.textDecoration = "line-through";
        }
        label.style.cursor = "pointer";
        label.addEventListener("click", () => {
            expandedTodoId = expandedTodoId === todo.id ? null : todo.id;
            window.dispatchEvent(new Event("app:render"));
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            todoManager.removeTodoFromProject(activeProject.id, todo.id);
            window.dispatchEvent(new Event("app:render"));
        });

        item.append(checkbox);
        item.append(label);
        item.append(deleteButton);
        list.appendChild(item);

        if (expandedTodoId === todo.id) {
        container.appendChild(createDetailPanel(activeProject, todo));
        }

        list.appendChild(item);
    });

    container.appendChild(list);
    container.appendChild(createTodoForm(activeProject));

    return container;
}

function createDetailPanel(activeProject, todo) {
    const panel = document.createElement("div");
    panel.classList.add("todo-detail-panel");

    const form = document.createElement("form");

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.value = todo.description;

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.value = todo.dueDate;

    const priorityInput = document.createElement("select");
    ["low", "medium", "high"].forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        if (level === todo.priority) option.selected = true;
        priorityInput.appendChild(option);
    });

    const notesInput = document.createElement("textarea");
    notesInput.value = todo.notes;
    notesInput.placeholder = "Notes";

    const saveButton = document.createElement("button");
    saveButton.type = "submit";
    saveButton.textContent = "Save";

    form.append(descriptionInput, dueDateInput, priorityInput, notesInput, saveButton);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!descriptionInput.value.trim() || !dueDateInput.value) return;

        todoManager.updateTodoDetails(activeProject.id, todo.id, {
            description: descriptionInput.value.trim(),
            dueDate: dueDateInput.value,
            priority: priorityInput.value,
            notes: notesInput.value.trim()
        });

        window.dispatchEvent(new Event("app:render"));
    });

    panel.appendChild(form);
    return panel;
}

function createTodoForm(activeProject) {
    const form = document.createElement("form");
    form.classList.add("todo-form");

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Todo title";
    titleInput.required = true;

    const descriptionInput = document.createElement("input");
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Description";

    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.required = true;

    const priorityInput = document.createElement("select");
    ["low", "medium", "high"].forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.textContent = level;
        priorityInput.appendChild(option);
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Add Todo";

    form.append(titleInput, descriptionInput, dueDateInput, priorityInput, button);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!titleInput.value.trim() || !dueDateInput.value) return;

        todoManager.addTodoToProject(activeProject.id, {
            title: titleInput.value.trim(),
            description: descriptionInput.value.trim(),
            dueDate: dueDateInput.value,
            priority: priorityInput.value
        });

        window.dispatchEvent(new Event("app:render"));
    });

    return form;
}