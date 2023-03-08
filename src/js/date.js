const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

Date.prototype.getMyDate = function () {
    let day = this.getDate().toString();
    if (day.at(-1) == 1 || day.at(-1) == 2 || day.at(-1) == 3) day += "st";
    else day += "th";
    let month = monthNames[this.getMonth()];
    let year = this.getFullYear();
    return `${day} ${month} ${year}`;
};
Date.prototype.getMyTime = function () {
    let day = dayNames[this.getDay()];
    let time = this.getHours() + ":";

    if (this.getMinutes() < 10) time += "0" + this.getMinutes() + " ";
    else time += this.getMinutes() + " ";

    if (this.getHours() < 12) time += "AM";
    else time += "PM";

    return `${day} ${time}`;
};
