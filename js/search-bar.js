const f  = document.getElementById("form");
const q  = document.getElementById("query");
const se = document.getElementById("searchEngineIcon");
const default_search_engine = "https://www.duckduckgo.com/?q=";
var user_search_engine = "";

// TODO: Get these from the settings (localstorage)
var use_search_engine_icons = true;
var delete_whole_se = true;

const search_engines = {
    d:  "https://www.duckduckgo.com/?q=",
    dd: "https://html.duckduckgo.com/html/?q=",
    g:  "https://www.google.com/search?q=",
    s:  "https://searx.gnous.eu/search?q=",
    yt: "https://www.youtube.com/results?search_query="
};

function checkSearchEngine() {
    if (hasSearchEngine(q.value) && user_search_engine === "") {
        user_search_engine = q.value.split(" ")[0];
        q.value = q.value.replace(user_search_engine + " ", "");
    }

    if (user_search_engine != "") {
        if (use_search_engine_icons) {
            checkSearchEngine_icons()
        } else {
            /*
             * TODO: Add text mode
             */
            checkSearchEngine_text()
        }
    } else {
        se.style.display = "none";
        se.innerHTML = '';
    }
}

function checkSearchEngine_icons() {
    var search_engine_icon = "duckduckgo.svg";
    var search_engine_icon_h = "25px";

    if (user_search_engine === "g") {
        search_engine_icon = "google.svg";
        search_engine_icon_h = "20px";
    } else if (user_search_engine === "d" || user_search_engine === "dd") {
        search_engine_icon = "duckduckgo.svg";
    } else if (user_search_engine === "yt") {
        search_engine_icon = "youtube.svg";
    } else if (user_search_engine === "s") {
        search_engine_icon = "gnu.svg";
    }

    se.style.display = "block";
    se.innerHTML = `
        <img src="images/search-engines/${search_engine_icon}" alt="Icon" height="${search_engine_icon_h}">
    `;
}

function hasSearchEngine(text) {
    return (text.split(" ")[0] in search_engines && text.includes(" "));
}

function checkDeleteSearchEngine() {
    // Will check if the user pressed backspace with no value and with search engine (so he can delete it)
    if (user_search_engine != "" && q.value === "") {
        switch (event.key) {
            case "Backspace":
                if (!delete_whole_se) {
                    // Need to put a character to delete, not space because of the function call
                    q.value = user_search_engine + "-";
                }
                user_search_engine = "";
                checkSearchEngine();
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
