class WeatherApi {
    static get KEY() {
        return "dcc1283cefc24fa29f9110250230603";
    }

    static get URL() {
        return "http://api.weatherapi.com/v1/current.json";
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

        this.loadOn();

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.elems.degrees.textContent = data.current.temp_c;
                this.elems.icon.src = "https:" + data.current.condition.icon;

                this.loadOff();
                console.log(data);
            });
    }

    loadOn() {
        this.elems.contentWeather.style.display = "none";
        this.elems.contentCity.style.display = "none";
        this.elems.load.style.display = "";
    }

    loadOff() {
        this.elems.contentWeather.style.display = "";
        this.elems.contentCity.style.display = "";
        this.elems.load.style.display = "none";
    }
}
