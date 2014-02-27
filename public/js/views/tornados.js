var app = app || {};

app.TornadosView = Backbone.View.extend({
   
  el: '#map-canvas',

  events:{
    // 'click #add':'addTornado'
  },

    initialize: function() {
        this.collection = new app.Tornados();
        this.collection.fetch({reset: true}); // NEW
        this.render();

        this.listenTo( this.collection, 'add', this.renderTornado );
        this.listenTo( this.collection, 'reset', this.render ); // NEW
    },

    // render posts by rendering each tornado in its collection
    render: function() {
        this.collection.each(function( item ) {
            this.renderTornado( item );
        }, this );
    },

    // render a tornado by creating a TornadoView and appending the
    // element it renders to the posts's element
    renderTornado: function( item ) {
        var tornadosView = new app.TornadosView({
            model: item
        });
        this.$el.append( tornadosView.render().el );
    }

});