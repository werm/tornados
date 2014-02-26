var map;
var init;

var HomeModel = Backbone.Model.extend({
  // Using the response from https://gist.github.com/4531534
  url: '/api/tornados'
});

var HomeView = Backbone.View.extend({
  el: '#content',
  events: {
    "change #years": "getByYear"
  },
  initialize: function () {
    var _thisView = this;

  },
  render: function () {
    // console.log(this.model.toJSON(), '', '  ');
    var template = _.template($('#map_template').html());
    init = function() {

      var mapStyles = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":40}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-10},{"lightness":30}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":60}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]}]

      var mapOptions = {
        center: new google.maps.LatLng(39.8282, -98.5795),
        zoom: 5,
        styles: mapStyles,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', init);
    this.$el.html(template);
    return this;
  },
  getByYear: function(){
    year = $('#years option:selected').val();
    router.navigate('/year/'+year)
    console.log(year)
  }
});

// Initialize the Model
var homeModel = new HomeModel();
var yearModel = new YearModel();
// Initialize the View, passing it the model instance
var homeView = new HomeView({
  model: homeModel
});

var yearView = new YearView({
  model: yearModel
});

var Router = Backbone.Router.extend({
  routes: {
    ""   :   "map",
    "states" : "states",
    "year/:year" : "year"
  },
  map: function () {
    console.log("Map.");
    homeView.render();
  },
  states: function () {
    console.log("States.");
  },
  year: function () {
    console.log("yearView router")
    yearView.render();
  },
});
var router = new Router;

router.on('route:map', function() {
  homeView.model.fetch().done(function () {
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

router.on('route:year', function() {
  yearView.model.fetch().done(function () {

      $.each(yearView.model.toJSON(), function(key, val){
        if(val.elon !== '0'){

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

Backbone.history.start({ pushState: true });