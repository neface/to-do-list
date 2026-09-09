export class Todo {
    constructor({id, title, description, dueDate, priority, notes = "", completed = false}) {
        this.id = id ?? crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.completed = completed;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    updateDetails({ title, description, dueDate, priority, notes }) {
        if (title !== undefined) this.title = title;
        if (description !== undefined) this.description = description;
        if (dueDate !== undefined) this.dueDate = dueDate;
        if (priority !== undefined) this.priority = priority;
        if (notes !== undefined) this.notes = notes;
    }
}