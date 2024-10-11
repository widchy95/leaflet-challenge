// Initialize the map
var myMap = L.map("map").setView([37.09, -95.71], 5);

// Base layers for the map
var streets = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
}).addTo(myMap); // Add streets layer by default

var satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  maxZoom: 18
});

var grayscale = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  maxZoom: 19
});

var outdoors = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
});

// Add base layers to the map
var baseLayers = {
    "Street": streets,
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors
};

// Define the URL for the live earthquake data from USGS (past week)
var earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Define the URL for the tectonic plates data
var tectonicPlatesUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

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

// Create layer groups
var earthquakesLayer = L.layerGroup();
var tectonicPlatesLayer = L.layerGroup();

// Fetch the earthquake data from the USGS Earthquake GeoJSON
d3.json(earthquakeUrl).then(function(data) {
  var earthquakes = L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
      var geojsonMarkerOptions = {
        radius: markerSize(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]), // Depth is the third coordinate
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      };
      return L.circleMarker(latlng, geojsonMarkerOptions).bindPopup(`<h3>${feature.properties.place}</h3>
      <hr><p>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]} km</p>`);
    }
  });

  earthquakesLayer.addLayer(earthquakes); // Add earthquakes to the layer group
  earthquakesLayer.addTo(myMap); // Add layer group to the map

  // Create a legend for the map
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
        depths = [-10, 10, 30, 50, 70, 90],
        colors = ["#33ff33", "#99ff33", "#ffff33", "#ff9933", "#ff6633", "#ff3333"];

    for (var i = 0; i < depths.length; i++) {
      div.innerHTML +=
        '<i style="background:' + colors[i] + '; width: 18px; height: 18px; display: inline-block;"></i> ' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
    }

    return div;
  };

  legend.addTo(myMap);
});

// Fetch and plot tectonic plates data
d3.json(tectonicPlatesUrl).then(function(platesData) {
  var tectonicPlates = L.geoJson(platesData, {
    style: {
      color: "#ff0000",
      weight: 2,
      opacity: 1
    }
  });

  tectonicPlatesLayer.addLayer(tectonicPlates); // Add tectonic plates to the layer group

  // Add tectonic plates layer to the map
  tectonicPlatesLayer.addTo(myMap); 

  // Add a layer control
  L.control.layers(baseLayers, {
    "Earthquakes": earthquakesLayer,
    "Tectonic Plates": tectonicPlatesLayer
  }).addTo(myMap);
});
