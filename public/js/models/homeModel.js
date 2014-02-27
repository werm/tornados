var HomeModel = Backbone.Model.extend({
  url: '/api/tornados'
});

var homeModel = new HomeModel();