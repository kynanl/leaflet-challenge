
var myMap = L.map("mapid", {
    center: [40.776, -112.060],
    zoom: 5
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
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng);
        },
        // style: styleInfo,
        // onEachFeature: function (feature, layer) {
        //   layer.bindPopup(
        //     "Location: " + feature.properties.place + "<hr> Magnitude: " +
        //       feature.properties.mag +
        //       "<br> Depth: " +
        //       feature.geometry.coordinates[2]
        //   );
        // },
      }).addTo(myMap);
});


    
    //     L.marker([lat, lon]).addTo(myMap).bindPopup(`${station_id} : ${name} capacity: ${capacity}`)
    //   }


// for (country of countries) {
//     let c = undefined;
//     if (country.points <= 90) {
//       let c = "red";
//     }else if (country.points <= 100) {
//       let c = "green";
//     }else {
//       let c = "black";
//     }
//     L.circle(country.location, {
//       color: c,
//       radius: 1500 * country.points
//     }).bindPopup(`<h1>${country.name}</h1><h2>Points: ${country.points}</h2>`)
//     .addTo(myMap);
//   };
// L.control.layers(baseMaps, {
//     collapsed: false
//   }).addTo(myMap);
  