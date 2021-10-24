const f = document.getElementById("form");
const q = document.getElementById("query");
const search_engine = "https://www.duckduckgo.com/?q=";

const search_engines = {
    d: "https://www.duckduckgo.com/?q=",
    dd: "https://html.duckduckgo.com/html/?q=",
    g: "https://www.google.com/search?q=",
    s: "https://searx.gnous.eu/search?q=",
    yt: "https://www.youtube.com/results?search_query="
};

function submitted(event) {
    event.preventDefault();
    if (q.value.trim() !== '') {  // String is not empty
        if (q.value.split(" ")[0] in search_engines) {  // The first word is in search_engines
            var search = q.value.replace(q.value.split(" ")[0] + " ", "")  // Remove keyword
            var url = search_engines[q.value.split(" ")[0]] + search;  // Add the matching search engine
        } else {
            var url = search_engine + q.value;  // Use default search engine if not in search_engines
        }
        // console.log(url);
        window.location.replace(url, "_blank");
    } else {
        q.value = '';
        q.focus();
    }
}

q.focus(); // Focus the search bar
f.addEventListener("submit", submitted);
