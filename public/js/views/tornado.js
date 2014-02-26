var app = app || {};

app.TornadoView = Backbone.View.extend({
    tagName: 'div',
    className: 'tornadoContainer',
    template: _.template( $( '#map-template' ).html() ),

    events: {

    },

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );
        
        return this;
    },

    deleteTornado: function() {
        //Delete model
        this.model.destroy();
        
        // $.ajax({
        //     url: '/api/posts/'+this.model.id,
        //     type: 'DELETE',
        //     success: function( data ) {
        //         console.dir( data );
        //     }
        // });

      this.remove();
    }
});