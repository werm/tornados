var Router = Backbone.Router.extend({
  routes: {
    ""   :   "map",
    "states" : "states",
    "year/:year" : "year"
  },
  map: function () {
    // console.log("Router map:function.");
    // homeView.render();
  },
  states: function () {
    console.log("States.");
  },
  year: function () {

  },
});
var router = new Router;

router.on('route:map', function() {
  console.log("Router route:map")
  controlsView.render();
  homeView.render();
});

router.on('route:year', function() {
  console.log("Router route:year")
  controlsView.render();
  yearView.render();
});

Backbone.history.start({ pushState: true });