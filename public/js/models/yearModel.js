// var year = location.search.split('/')[1]
year = window.location.pathname.split('/')[2]
var YearModel = Backbone.Model.extend({
  url: '/api/year/'+year,
});

var yearModel = new YearModel();