class WeatherApi {
    static get KEY() {
        return "dcc1283cefc24fa29f9110250230603";
    }

    static get URL() {
        return "http://api.weatherapi.com/v1/forecast.json";
    }

    constructor(elems) {
        this.elems = elems;
        this.location = "Moscow";
        this._weather = {};
        this._geo = {};
    }

    update() {
        let url = new URL(WeatherApi.URL);
        url.searchParams.set("key", WeatherApi.KEY);
        url.searchParams.set("q", this.location);
        url.searchParams.set("days", 7);

        this.loadOn();

        setTimeout(() => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    this.elems.icon.src =
                        "https:" + data.current.condition.icon;
                    this.elems.degrees.textContent = data.current.temp_c;
                    this.elems.wind.textContent = `Wind:   ${(
                        (data.current.wind_kph * 1000) /
                        3600
                    ).toFixed(2)} m/s`;
                    this.elems.hum.textContent =
                        "Hum:   " + data.current.humidity + " %";
                    this.elems.rain.textContent =
                        "Rain:   " + data.current.precip_in + " %";

                    data.forecast.forecastday.forEach((cast, i) => {
                        this.elems.forecast[i].children[0].textContent =
                            cast.day.maxtemp_c + "°C";
                        this.elems.forecast[i].children[1].src =
                            "https:" + cast.day.condition.icon;
                        this.elems.forecast[i].children[2].textContent =
                            cast.day.mintemp_c + "°C";
                        this.elems.forecast[i].children[3].textContent =
                            new Date(cast.date).toDateString().slice(0, 3);
                    });

                    this.loadOff();
                });
        }, 1000);
    }

    loadOn() {
        for (let elem of this.elems.widget.children) elem.style.opacity = "0";
        this.elems.load.style.opacity = "1";
    }

    loadOff() {
        for (let elem of this.elems.widget.children) elem.style.opacity = "1";
        this.elems.load.style.opacity = "0";
    }
}
