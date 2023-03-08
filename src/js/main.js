wElems = {
    contentWeather: document.getElementById("weather_content"),
    contentCity: document.getElementById("city_content"),
    load: document.getElementById("load"),
    icon: document.getElementById("icon"),
    degrees: document.getElementById("degrees"),
};
const api = new WeatherApi(wElems);
api.update();

const wDate = document.getElementById("date");
const wTime = document.getElementById("time");
let date = new Date();
wDate.textContent = date.getMyDate();
wTime.textContent = date.getMyTime();
setInterval(() => {
    date = new Date();
    wDate.textContent = date.getMyDate();
    wTime.textContent = date.getMyTime();
}, 15000);
