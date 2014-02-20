var app = app || {};

app.TornadosView = Backbone.View.extend({
   
  el: '#posts',

  events:{
    'click .show-tornado-form':'showForm',
    'click #add':'addTornado'
  },

  addTornado: function( e ) {
      e.preventDefault();

      var formData = {};

      $( '#addTornado div' ).children( 'input', 'textarea' ).each( function( i, el ) {
        console.log("el.val: "+ $(el).val())
          if( $( el ).val() != '' )
          {
              formData[ el.id ] = $( el ).val();
          }
      });

      console.log(formData)
      // this.collection.add( formData )
      this.collection.create( formData );

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
        var postView = new app.TornadoView({
            model: item
        });
        this.$el.append( postView.render().el );
    },

    addTornadoButton: function(){
      if($('.show-tornado-form').length === 0){
        $('.addTornadoButton').append('<button class="btn btn-default show-tornado-form" type="button">Add a Tornado!</button>');
      }
    },

    // crawlTornadoBody: function(){
    //     $.getJSON('/data/torn.json', function(data){
    //       $.each(data, function(k,v){
    //         $('.emotions').each(function(){
    //           $(this).text(emotions)
    //         })
    //         console.log("Dates: "+dates+"Emotions: "+emotions+" Emails: "+email)
    //       })
    //     })
    //   },

    showForm: function(){
      $('.addTornado-container').toggleClass('hidden');
    }

});