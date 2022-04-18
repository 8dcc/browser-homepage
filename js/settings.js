const settTab = document.getElementById('settings-tab-container');
var settings_global_object;


function updateLsSettings() {
    localStorage.setItem('user_settings', JSON.stringify(settings_global_object));
    renderSettings();
}

function getLsSettings() {
    const reference = localStorage.getItem('user_settings');
    if (reference) {
        settings_global_object = JSON.parse(reference);
        renderSettings(settings_global_object);
    }
}

/* --------------------------------------------------------------- */

function renderSettings() {
    updateBoolSetting("use_se_icons", settings_global_object.use_se_icons);
    updateBoolSetting("delete_whole_se", settings_global_object.delete_whole_se);
}

function updateBoolSetting(id, setting_state) {
    const element = document.getElementById(id);
    if (element) {
        element.checked = setting_state;
    } else {
        console.log(`[settings] Could not find element with id: ${id}`)
    }
}

/* --------------------------------------------------------------- */

settTab.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggleSetting(event.target.getAttribute('id'));
    }
});

function toggleSetting(changeme) {
    settings_global_object[changeme] = !settings_global_object[changeme];
    updateLsSettings();
}

/* --------------------------------------------------------------- */

function checkEmptyLs() {
    if (!localStorage.getItem('user_settings')) {
        console.log("[settings] Detected no settings in localstorage. Generating defaults...")
        var dso = new Object();

        dso.use_light_theme         = false;    // Not used atm
        dso.use_se_icons            = false;
        dso.delete_whole_se         = true;

        var default_settings = JSON.stringify(dso);
        settings_global_object = JSON.parse(default_settings);
        updateLsSettings();
    }
}

checkEmptyLs();
getLsSettings();
