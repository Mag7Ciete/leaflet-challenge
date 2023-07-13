// Wait for the document to load
document.addEventListener("DOMContentLoaded", function() {
  // Create a Leaflet map
  var myMap = L.map("map").setView([0, 0], 2);

  // Add a tile layer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 11
  }).addTo(myMap);

  // Fetch earthquake data using D3.js
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // Process the data and create markers
    data.features.forEach(function(feature) {
      var mag = feature.properties.mag;
      var depth = feature.geometry.coordinates[2];

      // Create a circle marker with size and color based on magnitude and depth
      var circle = L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        radius: mag * 2,
        fillColor: getColor(depth),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(myMap);

      // Add a popup with additional information
      circle.bindPopup("Magnitude: " + mag + "<br>Depth: " + depth);
    });
  });

  // Helper function to determine marker color based on depth
  function getColor(depth) {
    if (depth < 10) {
      return "#1a9850"; // Green
    } else if (depth < 30) {
      return "#fee08b"; // Yellow
    } else {
      return "#d73027"; // Red
    }
  }


// Create a legend control
var legend = L.control({ position: "bottomright" });
// Details for the legend
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "info legend");

  // Define the legend labels and corresponding colors
  var labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
  var colors = ["#1a9850", "#fee08b", "#d73027"];

  // Generate the legend HTML
  for (var i = 0; i < labels.length; i++) {
    div.innerHTML +=
    labels.push()
      '<i class="circle" style="background:' + colors[i] + '"></i> ' + labels[i] + "<br>";
  }
div.innerHTML = labels.join('<br>');
  return div;
};

// Add the legend to the map
legend.addTo(myMap);
} 
);