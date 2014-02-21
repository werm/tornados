$(function() {

var map;
var tornadoIcon;

var buildMap = function(view, zoom){

    if($('#map').length > 0){
      $("#map").remove();
      $('<div id="map" style="height: 480px"></div>').prependTo(".map_container"); 
    }

    map = new L.map('map', {
      scrollWheelZoom: false
    })

    var google = new L.Google('ROAD');

    map.addLayer(google);

    if(zoom === ''){
      map.locate({setView: view, maxZoom: 8});
    } else {
      map.locate({setView: view, maxZoom: zoom});
    }

  tornadoIcon = L.icon({
      iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAYAAADk3wSdAAACXklEQVQ4T52UvWtaYRTGz6tVEQWDODhpMujSIX4UHIrUyaVCcbFDh7TQPWYrdEiyFDol/QOkpUjnLm5KrZNItTezhdYMKgjaoAgWP/oc8cr1Ru+9yQURvef8znOe95xXkIEnhMdut7+dTqdP5/O53WKx9PH5PBwOzyVJ+qtGCD1mJBJ5KYT4aLVaye/3k9PppE6nQ91ul2w22/V4PH4C8B8l5xYUohImk+kIoP3FYiHhOxsIBCgWizFkndtut6lUKhFiflWr1cBOKAPNZvM3QHsul0sMBgOPw+GgdDq9AZQBrVaLisUi/0zX6/Wv8v8bStFqGWoeZTIZB6viJIZ6PJ6dLuVyOY75UqlUXmxAoXAP6o7R6lk4HCbA9axevy8UCtTr9f7NZrPnslrBQG4ZUSGfz0cMlZXBL0IhzQLcTaPRoH6/T+C8r9VqbwRUnSHxNB6PUzAYNKxQHYj2qdlsEhSHGSpB4cNkMvlAHWhEqZwzmUwon88T5vmDiEaji10+GoEqY9hfTMwVKy17vd7HqVTqltK7eCErZV8ZmoWnF/fxVKlS4enB8mhhAQ/uM7fbvVzFbQ+UXGPvJ/DsAO/XXWH/lys7Go14u04wCZfreeEdx6y+huoIXxpGW8fFMgDsB4q+wx1Q5jzNIVwtxW8U2pOLAPAKaj5pFdWEwhZOPlIAJEC/A5q9F3S1aQkkM9jFEACvYE1i2x2qLKLXfggj8nOVcINtCanvzm2KNaHyuCGRgaxQMnKAelC+pA95n40CNU9/5SmPi+5pq9XvVMpzy8F643MnT6F038ihbIP+B+sUFYNgB+nzAAAAAElFTkSuQmCC',

      iconSize:     [24,24], // size of the icon
      iconAnchor:   [12, 24], // point of the icon which will correspond to marker's location
      popupAnchor:  [-3, -32] // point from which the popup should open relative to the iconAnchor
  });
}

var getTwisters = function(url){
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSON',
        success: function(data){
          $.each(data, function(key, val){
              if(val.elat === '0' && val.slat !== '0'){
                var cmarker = L.circleMarker([val.slat, val.slon], 
                  { 
                    stroke: false, 
                    clickable: true 
                  });
                var popupContent = '<strong>F'+val.f+'</strong><br>'+val.date
                cmarker.addTo(map);
                cmarker.bindPopup(popupContent)
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
                      var marker = L.marker([val.slat, val.slon], {icon: tornadoIcon}).addTo(map);
                      marker.bindPopup("<strong>F"+val.f+"</strong><br><strong>"+address[0]+"</strong><br>Fatalities: "+val.fat+"<br>Injuries: "+val.inj+"<br>Traveled: "+val.len+" miles<br>"+moment(dateTime).format('MM/DD/YYYY hh:mm a'))
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

                var path = new L.Polyline(pointList, {
                  color: lineColor,
                  weight: 2,
                  opacity: 1,
                  smoothFactor: 1
                }).addTo(map);
                if(val.f === -9){
                  path.bindPopup("<strong>Undetermined F Scale</strong><br>Traveled: "+val.len+" miles<br>"+moment(dateTime).format('MM/DD/YYYY hh:mm a'))
                } else {
                path.bindPopup("<strong>F"+val.f+"</strong><br>Traveled: "+val.len+" miles<br>"+moment(dateTime).format('MM/DD/YYYY hh:mm a'))
              }
            }
            });
        }
      });
  } // getTwisters

  buildMap(true, 4);
  getTwisters('/api/tornados');

  map.on('click', function(e) { $('.coords').text("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng) })

    $.getJSON( "/api/state", function(data) {
      var opts = [];
      $.each(data, function(key, val){
        opts.push( '<option data-state="'+val.state+'" value="' + val.state + '" >' + val.full_name + '</li>' );
      });
      $( "<select/>", {
        // "class": "col-lg-2",
        "id": "state_select",
        "style": "width: 100%",
        html: opts.join( "" )
      }).appendTo( "#states" );
      function format(state) {
          var originalOption = state.element;
       
          return "<img class='flag' src='/img/flags/" + state.id.toLowerCase() + ".png' alt='" + $(originalOption).data('state') + "' />" + state.text;
      }

      $("#state_select").select2({
          formatResult: format,
          formatSelection: format,
          escapeMarkup: function(m) { return m; }
      });
      $('#state_select').css('width','100%');
    });

    $(document).on('change', '#state_select', function(){
      state = $('#state_select').val();
      $.get('/api/state/'+state, function(data){
        buildMap(true, 8)
        var geoStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.45
        };
        var stateJson = new L.GeoJSON.AJAX('/data/states/'+state+'.geo.json', { style: geoStyle });

        stateJson.addTo(map);
        var overlays={
          "json": stateJson
        }
      })
      getTwisters('/api/state_tornado/' + state)
    
    });

    $(":file").filestyle({
        classButton: "btn btn-default",
        buttonText: "Add Image",
        icon: false
      });

    timeNow = $.now();

    $('#published_at').val(timeNow)
});

