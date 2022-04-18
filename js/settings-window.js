const settBack = document.getElementById('settings-background');
const settMain = document.getElementById('settings-main-container');
var settingsw_active = false;       // Toggled by the icon thing

function toggleShowSettings() {
    if (settingsw_active) {
        settMain.style.display = "none";
    } else {
        settMain.style.display = "block";
    }

    settingsw_active = !settingsw_active;
}

settBack.addEventListener('click', function(event) {
    if (event.type === 'click') toggleShowSettings();
});
