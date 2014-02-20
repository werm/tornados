var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;

$(function(){
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  };

  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  navigator.geolocation.getCurrentPosition(success, error, options);

  var map;

  function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
      zoom: 4
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    $.get('/api/tornados', function(data){
      $.each(data, function(key, val){
        if(val.elat === '0'){
          var dateArr = new Array(val.date +" "+val.time)
          var dateTime = dateArr.join(" ");
          var startLatLng = new google.maps.LatLng(val.slat, val.slon);
          var img = 'img/marker.png';       
          var tornadoInfo = "<strong>F"+val.f+"</strong><br>Dead: "+val.fat+"<br>Traveled: "+val.len+" miles<br>"+moment(dateTime).format('MM/DD/YYYY hh:mm a')
          var infowindow = new google.maps.InfoWindow({
              content: tornadoInfo
          });
          var infowindow = new google.maps.InfoWindow({
               content: tornadoInfo
           });

          var customMarker = new google.maps.Marker({
              position: startLatLng,
              map: map,
              icon: img
          });   

          google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,customMarker);
          });
          // var marker = L.marker([val.slat, val.slon]).addTo(map);
        } else {
          var tornadoCoordinates = [
            new google.maps.LatLng(val.slat, val.slon),
            new google.maps.LatLng(val.elat, val.elon)
          ];
          var tornadoPath = new google.maps.Polyline({
            path: tornadoCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
          });
          tornadoPath.setMap(map);
        }
      });
    },'json');
    // Try HTML5 geolocation
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = new google.maps.LatLng(position.coords.latitude,
                                         position.coords.longitude);

        // var infowindow = new google.maps.InfoWindow({
        //   map: map,
        //   position: pos,
        //   content: 'Location found using HTML5.'
        // });

        map.setCenter(pos);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleNoGeolocation(false);
    }
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
      var content = 'Error: The Geolocation service failed.';
    } else {
      var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
      map: map,
      position: new google.maps.LatLng(60, 105),
      content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
  }

  google.maps.event.addDomListener(window, 'load', initialize);


});