var TornadoView = Backbone.View.extend({
  model: tornados,
  this.model.fetch().done(function () {
    $.each(homeView.model.toJSON(), function(key, val){
      if(val.elon !== '0'){
        console.log(val.f)
        var contentString = '<div id="content">'+
             '<div id="siteNotice">'+
             '<h3>F'+val.f+'</h3>'+
             '<div id="bodyContent"><span class="date">'+val.mo+'/'+val.dy+'/'+val.yr+'</span><br>'+
             '<span class="stats"><strong>Fatalities</strong>: '+val.fat+' <strong>Injuries</strong>: '+val.inj+'</span><br>'+
             '<span class="length"><strong>Length</strong>: '+val.len+' miles</span>'+
             '</div>'+
             '</div>';

         var infowindow = new google.maps.InfoWindow({
             content: contentString,
         });

        tornadoCoords = [
          new google.maps.LatLng(val.slat, val.slon),
          new google.maps.LatLng(val.elat, val.elon)
        ]
        var tornadoPath = new google.maps.Polyline({
          path: tornadoCoords,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 0.7,
          strokeWeight: 3
        });
        var fIcon = '/img/f'+val.f+'.png' 
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(val.slat, val.slon),
            map: map,
            icon: fIcon
        });
        tornadoPath.setMap(map)
        google.maps.event.addListener(marker, 'click', function() {
          console.log(new google.maps.LatLng(val.slat, val.slon))
          infowindow.setPosition(new google.maps.LatLng(val.slat, val.slon));
          infowindow.open(map, marker);
        });
      }
    }); // each
    for (i = new Date().getFullYear(); i > 1949; i--){
      $('#years').append($('<option />').val(i).html(i));
    }
    google.maps.event.addListener(map, "click", function (e) { 
      console.info(e.latLng.lat() + ' |' + e.latLng.lng());
    });
  });
});