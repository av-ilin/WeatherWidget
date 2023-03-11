wElems = {
    widget: document.getElementById("widget"),
    // contentWeather: document.getElementById("weather_content"),
    // contentCity: document.getElementById("city_content"),
    load: document.getElementById("load"),

    icon: document.getElementById("icon"),
    degrees: document.getElementById("degrees"),
    wind: document.getElementById("wind"),
    hum: document.getElementById("hum"),
    rain: document.getElementById("rain"),
    forecast: document.getElementsByClassName("forecast__card"),
};
const apiWeather = new WeatherApi(wElems);
apiWeather.update();
setInterval(() => {
    apiWeather.update();
}, 5 * 60 * 1e3);

const apiGeo = new GeoAPI();
apiGeo.update();

const wDate = document.getElementById("date");
const wTime = document.getElementById("time");
let date = new Date();
wDate.textContent = date.getMyDate();
wTime.textContent = date.getMyTime();
setInterval(() => {
    date = new Date();
    wDate.textContent = date.getMyDate();
    wTime.textContent = date.getMyTime();
}, 15 * 1e3);

const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
    centeredSlides: true,
    roundLengths: true,
    slideToClickedSlide: true,
    mousewheel: {
        invert: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
