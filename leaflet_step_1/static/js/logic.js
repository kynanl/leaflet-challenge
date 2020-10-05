
var myMap = L.map("mapid", {
    center: [40.776, -112.060],
    zoom: 13,
    // layers: 
});




// Create the tile layer that will be the background of our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

let markers = []
d3.json(link, function (data) {
    console.log(data);
    L.geoJson(data).addTo(myMap);
    //   let stations = data.data.stations;
    //   console.log(stations);
    //   for (station of stations) {
    //     const lat = +station.lat;
    //     const lon = +station.lon;
    //     const station_id = +station.station_id;
    //     const capacity = +station.capacity;
    //     const name = station.name
    //     L.marker([lat, lon]).addTo(myMap).bindPopup(`${station_id} : ${name} capacity: ${capacity}`)
    //   }
});
