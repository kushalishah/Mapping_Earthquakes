// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
// var map = L.map('mapid').setView([34.0522, -118.2437], 13);
// streets.addTo(map);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    L.marker(city.location, {
        radius: city.population/100000
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
  .addTo(map);
});

  // Add console.log to check to see if our code is working.
  console.log("working");

  // We create the tile layer that will be the background of our map.
  //  Add a marker to the map for Los Angeles, California.
  
  let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });
  
  // We create the dark view tile layer that will be an option for our map.
  let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY
  });
  
  // Create a base layer that holds both maps.
  let baseMaps = {
      Light: light,
      Dark: dark
    };
  
    // Create the map object with center, zoom level and default layer.
  let map = L.map('mapid', {
      center: [44.0, -80.0],
      zoom: 2,
      layers: [streets]
  })
  
  // Accessing the Toronto airline routes GeoJSON URL.
  let torontoData = "https://raw.githubusercontent.com/kushalishah/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";
  
  // Grabbing our GeoJSON data.
  d3.json(torontoData).then(function(data) {
      console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJson(data).addTo(map);
  });
  
  // Pass our map layers into our layers control and add the layers control to the map.
  L.control.layers(baseMaps).addTo(map);
