var app = app || {};

// cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
//   $('#konami').removeClass('hidden').delay(2000).fadeOut();
// });

var userLat;
var userLon;
var tornadoIcon;

$(function() {

  //Populate date picker
  for (i = new Date().getFullYear(); i > 1956; i--){
      $('#yearpicker').append($('<option />').val(i).html(i));
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;

    var mapboxTiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/werm82.hb7p0d1k/{z}/{x}/{y}.png', {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });
    var map = L.map('map')
        .addLayer(mapboxTiles)
        .setView([userLat, userLon], 5);

  tornadoIcon = L.icon({
      iconUrl: 'img/tornado.png',
      shadowUrl: 'img/tornado_shadow.png',

      iconSize:     [32,32], // size of the icon
      shadowSize:   [37,26], // size of the shadow
      iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
      shadowAnchor: [-6,32],  // the same for the shadow
      popupAnchor:  [-3, -32] // point from which the popup should open relative to the iconAnchor
  });

  var getTwisters = function(url){

        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'JSON',
          success: function(data){
            $.each(data, function(key, val){
                if(val.elat === '0'){
                  // var marker = L.marker([val.slat, val.slon]).addTo(map);
                } else {
                  var startPt = L.latLng(val.slat, val.slon)
                  var endPt = L.latLng(val.elat, val.elon);
                  var pointList = [startPt, endPt];

                  var dateArr = new Array(val.date +" "+val.time)
                  var dateTime = dateArr.join(" ");

                if(val.f === 5){
                    $.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+val.slat+','+val.slon+'&sensor=true', function(place){
                      var address = [];
                      for (i = 0; i < place.results.length; i++) {
                        address[i] = place.results[i].formatted_address;
                        // var marker = L.marker([val.slat, val.slon]).addTo(map);
                        var marker = L.marker([val.slat, val.slon], {icon: tornadoIcon}).addTo(bigTornados);
                        marker.bindPopup("<strong>F"+val.f+"</strong><br><strong>"+address[0]+"</strong><br>Fatalities: "+val.fat+"<br>Injuries: "+val.inj+"<br>Traveled: "+val.len+" miles<br>"+moment(dateTime).format('MM/DD/YYYY hh:mm a'));
                      }
                    }, 'json');
                    
                    var lineColor = '#b00';
                    var lineWt = '4';
                  } else if(val.f === 4){
                    var lineColor = '#e00';
                    var lineWt = '3.5';
                  } else if(val.f === 3){
                    var lineColor = '#f22';
                    var lineWt = '3';
                  } else if(val.f === 2){
                    var lineColor = '#f55';
                    var lineWt = '2.5';
                  } else if(val.f === 1){
                    var lineColor = '#f77';
                    var lineWt = '2';
                  }  else if(val.f === 0){
                    var lineColor = '#f99';
                    var lineWt = '1.5';
                  } else {
                    var lineColor = '#9f5cfd'
                    var lineWt = '1';
                  }

                  var path = new L.Polyline(pointList, {
                    color: lineColor,
                    weight: lineWt,
                    opacity: 1,
                    smoothFactor: 1
                  }).addTo(map);
                  if(val.f === -9){
                    path.bindPopup("<strong>Undetermined F Scale</strong><br>Traveled: "+val.len+" miles<br>"+moment(dateTime).format('MM/DD/YYYY hh:mm a'))
                  } else {
                  path.bindPopup("<strong>F"+val.f+"</strong><br>Fatalities: "+val.fat+"<br>Injuries: "+val.inj+"<br>Traveled: "+val.len+" miles<br>"+moment(dateTime).format('MM/DD/YYYY hh:mm a'));
                }
              }
              });
          }
        });
      var bigTornados = L.layerGroup().addTo(map);
    } // getTwisters
 
 getTwisters('/api/tornados')
});
    $(":file").filestyle({
        classButton: "btn btn-default",
        buttonText: "Add Image",
        icon: false
      });

    timeNow = $.now();

    $('#published_at').val(timeNow)
});

