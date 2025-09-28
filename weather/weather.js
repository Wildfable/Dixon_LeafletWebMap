var map = L.map('weathermap').setView([38, -95], 4);

var basemapUrl = 'https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png?rapidapi-key=ffc32c546cmsh2a5a8d13469a903p1be10ajsna2736de9a84a';

var basemap = L.tileLayer(basemapUrl, {
  attribution: '&copy; <a href="https://www.maptilesapi.com/">MapTiles API</a>',
  maxZoom: 19
}).addTo(map);

//add the national precipitation radar layer
var radarUrl = 'https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi';
var radarDisplayOptions = {
  layers: 'nexrad-n0r-900913',
  format: 'image/png',
  transparent: true
};
var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

//add alerts layer
var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
$.getJSON(weatherAlertsUrl, function(data) {
    //L.geoJSON(data).addTo(map);
    L.geoJSON(data, {
        style: function(feature){
            var alertColor = 'orange';
            if (feature.properties.severity === 'Severe') alertColor = 'red';
            if (feature.properties.severity === 'Extreme') alertColor = 'purple';
            if (feature.properties.severity === 'Minor') alertColor = 'green';
            return { color: alertColor };
          
          },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(feature.properties.headline);
                
            }
          
      }).addTo(map);
      
});

