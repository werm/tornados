var HomeView = Backbone.View.extend({
  model: homeModel,
  el: '#home',
  events: {
    // "change #years": "getByYear"
  },
  initialize: function (options) {
    var _thisView = this;
    _.bindAll(this, 'beforeRender', 'render', 'afterRender'); 
    var _this = this; 
    this.render = _.wrap(this.render, function(render) { 
        _this.beforeRender(); 
        render(); 
        _this.afterRender(); 
        return _this; 
    }); 
  },
  render: function () {
    // console.log(this.model.toJSON(), '', '  ');
    var template = _.template($('#home_template').html());
    this.$el.html(template);
    init = function() {

      var mapStyles = [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":20}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-100},{"lightness":40}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-10},{"lightness":30}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":10}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60},{"lightness":60}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"},{"saturation":-100},{"lightness":60}]}]

      var mapOptions = {
        center: new google.maps.LatLng(39.8282, -98.5795),
        zoom: 5,
        styles: mapStyles,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("home_map"),
      mapOptions);
    }

    google.maps.event.addDomListener(window, 'load', init);

    return this;

  },
  beforeRender: function() { 
    console.log('beforeRender'); 
  }, 

  afterRender: function() { 
    console.log('afterRender'); 
    this.model.fetch().done(function () {
      $.each(homeView.model.toJSON(), function(key, val){
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

      google.maps.event.addListener(map, "click", function (e) { 
        console.info(e.latLng.lat() + ' |' + e.latLng.lng());
      });
    });
  } 

});

var homeView = new HomeView();