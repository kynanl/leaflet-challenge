

// Create the tile layer that will be the background of our map
lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

var baseMaps = {
    "Light Map": lightmap,
};

//link to geoJson
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
//access the data 
d3.json(link, function (data) {
    console.log(data);
    //function for style of circles
    function styleInfo(feature) {
        return {
            radius: mySize(feature.properties.mag),
            fillColor: myColor(feature.geometry.coordinates[2]),
            color: "#000000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6,
        };
    }

//function for circle size
        function mySize(magnitude) {
        return magnitude * 4
    };
//function for circle color 
        function myColor(depth) {
            switch (true) {
                case depth > 30:
                    return "#b30000";
                case depth > 15:
                    return "#e34a33";
                case depth > 10:
                    return "#fc8d59";
                case depth > 5:
                    return "#fdcc8a";
                case depth > 1:
                    return "#fef0d9";
                default:
                    return "#ffffcc";
            }
        }

        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
          style: styleInfo,
        onEachFeature: function (feature, layer) {
          layer.bindPopup(
            "Location: " + feature.properties.place + "<br> Magnitude: " +
              feature.properties.mag +
              "<br> Depth: " +
              feature.geometry.coordinates[2]
          );
        },
        }).addTo(myMap);
        //add a legend
        var legend = L.control({ position: "bottomright" });
        legend.onAdd = function (myMap) {
        var div = L.DomUtil.create("div", "info legend");
        var limits = [1, 5, 10, 15, 30];
        var colors =  ["#fef0d9","#fdcc8a","#fc8d59","#e34a33","#b30000"];
        var labels = [">1m", ">5m", ">10m", ">15m", ">30m"];

        // Add min & max
        var legendInfo = "<h1>Earthquake Depth</h1>"

        div.innerHTML = legendInfo;

        limits.forEach(function (limit, index, label) {
            labels.push("<li style=\"background-color: " + colors[index] + "\">  " + labels[index] +" </li>");
        });

        div.innerHTML += "<ul>" + labels.join(" ") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);
});

var myMap = L.map("mapid", {
    center: [39.0921167,-94.8559154],
    zoom: 4.4,
    layers: [lightmap]
});
