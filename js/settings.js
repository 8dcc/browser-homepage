const settTab = document.getElementById('settings-tab-container');
var settings_global_object;

// TODO: Make a checkbox setting to change the css text color with the backgound
//       Inside updateBackgroundFromSettings
// TODO: /)$/

/* --------------------------------------------------------------- */
/* Push and pull settings from localstorage */
function updateLsSettings() {
    localStorage.setItem('user_settings', JSON.stringify(settings_global_object));
    renderSettings();
}

function getLsSettings() {
    const reference = localStorage.getItem('user_settings');
    if (reference) {
        settings_global_object = JSON.parse(reference);
        renderSettings(settings_global_object);
        updateBackgroundFromSettings();
        updateCssFromSettings();        // Update vars from css/variables.css
    } else {
        checkEmptyLs();
    }
}

/* --------------------------------------------------------------- */
/* Rendering the settings (checkboxes, color, etc.) */
function renderSettings() {
    updateBoolSetting("use-se-icons", settings_global_object.use_se_icons);
    updateBoolSetting("delete-whole-se", settings_global_object.delete_whole_se);
    updateBoolSetting("capitalize-todos", settings_global_object.capitalize_todos);
    updateBoolSetting("shorten-links", settings_global_object.shorten_links);
    updateStringSetting("cbackground-color", settings_global_object.cbackground_color);

    updateStringSetting("ccss-highlight",        settings_global_object.ccss_highlight);
    updateStringSetting("ccss-highlight-dark",   settings_global_object.ccss_highlight_dark);
    updateStringSetting("ccss-highlight-darker", settings_global_object.ccss_highlight_darker);
    updateStringSetting("ccss-border",           settings_global_object.ccss_border);
    updateStringSetting("ccss-input-text",       settings_global_object.ccss_input_text);
    updateStringSetting("ccss-placeholder",      settings_global_object.ccss_placeholder);
    updateStringSetting("ccss-title-text",       settings_global_object.ccss_title_text);
    updateStringSetting("ccss-background",       settings_global_object.ccss_background);
    updateStringSetting("ccss-col-background",   settings_global_object.ccss_col_background);
    updateStringSetting("ccss-se-background",    settings_global_object.ccss_se_background);
}

function updateBoolSetting(id, setting_state) {
    const element = document.getElementById(id);
    if (element) element.checked = setting_state;
    else console.log(`[settings] Could not find element with id: ${id}`);
}

function updateStringSetting(id, setting_state) {
    const element = document.getElementById(id);
    if (element) element.value = setting_state;
    else console.log(`[settings] Could not find element with id: ${id}`);
}

/* --------------------------------------------------------------- */
/* Checkbox events*/
settTab.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') toggleSetting(event.target.getAttribute('id'));
});

function toggleSetting(changeme) {
    const replaced_changeme = changeme.replace(new RegExp("-", "g"), "_");
    settings_global_object[replaced_changeme] = !settings_global_object[replaced_changeme];
    updateLsSettings();
}

/* --------------------------------------------------------------- */
/* Backgrounnd */
function changeCustomBackground(use_color) {                 // Change the background settings. Called by the html buttons
    const cb_c = document.getElementById('cbackground-color');

    if (use_color) {
        settings_global_object.use_cbackground_color = true;
        settings_global_object.cbackground_color = cb_c.value;     // Color input
    } else {
        settings_global_object.use_cbackground_color = false;
    }

    updateLsSettings();
    updateBackgroundFromSettings();
}

function updateBackgroundFromSettings() {           // Apply one thing or another depending on settings
    if (settings_global_object.use_cbackground_color) {
        console.log("[settings] Applying custom background color...");
        applyCustomBackground(settings_global_object.cbackground_color);
    } else {
        console.log("[settings] Resetting background to the default image...");
        resetCustomBackground();
    }
}

function applyCustomBackground(custom_color) {      // Change the actual background color
    document.body.style.background = custom_color;
}

function resetCustomBackground() {                  // Change the actual background to the image
    document.body.style.background = "url('./images/background.png') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
}

/* --------------------------------------------------------------- */
/* CSS variables */

// Called by the button's onclick
function applyCustomCss(idx) {
    switch (idx) {
        case 1:
            changeCssVar("--highlight", "ccss-highlight");

            // Update localstorage
            settings_global_object.bcss_highlight = true;
            settings_global_object.ccss_highlight = document.getElementById("ccss-highlight").value;

            break;
        case 2:
            changeCssVar("--highlight-dark", "ccss-highlight-dark");
            settings_global_object.bcss_highlight_dark = true;
            settings_global_object.ccss_highlight_dark = document.getElementById("ccss-highlight-dark").value;
            break;
        case 3:
            changeCssVar("--highlight-darker", "ccss-highlight-darker");
            settings_global_object.bcss_highlight_darker = true;
            settings_global_object.ccss_highlight_darker = document.getElementById("ccss-highlight-darker").value;
            break;
        case 4:
            changeCssVar("--border", "ccss-border");
            settings_global_object.bcss_border = true;
            settings_global_object.ccss_border = document.getElementById("ccss-border").value;
            break;
        case 5:
            changeCssVar("--input-text", "ccss-input-text");
            settings_global_object.bcss_input_text = true;
            settings_global_object.ccss_input_text = document.getElementById("ccss-input-text").value;
            break;
        case 6:
            changeCssVar("--input-placeholder", "ccss-placeholder");
            settings_global_object.bcss_placeholder = true;
            settings_global_object.ccss_placeholder = document.getElementById("ccss-placeholder").value;
            break;
        case 7:
            changeCssVar("--title-text", "ccss-title-text");
            settings_global_object.bcss_title_text = true;
            settings_global_object.ccss_title_text = document.getElementById("ccss-title-text").value;
            break;
        case 8:
            changeCssVar("--main-background", "ccss-background");
            settings_global_object.bcss_background = true;
            settings_global_object.ccss_background = document.getElementById("ccss-background").value;
            break;
        case 9:
            changeCssVar("--column-background", "ccss-col-background");
            settings_global_object.bcss_col_background = true;
            settings_global_object.ccss_col_background = document.getElementById("ccss-col-background").value;
            break;
        case 10:
            changeCssVar("--se-background", "ccss-se-background");
            settings_global_object.bcss_se_background = true;
            settings_global_object.ccss_se_background = document.getElementById("ccss-se-background").value;
            break;
        default:
            console.log("[settings] applyCustomCss got an invalid idx: " + idx);
            break;
    }

    updateLsSettings();     // Write to localstorage
}

function changeCssVar(name, elem_id) {
    var r = document.querySelector(':root');
    const element = document.getElementById(elem_id);

    // Set var (--highlight) to the value of it's color input
    r.style.setProperty(name, element.value);
}

// Called by the button's onclick
// applyCustomCss to resetCustomCss vim macro: '<,'>s/changeCssVar(\(".*"\),.*/removeCssVar(\1);
function resetCustomCss(idx) {
    switch (idx) {
        case 1:
            removeCssVar("--highlight");

            // Update localstorage
            settings_global_object.bcss_highlight = false;

            break;
        case 2:
            removeCssVar("--highlight-dark");
            settings_global_object.bcss_highlight_dark = false;
            break;
        case 3:
            removeCssVar("--highlight-darker");
            settings_global_object.bcss_highlight_darker = false;
            break;
        case 4:
            removeCssVar("--border");
            settings_global_object.bcss_border = false;
            break;
        case 5:
            removeCssVar("--input-text");
            settings_global_object.bcss_input_text = false;
            break;
        case 6:
            removeCssVar("--input-placeholder");
            settings_global_object.bcss_placeholder = false;
            break;
        case 7:
            removeCssVar("--title-text");
            settings_global_object.bcss_title_text = false;
            break;
        case 8:
            removeCssVar("--main-background");
            settings_global_object.bcss_background = false;
            break;
        case 9:
            removeCssVar("--column-background");
            settings_global_object.bcss_col_background = false;
            break;
        case 10:
            removeCssVar("--se-background");
            settings_global_object.bcss_se_background = false;
            break;
        default:
            console.log("[settings] resetCustomCss got an invalid idx: " + idx);
            break;
    }

    updateLsSettings();     // Write to localstorage
}

function removeCssVar(name) {
    var r = document.querySelector(':root');
    r.style.removeProperty(name);
}

function updateCssFromSettings() {
    console.log("[settings] Applying custom css...");

    // Haters gonna hate
    if (settings_global_object.bcss_highlight)        applyCustomCss(1);
    else                                              resetCustomCss(1);

    if (settings_global_object.bcss_highlight_dark)   applyCustomCss(2);
    else                                              resetCustomCss(2);

    if (settings_global_object.bcss_highlight_darker) applyCustomCss(3);
    else                                              resetCustomCss(3);

    if (settings_global_object.bcss_border)           applyCustomCss(4);
    else                                              resetCustomCss(4);

    if (settings_global_object.bcss_input_text)       applyCustomCss(5);
    else                                              resetCustomCss(5);

    if (settings_global_object.bcss_placeholder)      applyCustomCss(6);
    else                                              resetCustomCss(6);

    if (settings_global_object.bcss_title_text)       applyCustomCss(7);
    else                                              resetCustomCss(7);

    if (settings_global_object.bcss_background)       applyCustomCss(8);
    else                                              resetCustomCss(8);

    if (settings_global_object.bcss_col_background)   applyCustomCss(9);
    else                                              resetCustomCss(9);

    if (settings_global_object.bcss_se_background)    applyCustomCss(10);
    else                                              resetCustomCss(10);
}

/* --------------------------------------------------------------- */
/* Default settings */
function checkEmptyLs() {
    const user_settings_len = 26;
    if (!localStorage.getItem('user_settings') || Object.keys(JSON.parse(localStorage.getItem('user_settings'))).length < user_settings_len) {
        console.log("[settings] Detected invalid settings in localstorage. Generating defaults...");
        var dso = new Object();

        dso.use_se_icons          = false;
        dso.delete_whole_se       = true;
        dso.capitalize_todos      = true;     // Same as starting items with ' '
        dso.shorten_links         = false;    // Same as starting links with '!'
        dso.use_cbackground_color = false;
        dso.cbackground_color     = "#690000";

        /* CSS variables */
        dso.bcss_highlight        = false;
        dso.ccss_highlight        = "#980000";
        dso.bcss_highlight_dark   = false;
        dso.ccss_highlight_dark   = "#690000";
        dso.bcss_highlight_darker = false;
        dso.ccss_highlight_darker = "#500000";
        dso.bcss_border           = false;
        dso.ccss_border           = "#333333";
        dso.bcss_input_text       = false;
        dso.ccss_input_text       = "#f2f2f2";
        dso.bcss_placeholder      = false;
        dso.ccss_placeholder      = "#b2b2b2";
        dso.bcss_title_text       = false;
        dso.ccss_title_text       = "#c1c1c1";
        /* title back is the same as border */
        dso.bcss_background       = false;
        dso.ccss_background       = "#121212";
        dso.bcss_col_background   = false;
        dso.ccss_col_background   = "#111111";
        /* search engine text is the same as titles */
        dso.bcss_se_background    = false;
        dso.ccss_se_background    = "#252525";

        var default_settings = JSON.stringify(dso);
        settings_global_object = JSON.parse(default_settings);
        updateLsSettings();
    }
}

/* Startup */
checkEmptyLs();
getLsSettings();
