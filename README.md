<div align="center">
  <h1>Browser homepage</h1>
  <b>My browser homepage.</b> You can try it <a href="https://8dcc.github.io/browser-homepage/homepage.html">here</a>.<br>
  <p>Inspired by <a href="https://boards.4chan.org/wg/thread/7801612">/wg/</a>, <a href="https://boards.4chan.org/wg/thread/7801612#p7822666">anon</a> and <a href="https://boards.4chan.org/wg/thread/7801612#p7827588">anon</a>.</p>
  <a href="https://github.com/8dcc/browser-homepage/network/members"><img src="https://img.shields.io/github/forks/8dcc/browser-homepage.svg?style=for-the-badge&logo=javascript&color=ead54e&logoColor=ead54e" alt="Forks"></a>
  <a href="https://github.com/8dcc/browser-homepage/stargazers"><img src="https://img.shields.io/github/stars/8dcc/browser-homepage.svg?style=for-the-badge&logo=javascript&color=ead54e&logoColor=ead54e" alt="Stars"></a>
</div>

# Table of contents
1. [How it works](#How-it-works-specifications)
2. [Making it your home page](#Making-it-your-homepage)
3. [Firefox configuration](#Firefox-configuration)
4. [Search engines](#Search-engines)
5. [Contributing](#Contributing)
6. [Todo](#Todo)
7. [Screenshots](#Screenshots)

## How it works (specifications)
- You can search items with different search engines using [keywords](#search-engines).
- You can add, delete or mark items as done them with the buttons on the todo list.
- You can edit a number of settings with the settings icon at the top right (Including most css rules from the webpage itself).
- The todo list uses [localstorage](https://blog.logrocket.com/localstorage-javascript-complete-guide/) to store the todo items and the user settings. Because of this, you might have to remove your settings if some setting has been added to the repo (`Developer tools > Storage > Local Storage > User settings > Delete "user_settings"`).
- If a youtube video is added to the todo list, adds a [`(embed)`](https://github.com/8dcc/youtube-embed-window) button to open the embed video window, which can be moved.
- Todo items are capitalized by default, to disable this, you can disable the setting, or start the todo item with `'/'` or `' '`.
- URLs added to the todo list are slightly "shortened" to fit the space. If you want to completely shorten the URL, you can enable the setting, or start it like this: `!link`.
- All the containers are "expandable". For example you can add as many todo items as you want, or easily edit the html to add more bookmarks.

## Making it your homepage
You can set the [page link](https://8dcc.github.io/browser-homepage/homepage.html) as your homepage, but that is probably not pretty and the address bar won't be empty. For firefox at least, there is a [guide](https://stpg.tk/guides/firefox-startpage/) on how to do it on any platform, which I will explain here.

#

The firefox folder is usually:
- Windows: `C:\Program Files\Mozilla Firefox\`
- macOS: `/Applications/Firefox.app/Contents/MacOS`
- Linux: `/opt/firefox/` or `/usr/lib/firefox/`

#

Add this to `autoconfig.js` located in `<firefox-folder>/defaults/pref` (Create it if it does not exist)
```js
pref("general.config.filename", "mozilla.cfg");
pref("general.config.obscure_value", 0);
pref("general.config.sandbox_enabled", false);
```
Edit the `mozilla.cfg` file in your main firefox folder.
```js
// Any comment. You must start the file with a single-line comment!

let { classes:Cc, interfaces:Ci, utils:Cu } = Components;

try {
  Cu.import("resource:///modules/AboutNewTab.jsm");
  let newTabURL = "PATH_TO_STARTPAGE_REPLACE_ME";
  AboutNewTab.newTabURL = newTabURL;
} catch(e) { Cu.reportError(e); }
```
`PATH_TO_STARTPAGE_REPLACE_ME` should be replaced with the file path to your startpage.

For example `file:///home/user/Documents/startpage/index.html`. Yes, you need to use the `file:///` thing in every platform.

## Firefox configuration
You can read the [README.md](https://github.com/8dcc/browser-homepage/tree/main/firefox) in the firefox folder for more information.  
The css files change the tabs for the *firefox 88* style and makes the right click menu padding a bit smaller.

## Search engines
Type the **keyword** in the search bar followed by space. Depending on your settings you should see an icon or a text indicating what search engine you are using.  
This is the list of available keywords:

Keyword       | Search engine
--------------|-----------------------
<kbd>d</kbd>  | `https://www.duckduckgo.com/?q=`
<kbd>dd</kbd> | `https://html.duckduckgo.com/html/?q=`
<kbd>g</kbd>  | `https://www.google.com/search?q=`
<kbd>s</kbd>  | `https://searx.gnous.eu/search?q=`
<kbd>yt</kbd> | `https://www.youtube.com/results?search_query=`
<kbd>w</kbd>  | `https://en.wikipedia.org/wiki/Special:Search?search=`

For adding custom search engines see [this](https://github.com/8dcc/browser-homepage/commit/eb7527c3a777472c7a0208919a742efff0129283#diff-ea1c1de5ab8cb543a3597ba84a6308ab4227b0419fdc81b56bd52950a1c00f6e) example.  
You can PR your search engine if you want, and I will add it if I find it useful.

## Contributing
Check [CONTRIBUTE.md](https://github.com/8dcc/browser-homepage/blob/main/CONTRIBUTE.md).

## Todo
- [X] `todo.js` applies the `<a>` tag to the whole todo element instead of the link only. (Now it works only if the link is the only content of the todo element)
- [X] The embed youtube window only displays the last youtube video added. ~Maybe store a list of videos by id?~ Added different ids as arguments in the html.
- [X] Detect search engine before actually searching and display it in the search bar. ([example](https://user-images.githubusercontent.com/29655971/205471203-57321112-905b-49fb-8773-5887a07866ea.png))
- [X] Add text search engines instead of (ugly) icons.
- [X] Add settings window/tab
    - [X] Store choices in localstorage.
    - [X] Search engine icons / text.
    - [X] Background (solid color)
    - [X] Add setting ~~to replace the theme~~ for changing each css color.
- [X] Change the `X` for closing the embed (ugly af) and add proper svg.
- [X] Add settings for automatic link shortening and for disabling capitalization.
- [X] The todo text (container) seems a bit down on browsers like chrome (yikes) or similar. Most likely due to some default margin or padding for some value? Not on firefox. If that's the case, overwrite it.
- [X] When using a text indicator for the search engine the search icon moves a bit to the right (The width changes)
- [ ] The text added to the TODO items is only recognized **after** the link, the text before the link gets deleted. Also the none of it works with youtube links.

## Screenshots
*Note: Some screenshots might be a bit outdated.*

![s1](https://user-images.githubusercontent.com/29655971/205471192-314c6e58-ebd6-4bc6-af83-2088d49f8287.png)

*With custom colors changed from the page's settings:*

![s2](https://user-images.githubusercontent.com/29655971/205471146-39a451f6-6113-43dc-a1ac-1faee6117eba.png)
![s3](https://user-images.githubusercontent.com/29655971/205471177-5fc8c92c-0b7e-42df-8674-b375decdc3cb.png)
