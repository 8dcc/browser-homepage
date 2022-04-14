const f  = document.getElementById("form");
const q  = document.getElementById("query");
const se = document.getElementById("searchEngineIcon");
const search_engine = "https://www.duckduckgo.com/?q=";
var use_search_engine_icons = true;     // TODO: Get this from the settings (localstorage)
var actual_search = "";


const search_engines = {
    d:  "https://www.duckduckgo.com/?q=",
    dd: "https://html.duckduckgo.com/html/?q=",
    g:  "https://www.google.com/search?q=",
    s:  "https://searx.gnous.eu/search?q=",
    yt: "https://www.youtube.com/results?search_query="
};

function hasSearchEngine(text) {
    return (text.split(" ")[0] in search_engines && text.includes(" "));
}

function checkSearchEngine() {
    if (use_search_engine_icons) {
        checkSearchEngine_icons()
    } else {
        /*
         * TODO: Add text mode
         */
        checkSearchEngine_text()
    }
}

function checkSearchEngine_icons() {
    /*
     * TODO: Remove search engine from value, but still compare the real value down
     * q.value = q.value.replace(q.value.split(" ")[0] + " ", "");     // Remove search engine
     */

    if (hasSearchEngine(q.value)) {
        const search_engine = q.value.split(" ")[0];
        var search_engine_icon = "duckduckgo.svg";
        var search_engine_icon_h = "25px";

        if (search_engine === "g") {
            search_engine_icon = "google.svg";
            search_engine_icon_h = "20px";
        } else if (search_engine === "d" || search_engine === "dd") {
            search_engine_icon = "duckduckgo.svg";
        } else if (search_engine === "yt") {
            search_engine_icon = "youtube.svg";
        } else if (search_engine === "s") {
            search_engine_icon = "gnu.svg";
        }

        se.style.display = "block";
        se.innerHTML = `
            <img src="images/search-engines/${search_engine_icon}" alt="Icon" height="${search_engine_icon_h}">
        `;
    } else {
        se.style.display = "none";
        se.innerHTML = '';
    }
}

function submitted(event) {
    event.preventDefault();
    if (q.value.trim() !== '') {                            // String is not empty
        if (hasSearchEngine(q.value)) {      // The first word is in search_engines
            var search = q.value.replace(q.value.split(" ")[0] + " ", "");   // Remove keyword
            var url = search_engines[q.value.split(" ")[0]] + search;        // Add the matching search engine
        } else {
            var url = search_engine + q.value;              // Use default search engine if not in search_engines
        }
        window.location.replace(url, "_blank");
    } else {
        q.value = '';
        q.focus();
    }
}

q.focus();  // Focus the search bar
f.addEventListener("submit", submitted);
