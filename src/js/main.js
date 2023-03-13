wElems = {
    widget: document.getElementById("widget"),
    contentWeather: document.getElementById("weather_content"),
    contentCity: document.getElementById("city_content"),
    load: document.getElementById("load"),

    icon: document.getElementById("icon"),
    degrees: document.getElementById("degrees"),
    wind: document.getElementById("wind"),
    hum: document.getElementById("hum"),
    rain: document.getElementById("rain"),
    forecast: document.getElementsByClassName("forecast__card"),
};

const apiWeather = new WeatherApi(wElems);
const apiGeo = new GeoAPI();

// apiWeather.loadOff();
apiWeather.update();
setInterval(() => {
    apiWeather.update();
}, 5 * 60 * 1e3);
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

const search = {
    but: document.getElementsByClassName("city__search-btn")[0],
    name: document.getElementsByClassName("city__name")[0],
    inp: document.getElementsByClassName("city__search-input")[0],
};

["onclick", "ontouch"].forEach((event) => {
    search.but[event] = function () {
        search.but.classList.add("active");
        search.name.classList.add("active");
        search.inp.classList.add("active");
        search.inp.focus();
    };
});

search.inp.addEventListener("focusout", function () {
    search.but.classList.remove("active");
    search.name.classList.remove("active");
    search.inp.classList.remove("active");
    search.inp.value = "";
});
