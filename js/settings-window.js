function toggleShowSettings() {
    const main_container = document.getElementById("settings-main-container");

    if (main_container.style.display == "block") 
        main_container.style.display = "none";
    else 
        main_container.style.display = "block";
}

document.getElementById("settings-background").addEventListener("click", toggleShowSettings);
document.getElementById("settings-button").addEventListener("click", toggleShowSettings);
