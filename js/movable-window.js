
function showMovableWindow() {
    document.getElementById('movable-window').style.display = "block";
}

function hideMovableWindow() {
    document.getElementById('movable-window').style.display = "none";
    document.getElementById('embed-video').innerHTML =
      "<p>No video to display</p>";
}

function makeDraggable(element) {
    var old_x = 0, old_y = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        element.classList.add("active");

        /* Save cursor position when starting the drag */
        old_x = e.clientX;
        old_y = e.clientY;

        document.onmouseup   = stopDraggingElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        /* Calculate position from last drag difference, save new cursor
         * position. */
        const delta_x = e.clientX - old_x;
        const delta_y = e.clientY - old_y;
        old_x         = e.clientX;
        old_y         = e.clientY;

        /* Add deltas */
        element.style.left = (element.offsetLeft + delta_x) + "px";
        element.style.top  = (element.offsetTop + delta_y) + "px";
    }

    function stopDraggingElement() {
        element.classList.remove("active");

        /* Remove listeners */
        document.onmouseup   = null;
        document.onmousemove = null;
    }
}

makeDraggable(document.getElementById("movable-window"));
