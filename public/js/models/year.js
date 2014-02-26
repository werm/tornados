// var year = location.search.split('/')[1]
var year = window.location.pathname.split('/')[2]
var YearModel = Backbone.Model.extend({
  url: '/api/year/'+year,
});