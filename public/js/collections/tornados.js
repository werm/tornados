var app = app || {};

app.Tornados = Backbone.Collection.extend({
    model: app.Tornado,
    url: '/data/torn.json'
});