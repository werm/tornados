var ControlsView = Backbone.View.extend({
  el: '#controls',
  events: {
    "change #years": "getByYear"
  },
  render: function(){
    var template = _.template($('#controls_template').html());
    this.$el.html(template);
    for (i = new Date().getFullYear(); i > 1949; i--){
      $('#years').append($('<option />').val(i).html(i));
    }
  },
  getByYear: function(){
    year = $('#years option:selected').val();
    path = window.location.pathname.split('/')[2]
    router.navigate('/year/'+year)
  }
});

var controlsView = new ControlsView();