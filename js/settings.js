
/* TODO: Aren't boolean css_* properties useless? */
const default_settings = {
    use_se_icons : false,
    capitalize_todos : true,
    shorten_links : false,
    use_background_color : false,
    background_col : "#690000",

    /* CSS variables */
    css_highlight : false,
    css_highlight_col : "#980000",
    css_highlight_dark : false,
    css_highlight_dark_col : "#690000",
    css_highlight_darker : false,
    css_highlight_darker_col : "#500000",
    css_border : false,
    css_border_col : "#333333",
    css_input_text : false,
    css_input_text_col : "#f2f2f2",
    css_placeholder : false,
    css_placeholder_col : "#b2b2b2",
    css_title_text : false,
    css_title_text_col : "#c1c1c1",

    /* Title background is the same as border */
    css_background : false,
    css_background_col : "#121212",
    css_column_background : false,
    css_column_background_col : "#111111",

    /* Search engine text is the same as title, see css/variables.css */
    css_se_background : false,
    css_se_background_col : "#252525",
};

/* Initialize object to default settings */
var settings_object = default_settings;

/*----------------------------------------------------------------------------*/
/* Read and write settings from localstorage */

function writeStorageSettings() {
    localStorage.setItem('user_settings', JSON.stringify(settings_object));
    updateSettingsElements();
}

function readStorageSettings() {
    /* Get JSON string from localStorage */
    const reference = localStorage.getItem('user_settings');
    if (!reference)
        return;

    /* Parse localStorage JSON into object */
    const parsed = JSON.parse(reference);

    /* Iterate properties of parsed object */
    for (const [key, value] of Object.entries(parsed))
        /* If the property name is valid, save it */
        if (settings_object.hasOwnProperty(key))
            settings_object[key] = value;

    /* Update the checkboxes and color pickers of the settings section */
    updateSettingsElements();

    /* Update the webpage's background depending on settings_object */
    updateBackgroundFromSettings();

    /* Update CSS variables. See css/variables.css */
    applyAllCssFromSettings();
}

/*----------------------------------------------------------------------------*/
/* Rendering the settings (checkboxes, color, etc.) */

function updateSettingsElements() {
    function updateBool(id, val) {
        const element = document.getElementById(id);
        if (!element) {
            console.log(`[settings] Could not find element with id: ${id}`);
            return;
        }

        element.checked = val;
    }

    function updateStr(id, val) {
        const element = document.getElementById(id);
        if (!element) {
            console.log(`[settings] Could not find element with id: ${id}`);
            return;
        }

        element.value = val;
    }

    updateBool("use-se-icons", settings_object.use_se_icons);
    updateBool("capitalize-todos", settings_object.capitalize_todos);
    updateBool("shorten-links", settings_object.shorten_links);
    updateStr("col-background", settings_object.background_col);

    updateStr("css-col-highlight", settings_object.css_highlight_col);
    updateStr("css-col-highlight-dark", settings_object.css_highlight_dark_col);
    updateStr("css-col-highlight-darker",
              settings_object.css_highlight_darker_col);
    updateStr("css-col-border", settings_object.css_col_border_col);
    updateStr("css-col-input-text", settings_object.css_input_text_col);
    updateStr("css-col-placeholder", settings_object.css_placeholder_col);
    updateStr("css-col-title-text", settings_object.css_title_text_col);
    updateStr("css-col-background", settings_object.css_background_col);
    updateStr("css-col-column-background",
              settings_object.css_column_background_col);
    updateStr("css-col-se-background", settings_object.css_se_background_col);
}

/*----------------------------------------------------------------------------*/
/* Background */

function updateBackgroundFromSettings() {
    if (settings_object.use_background_color) {
        console.log("[settings] Applying custom background color...");
        document.body.style.background = settings_object.background_col;
    } else {
        console.log("[settings] Resetting background to the default image...");
        document.body.style.background =
          "url('./img/background.png') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover";
    }
}

/* NOTE: Called by the HTML buttons. */
function changeCustomBackground(wants_color) {
    settings_object.use_background_color = wants_color;

    /* We want to use plain background, update color itself */
    if (settings_object.use_background_color) {
        const color_picker = document.getElementById('col-background');
        settings_object.background_col = color_picker.value;
    }

    /* Write updated settings into localStorage */
    writeStorageSettings();

    /* Update the actual background of the page, to color or image */
    updateBackgroundFromSettings();
}

/*----------------------------------------------------------------------------*/
/* CSS variables */

function applyCssFromSettings(setting_name) {
    const css_root = document.querySelector(":root");

    /* "css_highlight" -> "--highlight" */
    const css_var_name = setting_name.replace("css_", "--");

    const is_enabled = settings_object[setting_name];
    if (!is_enabled) {
        /* Remove CSS property */
        css_root.style.removeProperty(css_var_name);
        return;
    }

    /* Get "css_highlight_col" */
    const color = settings_object[setting_name + "_col"];

    /* Set CSS variable to the color from the settings */
    css_root.style.setProperty(css_var_name, color);
}

function applyAllCssFromSettings() {
    console.log("[settings] Applying custom css...");

    /* Apply CSS for all "css_*" settings */
    for (const [key, value] of Object.entries(settings_object))
        if (key.startsWith("css_") && !key.endsWith("_col"))
            applyCssFromSettings("key");
}

/*----------------------------------------------------------------------------*/
/* Event listeners for settings */

/* Event listeners for the "Apply" buttons of CSS settings */
for (const element of document.getElementsByClassName("setting-apply-css")) {
    element.addEventListener("click", function(e) {
        /* Get first input at the same level as the current button */
        const input_element =
          e.target.parentElement.getElementsByTagName("input")[0];

        /* "css-col-highlight" -> "css_highlight" */
        const setting_name =
          input_element.id.replace("css-col", "css").replace("-", "_");

        /* First, we update the settings_object */
        settings_object[setting_name]          = true;
        settings_object[setting_name + "_col"] = input_element.value;

        /* Then, write updated settings into localStorage */
        writeStorageSettings();

        /* Finally, apply the CSS with the settings_object value */
        applyCssFromSettings(setting_name);
    });
}

/* Event listeners for the "Reset" buttons of CSS settings */
for (const element of document.getElementsByClassName("setting-reset-css")) {
    element.addEventListener("click", function(e) {
        /* Get first input at the same level as the current button */
        const input_element =
          e.target.parentElement.getElementsByTagName("input")[0];

        /* "css-col-highlight" -> "css_highlight" */
        const setting_name =
          input_element.id.replace("css-col", "css").replace("-", "_");

        /* First, we update the settings_object */
        settings_object[setting_name] = false;

        /* Then, write updated settings into localStorage */
        writeStorageSettings();

        /* Finally, apply the CSS with the settings_object value */
        applyCssFromSettings(setting_name);
    });
}

/* Event listeners for the checkboxes */
for (const element of document.getElementsByClassName("setting-checkbox")) {
    element.addEventListener("click", function(e) {
        /* "use-se-icons" -> "use_se_icons" */
        const replaced_id = e.target.id.replace("-", "_");

        /* Set to true/false depending on checkbox state */
        settings_object[replaced_id] = e.target.checked;

        /* Write updated settings into localStorage */
        writeStorageSettings();
    });
}

/*----------------------------------------------------------------------------*/

/* If there is no user settings in localStorage, write default one */
const reference = localStorage.getItem('user_settings');
if (!reference)
    writeStorageSettings();

/* Read settings from localStorage and update what's needed */
readStorageSettings();
