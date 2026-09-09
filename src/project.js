export class Project {
    constructor({name, description = "", todos = [], id = null}) {
        this.name = name;
        this.description = description;
        this.todos = todos;
        this.id = id ?? crypto.randomUUID();
    }

    addTodo(todo) {
        this.todos.push(todo);
    }
    
    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    getTodo(todoId) {
        return this.todos.find(todo => todo.id === todoId);
    }

    updateDetails({ name, description }) {
        if (name !== undefined) this.name = name;
        if (description !== undefined) this.description = description;
    }
}
