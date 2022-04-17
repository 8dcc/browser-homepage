const settBack = document.getElementById('settings-background');
var settingsw_active = false;

function toggleShowSettings() {
    if (settingsw_active) {
        settBack.style.display = "none";
    } else {
        settBack.style.display = "block";
    }

    settingsw_active = !settingsw_active;
}
