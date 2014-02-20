var app = app || {};

// cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
//   $('#konami').removeClass('hidden').delay(2000).fadeOut();
// });

$(function() {

  var map = L.map('map').setView([39.50, -98.35], 4);

  L.tileLayer.provider('Nokia.terrainDay', {
      devID: 'ke5fO19txNsmvco1p6NB',
      appID: 'vJxW7dLyFZ8dWCFAsobg_A'
    }).addTo(map);

  var tornadoIcon = L.icon({
      iconUrl: 'img/tornado.png',
      shadowUrl: 'img/tornado_shadow.png',

      iconSize:     [32,32], // size of the icon
      shadowSize:   [37,26], // size of the shadow
      iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
      shadowAnchor: [-6,32],  // the same for the shadow
      popupAnchor:  [-3, -32] // point from which the popup should open relative to the iconAnchor
  });

      $.get('/api/tornados', function(data){
      $.each(data, function(key, val){
            var userLatLng = new google.maps.LatLng(val.slat, val.slon);
              if(val.elat === '0'){
                // var marker = L.marker([val.slat, val.slon]).addTo(map);
              } else {
                var startPt = L.latLng(val.slat, val.slon)
                var endPt = L.latLng(val.elat, val.elon);
                var pointList = [startPt, endPt];

                var dateArr = new Array(val.date +" "+val.time)
                var dateTime = dateArr.join(" ");

              if(val.f === 5){
                  $.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+val.slat+','+val.slon+'&sensor=false', function(place){
                    $.each(place.results, function(k, v){
                      console.log(v[4].formatted_address)
                      // var marker = L.marker([val.slat, val.slon], {icon: tornadoIcon}).addTo(map);;
                      // marker.bindPopup("<strong>F"+val.f+"</strong><br><strong>"+v[4].formatted_address+"</strong><br>Dead: "+val.fat+"<br>Traveled: "+val.len+" miles<br>"+moment(dateTime).format('MM/DD/YYYY hh:mm a'))
                    })
                  });
                  var lineColor = '#b00';
                } else if(val.f === 4){
                  var lineColor = '#e00';
                } else if(val.f === 3){
                  var lineColor = '#f22';
                } else if(val.f === 2){
                  var lineColor = '#f55';
                } else if(val.f === 1){
                  var lineColor = '#f77';
                } 

                var path = new L.Polyline(pointList, {
                  color: lineColor,
                  weight: 2,
                  opacity: 1,
                  smoothFactor: 1
                }).addTo(map);
                path.bindPopup("<strong>F"+val.f+"</strong><br>Traveled: "+val.len+" miles<br>"+moment(dateTime).format('MM/DD/YYYY hh:mm a'))
              }
            })
        },
        'json'
    );

    $(":file").filestyle({
        classButton: "btn btn-default",
        buttonText: "Add Image",
        icon: false
      });

    timeNow = $.now();

    $('#published_at').val(timeNow)
});

