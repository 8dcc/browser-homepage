const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
let todos = [];

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    if (item.trim() !== '') {
        item = item.replace(/^\w/, (c) => c.toUpperCase());
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = '';
    } else {
        todoInput.value = '';
        todoInput.focus()
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function(item) {
        const checked = item.completed ? 'checked' : null;
        const li = document.createElement('li');

        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class="delete-button"></button>
        `;
        todoItemsList.append(li);
    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
    todoInput.focus()
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

function toggle(id) {
    todos.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
}
