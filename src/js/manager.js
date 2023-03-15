class Manager {
    constructor() {
        this.location = "55.755826,37.617300";

        this.update();
        setInterval(() => {
            this.update();
        }, 5 * 60 * 1e3);

        Manager.city.name.textContent = "Москва";
        for (let i = 0; i < Manager.city.list.children.length; i++) {
            Manager.city.list.children[i].textContent = GeoAPI.CITY[i].name;
        }
        ["onclick", "ontouch"].forEach((event) => {
            Manager.city.but[event] = function () {
                Manager.city.but.classList.add("active");
                Manager.city.name.classList.add("active");
                Manager.city.inp.classList.add("active");
                Manager.city.list.classList.add("active");
                Manager.city.inp.focus();

                for (let i = 0; i < Manager.city.list.children.length; i++)
                    Manager.city.list.children[i].textContent =
                        GeoAPI.CITY[i].name;
            };
        });
        Manager.city.inp.oninput = function () {
            let query = Manager.city.inp.value;
            let json = GeoAPI.get(query);
            for (let i = 0; i < json.length; i++) {
                if (i + 1 > Manager.city.list.children.length) break;
                Manager.city.list.children[i].textContent = json[i].name;
            }
        };
        Manager.city.inp.addEventListener("focusout", function () {
            Manager.city.but.classList.remove("active");
            Manager.city.name.classList.remove("active");
            Manager.city.inp.classList.remove("active");
            Manager.city.list.classList.remove("active");
            Manager.city.inp.value = "";
        });
        for (let item of Manager.city.list.children) {
            ["onclick", "ontouch"].forEach((event) => {
                item[event] = () => {
                    Manager.city.name.textContent = item.textContent;
                    this.location = GeoAPI.getCoord(item.textContent);
                    this.update();
                };
            });
        }
    }

    update() {
        this.loadOn();
        let json = WeatherApi.get(this.location);
        json.then((data) => {
            console.log(data);
            Manager.weather.icon.src = "https:" + data.current.condition.icon;
            Manager.weather.degrees.textContent = data.current.temp_c;
            Manager.weather.wind.textContent = `Wind:   ${(
                (data.current.wind_kph * 1000) /
                3600
            ).toFixed(2)} m/s`;
            Manager.weather.hum.textContent =
                "Hum:   " + data.current.humidity + " %";
            Manager.weather.rain.textContent =
                "Rain:   " + data.current.precip_in + " %";

            data.forecast.forecastday.forEach((cast, i) => {
                Manager.weather.forecast[i].children[0].textContent =
                    cast.day.maxtemp_c + "°C";
                Manager.weather.forecast[i].children[1].src =
                    "https:" + cast.day.condition.icon;
                Manager.weather.forecast[i].children[2].textContent =
                    cast.day.mintemp_c + "°C";
                Manager.weather.forecast[i].children[3].textContent = new Date(
                    cast.date
                )
                    .toDateString()
                    .slice(0, 3);
            });

            let sunrise = data.forecast.forecastday[0].astro.sunrise;
            let sunset = data.forecast.forecastday[0].astro.sunset;
            Manager.weather.sunrise.time.textContent = sunrise;
            Manager.weather.sunset.time.textContent = sunset;

            sunrise = sunrise.split(/:| /).slice(0, 2);
            Manager.weather.sunrise.hour.style.transform = `rotate(${
                +sunrise[0] * 30 + 90 + (+sunrise[1] / 60) * 30
            }deg)`;
            Manager.weather.sunrise.min.style.transform = `rotate(${
                +sunrise[1] * 6 + 90
            }deg)`;

            sunset = sunset.split(/:| /).slice(0, 2);
            Manager.weather.sunset.hour.style.transform = `rotate(${
                +sunset[0] * 30 + 90 + (+sunset[1] / 60) * 30
            }deg)`;
            Manager.weather.sunset.min.style.transform = `rotate(${
                +sunset[1] * 6 + 90
            }deg)`;

            setTimeout(() => {
                this.loadOff();
            }, 500);
        });
    }

    loadOn() {
        for (let elem of Manager.weather.widget.children)
            elem.style.opacity = "0";
        Manager.weather.load.style.opacity = "1";
        Manager.weather.load.style.zIndex = "50";
    }

    loadOff() {
        for (let elem of Manager.weather.widget.children)
            elem.style.opacity = "1";
        Manager.weather.load.style.opacity = "0";
        Manager.weather.load.style.zIndex = "-1";
    }

    static weather = {
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

        sunrise: {
            time: document.getElementsByClassName("city__sun-time")[0],
            min: document.getElementsByClassName("city__sun-clock_min")[0],
            hour: document.getElementsByClassName("city__sun-clock_hour")[0],
        },
        sunset: {
            time: document.getElementsByClassName("city__sun-time")[1],
            min: document.getElementsByClassName("city__sun-clock_min")[1],
            hour: document.getElementsByClassName("city__sun-clock_hour")[1],
        },
    };

    static city = {
        but: document.getElementsByClassName("city__search-btn")[0],
        name: document.getElementsByClassName("city__name")[0],
        inp: document.getElementsByClassName("city__search-input")[0],
        list: document.getElementsByClassName("city__list")[0],
    };
}
