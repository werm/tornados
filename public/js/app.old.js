//MODELS
var Tornado = Backbone.Model.extend({
        url: '/api/posts'
});
var post = new Tornado({
        title: "Tornado Title", 
        body: "Put profound stuff here."
});

//VIEWS
var TornadoView = Backbone.View.extend({
        tagName: "div", //div is the default
        className: "row",
        template: _.template(post_index_tpl),
        render: function () {
                this.$el.html(this.template(this.model.attributes));

                $.getJSON('/api/posts', function(data){
                  $.each(data, function(k, v){
                    var posted_time = v.created_at
                    var timezone = Intl.DateTimeFormat().resolved.timeZone;
                    var s = moment(posted_time).tz(timezone).format("MMMM Do YYYY, h:mm a");
                    $('.dateTime').each(function(){
                      $(this).text(s);
                    })
                  })
                })

                return this;
        },
        events: {
          "click .read-more" : "open"
        },
        open: function () {
          RubyCms.navigate("post/" + this.model.id, true);
        }
});

var TornadoDetailView = TornadoView.extend({
        className: "box detail",
        events: {
          "click .edit" : "edit"
        },
        render: function () {
          this.$el.html(this.template(this.model.attributes));
        },
        edit: function () {
          RubyCms.navigate("post/" + this.model.id + "/edit", true);
        }
});

var TornadoEditView = TornadoView.extend({
        className: "box edit",
        events: {
                "click .save-button" : "save"
        },
        template: _.template(edit_post_tpl),
        save: function () {        
                //this.model.save(array of changed attributes);
        }
});

//COLLECTIONS
var TornadoList = Backbone.Collection.extend({
        model: Tornado,
        url: '/api/posts',
        parse: function (response) {
                return response;
        },
});

var posts = new TornadoList( [{title: "Accomplishments", body: "Met Sales Goals, Improved Hiring Process"},
  {title: "Shopping List", body: "Egg, Bacon, Milk, Toilet Paper"},
  {title: "HH Quote", body: "Education is the way to achieve far-reaching results, it is the proper way to promote compassion and tolerance in society."}]);


//COLLECTION VIEW
var TornadoListView = Backbone.View.extend({
        initialize: function () {
                this.collection.on('add', this.addOne, this);
        },
        render: function () {
                this.collection.forEach(this.addOne, this);
        },
        addOne: function (post) {
                var postView = new TornadoView({model: post});
                this.$el.append(postView.render().el);
        }

});
var postsView = new TornadoListView({collection: posts});


//ROUTERS
var RubyCms = new (Backbone.Router.extend({
        routes: {
                "":"index", 
                "/post/:id": "show",
                "/post/:id/edit": "edit"},
        initialize: function () {
                this.postList = new TornadoList();
                this.postList.on('reset', function () {
                        RubyCms.postListView = new TornadoListView({collection: RubyCms.postList});
                        RubyCms.postListView.render();
                        $("#app").html(RubyCms.postListView.el);
                });
                this.postList.fetch({reset: true});
        },
        start: function () {
                Backbone.history.start({pushState: true});
        },
        index: function () {
                //default view
        },
        show: function (id) {
                var postView = new TornadoDetailView({model: this.postList.get(id)});
                $("#app").html(postView.render().el);
        },
        edit: function (id) {
                var postView = new TornadoEditView({model: this.postList.get(id)});
                $("#app").html(postView.render().el);
        },
        clearAlerts: function(){
            window.setTimeout(function() {
              $(".alert").fadeTo(4500, 0).slideUp(500, function(){
                  $(this).remove();
              });
          }, 4000);
        }
}));

$(function(){
    RubyCms.start();
});