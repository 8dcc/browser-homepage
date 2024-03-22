const search_query          = document.getElementById("search-query");
const default_search_engine = "s";
var user_search_engine      = null;

const search_engines = {
    d : {
        url : "https://www.duckduckgo.com/?q=",
        icon : "duckduckgo.svg",
        icon_h : "25px",
        text : "DuckDuckGo",
    },

    dd : {
        url : "https://html.duckduckgo.com/html/?q=",
        icon : "duckduckgo.svg",
        icon_h : "25px",
        text : "DuckDuckGo HTML",
    },

    g : {
        url : "https://www.google.com/search?q=",
        icon : "google.svg",
        icon_h : "20px",
        text : "Google",
    },

    sx : {
        url : "https://searx.gnous.eu/search?q=",
        icon : "gnu.svg",
        icon_h : "25px",
        text : "SearX",
    },

    l : {
        url : "https://librex.me/search.php?q=",
        icon : "librex.png",
        icon_h : "25px",
        text : "LibreX",
    },

    yt : {
        url : "https://www.youtube.com/results?search_query=",
        icon : "youtube.svg",
        icon_h : "25px",
        text : "YouTube",
    },

    w : {
        url : "https://en.wikipedia.org/wiki/Special:Search?search=",
        icon : "wikipedia.png",
        icon_h : "25px",
        text : "Wikipedia",
    },

    s : {
        url : "https://www.startpage.com/do/dsearch?query=",
        icon : "startpage.png",
        icon_h : "25px",
        text : "Startpage",
    },

    m : {
        url : "https://man.cx/",
        icon : "man.png",
        icon_h : "25px",
        text : "Man",
    },
};

function getSearchEngineObject(text) {
    if (!text.includes(" "))
        return null;

    /* Iterate search_engines object */
    for (const [key, value] of Object.entries(search_engines))
        /* Is this the search engine that the user typed? */
        if (text.split(" ")[0] == key)
            return value;

    return null;
}

function clearElementContents(element) {
    element.style.display = "none";
    element.innerHTML     = "";
}

function checkSearchEngine() {
    const se_icon = document.getElementById("search-engine-icon");
    const se_text = document.getElementById("search-engine-container");

    if (!user_search_engine) {
        user_search_engine = getSearchEngineObject(search_query.value);

        if (!user_search_engine) {
            /* We haven't found a valid search engine in the loop, clear icon
             * and text. */
            clearElementContents(se_icon);
            clearElementContents(se_text);

            /* Remove reduced padding that is added when using search engine */
            search_query.style.removeProperty("padding-left");
            return;
        }

        /* Remove search engine text ("d ") and add padding */
        const search_engine_text = search_query.value.split(" ")[0] + " ";
        search_query.value = search_query.value.replace(search_engine_text, "");
        search_query.style.paddingLeft = "10px";
    }

    /* Check if the user wants to use icons or text */
    if (settings_object.use_se_icons) {
        /* We need flex instead of block to center the image vertically */
        se_icon.style.display = "flex";
        se_icon.innerHTML     = `<img src="img/search-engines/${
          user_search_engine.icon}" alt="Icon" height="${
          user_search_engine.icon_h}">`;
    } else {
        /* Use block for text */
        se_text.style.display = "block";
        se_text.innerHTML =
          `<div class="search-engine-text">${user_search_engine.text}</div>`;
    }
}

/* When we type in the form */
document.getElementById("search-form").addEventListener("keydown", function(e) {
    /* Will check if the user pressed backspace with no value and with search
     * engine (so he can delete it). */
    if (user_search_engine && search_query.value === "") {
        switch (event.key) {
            case "Backspace":
                /* Call this function again to re-check if we have a search
                 * engine. At this point we don't. */
                user_search_engine = null;
                checkSearchEngine();
                break;
            default:
                break;
        }
    }
});

/* When we submit the form */
document.getElementById("search-form").addEventListener("submit", function(e) {
    e.preventDefault();

    /* String is not empty */
    if (search_query.value.trim() !== "") {
        if (user_search_engine) {
            /* There is a search engine */
            var url = user_search_engine.url + search_query.value;
        } else {
            /* No user search engine, use default */
            var url =
              search_engines[default_search_engine].url + search_query.value;
        }

        window.location.replace(url, "_blank");
    } else {
        search_query.value = "";
        search_query.focus();
    }
});

/* When we load the page, focus the search bar */
search_query.focus();
