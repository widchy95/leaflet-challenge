// Initialize the map
var myMap = L.map("map").setView([37.09, -95.71], 5);

// Add the base tile layer from OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
}).addTo(myMap);

// Define the URL for the live earthquake data from USGS (past week)
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Function to determine marker size based on magnitude
function markerSize(magnitude) {
  return magnitude * 3;
}

// Function to determine marker color based on depth
function getColor(depth) {
  return depth > 90  ? "#ff3333" : // Red for depth > 90
         depth > 70  ? "#ff6633" : // Dark orange for depth > 70
         depth > 50  ? "#ff9933" : // Orange for depth > 50
         depth > 30  ? "#ffff33" : // Yellow for depth > 30
         depth > 10  ? "#99ff33" : // Light green for depth > 10
                       "#33ff33";  // Green for depth <= 10
}

// Fetch the data from the USGS Earthquake GeoJSON
d3.json(earthquakeUrl).then(function(data) {
  // Create a GeoJSON layer with the data
  L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      // Define marker options
      var geojsonMarkerOptions = {
        radius: markerSize(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]), // Depth is the third coordinate
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      // Add circle markers to map
      return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(`<h3>${feature.properties.place}</h3>
      <hr><p>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]} km</p>`);
    }
  }).addTo(myMap);

  // Create a legend for the map
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
        depths = [-10, 10, 30, 50, 70, 90],
        colors = ["#33ff33", "#99ff33", "#ffff33", "#ff9933", "#ff6633", "#ff3333"];

    // Loop through depth intervals and generate labels with colored squares
    for (var i = 0; i < depths.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colors[i] + '; width: 18px; height: 18px; display: inline-block;"></i> ' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
    }

    return div;
  };

  // Add the legend to the map
  legend.addTo(myMap);
});
