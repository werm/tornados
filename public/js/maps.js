    var map;
    var polyline;

    $(document).ready(function(){

    var getTwisters = function(url){
          $.ajax({
            url: url,
            type: 'GET',
            dataType: 'JSON',
            success: function(data){
              $.each(data, function(key, val){
                  if(val.elat === '0' && val.slat !== '0'){
                    console.log(val.id)
                  } else {
                    var dateArr = new Array(val.date +" "+val.time)
                    var dateTime = dateArr.join(" ");

                  if(val.f === 5){
                      $.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+val.slat+','+val.slon+'&sensor=true', function(place){
                        var address = [];
                        for (i = 0; i < place.results.length; i++) {
                          address[i] = place.results[i].formatted_address;
                          map.addMarker({
                            lat: val.slat,
                            lng: val.slon,
                            title: address,
                            click: function(e) {
                              console.log(address)
                            }
                          });
                        }
                      }, 'json');
                      
                      var lineColor = '#b00';
                    } else if(val.f === 4){
                      var lineColor = '#e00';
                    } else if(val.f === 3){
                      var lineColor = '#f22';
                    } else if(val.f === 2){
                      var lineColor = '#f55';
                    } else if(val.f === 1){
                      var lineColor = '#f77';
                    }  else if(val.f === 0){
                      var lineColor = '#f99';
                    } else {
                      var lineColor = '#9f5cfd'
                    }

                  path = [[val.slat, val.slon], [val.elat, val.elon]];

                  polyline = map.drawPolyline({
                    path: path,
                    strokeColor: lineColor,
                    strokeOpacity: 0.8,
                    strokeWeight: 4
                  });
                }
                });
            }
          });
        google.maps.event.addListener(polyline, 'click', function() {
          console.log('Polyline clicked!');
        });
      } // getTwisters

      $('#map').addClass('sr-only')
      GMaps.geolocate({
        success: function(position){
          map = new GMaps({
            div: '#map',
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            zoom: 4
          });
          map.setCenter(position.coords.latitude, position.coords.longitude);

          // $.
        },
        error: function(error){
          alert('Geolocation failed: '+error.message);
        },
        not_supported: function(){
          alert("Your browser does not support geolocation");
        },
        always: function(){
          console.log("Done");
          getTwisters('/api/tornados');
          $('#map').removeClass('sr-only').css('width','100%');
        }
      });
    });