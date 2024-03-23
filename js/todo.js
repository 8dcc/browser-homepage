const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.getElementsByClassName('todo-items')[0];
const embed_video = document.getElementById('embed_video');
var todos = [];
var video_ids = [];

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

function addTodo(item) {
    if ( item.trim() !== '' ) {
        // If todo item starts with '/', don't capitalize
        if ( todoInput.value[0] === "/") {
            item = item.slice(1);
        // If we are not starting the todo item with a link and we have the capitalize_todos setting enabled, capitalize
        } else if (todoInput.value.slice(0,4) != "http" && settings_object.capitalize_todos) {
            item = item.replace(/^\w/, (c) => c.toUpperCase());
        }

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
        todoInput.focus();
    }
}

function check_for_too_long(text, fsize, ssize, mlen) {
	if (text.length > mlen) {		// 66 is the max size to not overflow
		return text.slice(0,fsize) + "..." + text.slice(-ssize);
	} else {
		return text;
	}
}

function show_embed_id(id) {
	embed_video.innerHTML = `
	<iframe width="560" height="315"
		src="https://www.youtube.com/embed/${id}"
		title="Embed"
		frameborder="0"
		allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
	</iframe>
	`;
	showEmbed();
}

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(function(item) {
        const checked_class = item.completed ? ' checked' : '';
        const li = document.createElement('li');

        li.setAttribute('class', 'todo-item');
        li.setAttribute('data-key', item.id);

        if (item.name.includes("http")) {
            var pre_link = item.name.split("http")[0];

            // Used to check if the char before the link is '!'
            var pre_link_char = pre_link[pre_link.length - 1];
            // If the char before the link is !, remove it from the pre_link str
            if (pre_link_char == '!') pre_link = pre_link.slice(0,-1);

            var actual_link = 'http' + item.name.split("http")[1].split(" ")[0].trim();
            var extra_text = item.name.split(actual_link)[1];
            // The first part that the url will be splitted. If the user has more text, give more priority.
            var fpart = (extra_text.length > 5) ? 30 : 40;
            var link_text = (settings_object.shorten_links || pre_link_char == '!') ? "Link" : check_for_too_long(actual_link, fpart, 15, 66);

            if (item.name.includes("youtube.com/watch")) {
                var embed_video_id = item.name.split("v=")[1].slice(0,11);
				var item_to_add = pre_link + '<a href="' + actual_link + '">' + link_text + '</a> ' +
					`<a class="embed-button" onclick="show_embed_id('${embed_video_id}')">(embed)</a>` + extra_text;
            } else {
                var item_to_add = pre_link + '<a href="' + actual_link + '">' + link_text + '</a>' + extra_text;
            }
        } else {
            var item_to_add = item.name;
        }

        li.innerHTML = `
			<button class="custom-input checkbox"></button>
			<div class="todo-text-container">
				<div class="todo-text${checked_class}">${item_to_add}</div>
			</div>
			<button class="default-button delete-button"></button>
        `;
        todoItemsList.append(li);
    });
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
    todoInput.focus();
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
    if (event.target.classList.contains('checkbox')) {
        toggleTodo(event.target.parentElement.getAttribute('data-key'));
    } else if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});

function toggleTodo(id) {
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
