const f  = document.getElementById("form");
const q  = document.getElementById("query");
const se_icon = document.getElementById("search-engine-icon");
const se_text = document.getElementById("search-engine-container");
const default_search_engine = "https://www.startpage.com/do/dsearch?query=";
var user_search_engine = "";

const search_engines = {
    d:      "https://www.duckduckgo.com/?q=",
    dd:     "https://html.duckduckgo.com/html/?q=",
    g:      "https://www.google.com/search?q=",
    sx:     "https://searx.gnous.eu/search?q=",
    l:      "https://librex.me/search.php?q=",
    yt:     "https://www.youtube.com/results?search_query=",
    w:      "https://en.wikipedia.org/wiki/Special:Search?search=",
    s:      "https://www.startpage.com/do/dsearch?query=",
    m:      "https://man.cx/",
};

function checkSearchEngine() {
    if (hasSearchEngine(q.value) && user_search_engine === "") {
        user_search_engine = q.value.split(" ")[0];
        q.value = q.value.replace(user_search_engine + " ", "");
    }

    if (settings_global_object["use_se_icons"]) {          // Icon mode
        if (user_search_engine != "") checkSearchEngine_icons();
        else clearElementContents(se_icon);
    } else {                                // Text mode
        if (user_search_engine != "") checkSearchEngine_text();
        else clearElementContents(se_text);
    }
}

function checkSearchEngine_icons() {
    var search_engine_icon = "startpage.png";
    var search_engine_icon_h = "25px";

    if (user_search_engine === "g") {
        search_engine_icon = "google.svg";
        search_engine_icon_h = "20px";
    } else if (user_search_engine === "d" || user_search_engine === "dd") {
        search_engine_icon = "duckduckgo.svg";
    } else if (user_search_engine === "yt") {
        search_engine_icon = "youtube.svg";
    } else if (user_search_engine === "sx") {
        search_engine_icon = "gnu.svg";
    } else if (user_search_engine === "l") {
        search_engine_icon = "librex.png";
    } else if (user_search_engine === "w") {
        search_engine_icon = "wikipedia.png";
    } else if (user_search_engine === "s") {
        search_engine_icon = "startpage.png";
    } else if (user_search_engine === "m") {
        search_engine_icon = "man.png";
    }

    se_icon.style.display = "flex";     // We need flex instead of block to center the image vertically
    se_icon.innerHTML = `
        <img src="images/search-engines/${search_engine_icon}" alt="Icon" height="${search_engine_icon_h}">
    `;
    q.style.paddingLeft = "10px";   // Remove some margin from actual search input
}

function checkSearchEngine_text() {
    var search_engine_text = "DuckDuckGo";

    if (user_search_engine === "g") {
        search_engine_text = "Google";
    } else if (user_search_engine === "yt") {
        search_engine_text = "YouTube";
    } else if (user_search_engine === "dd") {
        search_engine_text = "DuckDuckGo HTML";
    } else if (user_search_engine === "sx") {
        search_engine_text = "SearX";
    } else if (user_search_engine === "l") {
        search_engine_text = "LibreX";
    } else if (user_search_engine === "w") {
        search_engine_text = "Wikipedia";
    } else if (user_search_engine === "s") {
        search_engine_text = "Startpage";
    } else if (user_search_engine === "m") {
        search_engine_text = "Man";
    }

    se_text.style.display = "block";
    se_text.innerHTML = `
        <div class="search-engine-text">${search_engine_text}</div>
    `;
    q.style.paddingLeft = "10px";   // Remove some margin from actual search input
}

function hasSearchEngine(text) {
    return (text.split(" ")[0] in search_engines && text.includes(" "));
}

function clearElementContents(element) {
    element.style.display = "none";
    element.innerHTML = '';
}

function checkDeleteSearchEngine() {
    // Will check if the user pressed backspace with no value and with search engine (so he can delete it)
    if (user_search_engine != "" && q.value === "") {
        switch (event.key) {
            case "Backspace":
                if (!settings_global_object["delete_whole_se"]) {
                    // Need to put a character to delete, not space because of the function call
                    q.value = user_search_engine + "-";
                }
                user_search_engine = "";
                checkSearchEngine();
                q.style.removeProperty("padding-left");     // Remove reduced padding that is added when using search engine
                break;
            default:
                break;
        }
    }
}

function submitted(event) {
    event.preventDefault();
    if (q.value.trim() !== '') {                            // String is not empty
        if (user_search_engine != "") {                     // There is a search engine, if not use default
            var url = search_engines[user_search_engine] + q.value;        // Add the user search engine
        } else {
            var url = default_search_engine + q.value;              // Use default search engine if not empty
        }
        window.location.replace(url, "_blank");
    } else {
        q.value = '';
        q.focus();
    }
}

q.focus();  // Focus the search bar
f.addEventListener("keydown", checkDeleteSearchEngine);
f.addEventListener("submit", submitted);
