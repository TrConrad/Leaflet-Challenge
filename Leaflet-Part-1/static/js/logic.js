
let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(geoData).then(function(data) {

    createFeatures(data.features);


});


function createFeatures(earthquakeData) {

    // Define markerSize and markerColor functions
    function markerSize(magnitude) {
        return Math.sqrt(magnitude)*5;
    }

    function markerColor(depth) {
        let color = "";
        if (depth < 10) {
            color = "yellowgreen";
        }
        else if (depth < 30) {
            color = "yellow";
        }
        else if (depth < 50) {
            color = "orange";
        }
        else if (depth < 70) {
            color = "red";
        }
        else if (depth < 90) {
            color = "blue";
        }
        else {
            color = "purple";
        }
        return color;
    }

    // Create one earthquakes variable and one map
    let earthquakes = L.layerGroup();

    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })

    //create variable to set center for map 
    let startingSpot = [earthquakeData[0].geometry.coordinates[1], earthquakeData[0].geometry.coordinates[0]]

    let myMap = L.map("map", {
        center: [
          ...startingSpot
        ],
        zoom: 5,
        layers: [street, earthquakes]
      });

    // Loop through earthquakeData array
    for (let i = 0; i < earthquakeData.length; i++) {
      let depth = earthquakeData[i].geometry.coordinates[2];
    
      //create markerDetails and program in markers
      let markerDetails = {
          radius: markerSize(earthquakeData[i].properties.mag),
          fillColor: markerColor(depth),
          color:"black",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
      };
    

      let latlng = [earthquakeData[i].geometry.coordinates[1], earthquakeData[i].geometry.coordinates[0]];

      let circleMarker = L.circleMarker(latlng, markerDetails);
      earthquakes.addLayer(circleMarker);

    //set popups
      circleMarker.bindPopup('<p>Location: ' + latlng + '<br />Depth: ' + depth + '<br />Magnitude: '+ earthquakeData[i].properties.mag +'</p>');
    };
  
    // Call createMap function once after the loop is finished
    createMap(earthquakes);

    //create map with base layers and overlays
  function createMap(earthquakes) {

    let baseMaps = {
      "Street Map": street
    };
    

    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    L.control.layers(baseMaps, overlayMaps, {
         collapsed: false
        }).addTo(myMap);
  }

// Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = [10, 30, 50, 70, 90];
    let colors = ["purple", "blue", "green", "yellow", "orange", "red"];
    let labels = [];

  // Add the legend contents.
    let legendInfo = 
      "<div class=\"labels\">" +
        "<div class=\"min\">" + "< 10 km" + "</div>" +
        "<div class=\"second\">" + "10-30 km" + "</div>" +
        "<div class=\"third\">" + "30-50 km" + "</div>" +
        "<div class=\"fourth\">" + "50-70 km" + "</div>" +
        "<div class=\"fifth\">" + "70-90 km" + "</div>" +
        "<div class=\"max\">" + "> 90 km" + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

// Adding the legend to the map
  legend.addTo(myMap);
}