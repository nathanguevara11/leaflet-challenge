//link to geo json data
let earthquake_json = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson"

//fetched earthquake data
d3.json(earthquake_json).then(function (data) {create_features(data.features)});

function create_features(earthquake)
{
// Looped through coordinates and created earthquake markers ()
let earthquake_marker = []; 
for (let i = 0; i < earthquake.length; i++) 
{

  // Initialized coordinate points 
  let lon = earthquake[i].geometry.coordinates[0]; 
  let lat = earthquake[i].geometry.coordinates[1]; 
  let depth = earthquake[i].geometry.coordinates[2];

  // Set the earthquake marker properties
  earthquake_marker.push(
    L.circle([lat,lon], {
      stroke: false,
      fillOpacity: 0.5, 
      color: markerColor(depth),
      radius: (markerSize(earthquake[i].properties.mag) * 10)
    }).bindPopup(`<h3>Place: ${earthquake[i].properties.place}</h3><hr><h3>Depth: ${earthquake[i].geometry.coordinates[2]}</h3><hr><h3>Mag: ${earthquake[i].properties.mag}</h3><hr><h3>Time: ${new Date(earthquake[i].properties.time)}</h3>`)
  );
}
// Map made using information passed into list
make_Map(earthquake_marker);

// Checking output
console.log(earthquake_marker); 
}

function markerSize(magnitude) 
{
  // Set size of popup
  return Math.sqrt(magnitude) * 1000;
}

function markerColor(depth)
{
  // Assigned color based on depth
  if (depth >= 90)
    {
      return "red"; 
    }   
    else if (depth >=70)
    {
      return "#FF4500"; 
    }   
    else if (depth >= 50)
    {
      return "orange"; 
    }    
    else if (depth >= 30)
    {
      return "yellow"; 
    }
    else if (depth >= 10)
    {
      return "lime"; 
    }  
    else if (depth <10)
    {
      return "green"; 
    }      
}

function make_Map(earthquake_marker)
{
//checking output
console.log(earthquake_marker);
//Openstreet maps used 
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
    

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Created Layer group
let quake = L.layerGroup(earthquake_marker); 

// Created a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

// Created an overlay object.
let overlayMaps = {
  "Quake": quake,
};

// Defined a map object.
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [street, topo, quake]
});

// Passed our map layers to our layer control
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

// Created legend to show depth bins
let legend = L.control({ position: "bottomright" });
legend.onAdd = function(myMap) 
{
  let div = L.DomUtil.create("div", "info legend");
  let num = [0, 10, 30, 50, 70, 90]; 
  let labels = ["<10", "10-30", "30-50", "50-70", "70-90", "90<"]; 
  for (i = 0; i < num.length; i++)
    {
      div.innerHTML += '<i style = "background:' + markerColor(num[i]) +'"></i> ' + labels[i] + '<br>'
    }
    return div; 
}

legend.addTo(myMap);
}




// let legend = L.control({ position: "bottomright" });
//   legend.onAdd = function() {
//     let div = L.DomUtil.create("div", "info legend");
//     let limits = geojson.options.limits;
//     let colors = geojson.options.colors;
//     let labels = [];

//     // Add the minimum and maximum.
//     let legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
//       "<div class=\"labels\">" +
//         "<div class=\"min\">" + limits[0] + "</div>" +
//         "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//       "</div>";

//     div.innerHTML = legendInfo;

//     limits.forEach(function(limit, index) {
//       labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//     });

//     div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     return div;
//   };

//   // Adding the legend to the map
//   legend.addTo(myMap);

// });























// // copied from activity day 3 

// // Define arrays to hold the created city and state markers.
// let cityMarkers = [];
// let stateMarkers = [];

// // Loop through locations, and create the city and state markers.
// for (let i = 0; i < earthquake.length; i++) {

//     let lat = earthquake[i].geometry.coordinates[1]; 
//     let lon = earthquake[i].geometry.coordinates[0]; 
//   // Setting the marker radius for the state by passing population into the markerSize function
//   stateMarkers.push(
//     L.circle([lat,lon], {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "white",
//       radius: markerSize(earthquake[i].properties.mag)
//     })
//   );

//   // Set the marker radius for the city by passing the population to the markerSize() function.
//   cityMarkers.push(
//     L.circle([lat,lon], {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "purple",
//       fillColor: "purple",
//       radius: markerSize(earthquake[i].properties.place)
//     })
//   );
// }

// // Create the base layers.
// let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// })

// let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
// 	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
// });

// // Create two separate layer groups: one for the city markers and another for the state markers.
// let earthquakes5= L.layerGroup(earthquake_marker);
// let cities = L.layerGroup();

// // Create a baseMaps object.
// let baseMaps = {
//   "Street Map": street,
//   "Topographic Map": topo
// };

// // Create an overlay object.
// let overlayMaps = {
//     Earthquakes: earthquakes5
// };

// // Define a map object.
// let myMap = L.map("map", {
//   center: [37.09, -95.71],
//   zoom: 5,
//   layers: [street, earthquake]
// });

// // Pass our map layers to our layer control.
// // Add the layer control to the map.
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);
