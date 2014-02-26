var YearView = Backbone.View.extend({
  el: '#content',
  events: {
    "change #years": "getByYear"
  },
  initialize: function () {
    var _thisView = this;
    this.bind("reset", this.updateView);
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
  },

  // getByYear: function(){
  //   year = $('#years option:selected').val();
  //   router.navigate(year)
  //   console.log(year)
  // }
});