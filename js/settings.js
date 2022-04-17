const settMain = document.getElementById('settings-main-container');
const settTab = document.getElementById('settings-tab-container');
var settings_array;
var settingsw_active = false;       // Toggled by the icon thing

// TODO: Maybe move some of this file to update_settings.js ?
// TODO: Settings do not change

function toggleShowSettings() {
    if (settingsw_active) {
        settMain.style.display = "none";
    } else {
        settMain.style.display = "block";
    }

    settingsw_active = !settingsw_active;
}

/* --------------------------------------------------------------- */

function updateLsSettings(updated_settings) {
    localStorage.setItem('user_settings', JSON.stringify(updated_settings));
    renderSettings(updated_settings);
}

function getLsSettings() {
    const reference = localStorage.getItem('user_settings');
    if (reference) {
        settings_array = JSON.parse(reference);
        renderSettings(settings_array);
    }
}

function renderSettings() {
    updateBoolSetting("sbutton-seicon", settings_array.use_se_icons);
}

function updateBoolSetting(id, setting_state) {
    document.getElementById(id).checked = setting_state;
}

function checkEmptyLs() {
    if (!localStorage.getItem('user_settings')) {
        console.log("[settings] Detected no settings in localstorage. Generating defaults...")
        var dso = new Object();

        dso.use_light_theme     = false;
        dso.use_se_icons        = true;

        var default_settings = JSON.stringify(dso);
        updateLsSettings(JSON.parse(default_settings));
    }
}

/* --------------------------------------------------------------- */

settTab.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
});

function toggle(changeme) {
    Object.entries(settings_array).forEach(([key, value]) => {
        if (key == changeme) {
            item.setting_enabled = !item.setting_enabled;
        }
    })

    // settings_array.forEach(function(item) {
    //     if (item.id == id) {
    //         item.setting_enabled = !item.setting_enabled;
    //     }
    // });
    updateLsSettings(settings_array);
}

checkEmptyLs();
getLsSettings();
