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
  else if (mag >= 6) alertColor = 'red';
  else if (mag >= 4) alertColor = 'orange';
  else if (mag >= 3) alertColor = 'yellow';
  else return 'green';

  return alertColor;
}




//add alerts layer
//var weatherAlertsUrl = 'https://api.weather.gov/alerts/active?region_type=land';
//$.getJSON(weatherAlertsUrl, function(data) {
    //L.geoJSON(data).addTo(map);
  //  L.geoJSON(data, {
    //    style: function(feature){
      //      var alertColor = 'orange';
      //      if (feature.properties.severity === 'Severe') alertColor = 'red';
       //     if (feature.properties.severity === 'Extreme') alertColor = 'purple';
        //    if (feature.properties.severity === 'Minor') alertColor = 'green';
         //   return { color: alertColor };
          
         // },
         //   onEachFeature: function(feature, layer) {
           //     layer.bindPopup(feature.properties.headline);
                
          //  }
          
    //  }).addTo(map);
      
// });


   //     var radarDisplayOptions = {
     //   layers: 'nexrad-n0r-900913',
       // format: 'image/png',
       // transparent: true
       // };
       // var radar = L.tileLayer.wms(radarUrl, radarDisplayOptions).addTo(map);

//     <script>
      //  var map = L.map("map", {center: [41.3147, -105.5690], zoom: 17});
        //Please modify center coordinate if you want to show different area
        
    //    L.tileLayer(
      //      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
       //     {attribution: '&copy; <a href="http://' + 
      //      'www.openstreetmap.org/copyright">OpenStreetMap</a>'}
      //  ).addTo(map);

        //add a point marker in the agriculture building at University of Wyoming

      //  var pnt = L.marker([41.3142, -105.5808]).addTo(map);

       // add a marker

   
      
        //add a circlemarker
  //  L.circleMarker(
   //     [41.3142, -105.5808- 0.001],
   //     {radius: 50, color: "black", fillColor: "red"}
    //   ).addTo(map);

        //add a line
   // var line = L.polyline(
    //    [[41.3142, -105.5808], [41.31207, -105.56826]],
      //      {color: "red", weight: 10}
      //  ).addTo(map);

        //add polygons
        
     //   var poL = L.polygon(
      //      [
       //         [31.263127, 34.803668],
       //         [31.262503, 34.803089],
       //         [31.261733, 34.803561],
       //         [31.262448, 34.804752]
       //     ],
       //     {color: "red", fillColor: "yellow", weight: 4}
      //  ).addTo(map);

  //   </script>