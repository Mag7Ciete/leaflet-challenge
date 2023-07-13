// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Add the base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fetch earthquake data from the USGS GeoJSON feed
var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/summary/all_week.geojson';
d3.json(url).then(function (data) {
  // Process the earthquake data
  var earthquakes = data.features;

  // Loop through the earthquakes and create markers
  earthquakes.forEach(function (earthquake) {
    var coords = earthquake.geometry.coordinates;
    var latLng = L.latLng(coords[1], coords[0]);

    // Create a marker for each earthquake
    L.marker(latLng).addTo(map)
      .bindPopup(earthquake.properties.title);
  });
});
