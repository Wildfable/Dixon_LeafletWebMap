var map = L.map('earthquakemap').setView([38, -95], 4);

var basemapUrl = 'https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=ffc32c546cmsh2a5a8d13469a903p1be10ajsna2736de9a84a';

var basemap = L.tileLayer(basemapUrl, {
  attribution: '&copy; <a href="https://www.maptilesapi.com/">MapTiles API</a>',
  maxZoom: 19
}).addTo(map);

//add the USGS earthquake layer
var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(earthquakeUrl, function(data){
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
        radius: 5,
        color: getmagColor(feature.properties.mag),
        weight: 2,
        fillColor: getmagColor(feature.properties.mag) ,
    

      });
    },
            onEachFeature: function(feature, layer) {
                const mag = feature.properties.mag;
                const place = feature.properties.place;
                const time = new Date(feature.properties.time).toLocaleString();
                layer.bindPopup(feature.properties.place + '<br>' + 'Magnitude:' + mag + '<br>' + time);
                
            }
          
      }).addTo(map);
      
});

function getmagColor(mag) {
  let alertColor = 'black'; 

  if (mag >= 8) alertColor = 'purple';
  else if (mag >= 7) alertColor = 'red';
  else if (mag >= 6) alertColor = 'orange';
  else if (mag >= 5) alertColor = 'yellow';
  else if (mag >= 3) alertColor = 'blue';
  else return 'green';

  return alertColor;
}
