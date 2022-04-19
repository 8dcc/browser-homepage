const settTab = document.getElementById('settings-tab-container');
var settings_global_object;

// TODO: Make a checkbox setting to change the css text color with the backgound
//       Inside updateBackgroundFromSettings
// TODO: Change webkit scrollbar background with the background update

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
    } else {
        checkEmptyLs();
    }
}

/* --------------------------------------------------------------- */
/* Rendering the settings (checkboxes, color, etc.) */
function renderSettings() {
    updateBoolSetting("use-se-icons", settings_global_object.use_se_icons);
    updateBoolSetting("delete-whole-se", settings_global_object.delete_whole_se);
    updateStringSetting("cbackground-color", settings_global_object.cbackground_color);
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
    settings_global_object[changeme] = !settings_global_object[changeme];
    updateLsSettings();
}

/* --------------------------------------------------------------- */
/* Backgrounnd */
function changeCustomBackground(use_color) {                 // Change the background settings. Called by the html buttons
    const cb_c = document.getElementById('cbackground-color')

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
        console.log("[settings] Applying custom background color...")
        applyCustomBackground(settings_global_object.cbackground_color);
    } else {
        console.log("[settings] Resetting background to the default image...")
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
/* Default settings */
function checkEmptyLs() {
    if (!localStorage.getItem('user_settings')) {
        console.log("[settings] Detected no settings in localstorage. Generating defaults...")
        var dso = new Object();

        dso.use_se_icons            = false;
        dso.delete_whole_se         = true;
        dso.use_light_theme         = false;    // Not used atm
        dso.use_cbackground_color   = false;
        dso.cbackground_color       = "#690000";

        var default_settings = JSON.stringify(dso);
        settings_global_object = JSON.parse(default_settings);
        updateLsSettings();
    }
}

/* Startup */
checkEmptyLs();
getLsSettings();
