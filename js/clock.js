function currentTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);

    document.getElementById("clock").innerText = hour + ":" + min + ":" + sec;

    /* Timer */
    var t = setTimeout(currentTime, 1000);
}

function updateTime(k) {
    /* Add padding if less than 0 */
    if (k < 10)
        return "0" + k;
    else
        return k;
}

currentTime();
