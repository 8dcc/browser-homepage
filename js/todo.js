const todoForm      = document.getElementById("todo-form");
const todoInput     = document.getElementById("todo-input");
const todoItemsList = document.getElementById("todo-items");
const embed_video   = document.getElementById("embed-video");
var todos           = [];

/*----------------------------------------------------------------------------*/
/* Embed video window */

function showEmbededVideo(id) {
    embed_video.innerHTML = `
	<iframe width="560" height="315"
		src="https://www.youtube.com/embed/${id}"
		title="Embed"
		frameborder="0"
		allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
	</iframe>
	`;
    showMovableWindow();
}

/*----------------------------------------------------------------------------*/
/* Rendering the todo list */

function shortenText(text, max_len) {
    if (text.length > max_len) {
        const start_sz = max_len / 2;
        const end_sz   = max_len - (start_sz - 3); /* Minus 3 dots */
        return text.slice(0, start_sz) + "..." + text.slice(-end_sz);
    }

    return text;
}

function replaceLinks(text) {
    /* Might start with '!' to explicitly disable shortening */
    const url_regex = /(!?)(https?:\/\/[^\s]+)/gi

    /* Used for embedding videos */
    const youtube_regex = /.*youtube.[a-z]{2,}\/watch\?v=([^\s]+)/i

    return text.replace(url_regex, function(match, exclamation, url) {
        const inner_text = (settings_object.shorten_links || exclamation != "")
                             ? "Link"
                             : shortenText(url, 65);

        /* Convert link to <a> tag */
        var ret = '<a href="' + url + '">' + inner_text + '</a>';

        /* If the link is a YouTube video, add "embed" button */
        const youtube_match = url.match(youtube_regex);
        if (youtube_match != null)
            ret += ` <a class="embed-button" onclick="showEmbededVideo('${
              youtube_match[1]}')">(embed)</a>`;

        /* And finally, replace it */
        return ret;
    })
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';

    todos.forEach(function(item) {
        var item_content = replaceLinks(item.name);

        /* Create element tree */
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.dataset.key = item.id;

        const checkbox = document.createElement("button");
        checkbox.classList.add("custom-input", "checkbox");

        const text_container = document.createElement("div");
        text_container.classList.add("todo-text-container");

        const todo_text = document.createElement("div");
        todo_text.classList.add("todo-text");
        todo_text.innerHTML = item_content;

        if (item.completed)
            todo_text.classList.add("checked");

        const delete_button = document.createElement("button");
        delete_button.classList.add("default-button", "delete-button");

        /*
         * <ul>
         *     ...
         *
         *     <li class="..." data-key="...">
         *         <button class="..."/>
         *         <div class="...">
         *             <div class="...">Content</div>
         *         </div>
         *         <button class="..."/>
         *     </li>
         * </ul>
         */
        text_container.appendChild(todo_text);
        li.appendChild(checkbox);
        li.appendChild(text_container);
        li.appendChild(delete_button);
        todoItemsList.appendChild(li);
    });
}

/*----------------------------------------------------------------------------*/
/* Managing the items */

function addTodo(item) {
    if (item.trim() == "") {
        todoInput.value = '';
        return;
    }

    if (todoInput.value[0] === "/") {
        /* If todo item starts with '/', don't capitalize */
        item = item.slice(1);
    } else if (todoInput.value.startsWith("http") &&
               settings_object.capitalize_todos) {
        /* If we are not starting the todo item with a link and we have the
         * capitalize_todos setting enabled, capitalize */
        item = item.replace(/^\w/, (c) => c.toUpperCase());
    }

    const todo = {
        id : Date.now(),
        name : item,
        completed : false,
    };

    todos.push(todo);
    writeLocalStorage();

    todoInput.value = '';
}

function writeLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

function readLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (!reference)
        return;

    todos = JSON.parse(reference);
    renderTodos(todos);
}

function toggleTodo(id) {
    todos.forEach(function(item) {
        if (item.id == id)
            item.completed = !item.completed;
    });

    writeLocalStorage();
}

function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });

    writeLocalStorage();
}

/*----------------------------------------------------------------------------*/
/* Event listeners */

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);
    todoInput.focus();
});

todoItemsList.addEventListener('click', function(event) {
    if (event.target.classList.contains('checkbox'))
        /* We are marking it as completed */
        toggleTodo(event.target.parentElement.dataset.key);
    else if (event.target.classList.contains('delete-button'))
        /* We are deleting */
        deleteTodo(event.target.parentElement.dataset.key);
});

/*----------------------------------------------------------------------------*/
/* Startup */

readLocalStorage();
