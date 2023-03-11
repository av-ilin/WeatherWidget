class GeoAPI {
    static get KEY() {
        return "dcc1283cefc24fa29f9110250230603";
    }

    static get URL() {
        return "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
    }

    update() {
        let query = "Mos";
        let url = new URL(GeoAPI.URL);
        // url.searchParams.set("key", WeatherApi.KEY);
        url.searchParams.set("namePrefix", query);
        url.searchParams.set("sort", "-population");
        url.searchParams.set("limit", "10");

        fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key":
                    "c45ff283c1msh3d3a885f7cb4692p1e9e2fjsn19500ec70090",
                "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
            });
    }
}
