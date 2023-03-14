class WeatherApi {
    static get KEY() {
        return "dcc1283cefc24fa29f9110250230603";
    }

    static get URL() {
        return "http://api.weatherapi.com/v1/forecast.json";
    }

    static async get(location) {
        let url = new URL(WeatherApi.URL);
        url.searchParams.set("key", WeatherApi.KEY);
        url.searchParams.set("q", location);
        url.searchParams.set("days", 7);
        const response = await fetch(url);
        return await response.json();
    }
}
