app = new Backbone.Marionette.Application();

app.addRegions({
  mainRegion: "#content"
});

AngryCat = Backbone.Model.extend({
  defaults: {
    votes: 0
  },
  
  addVote: function(){
    this.set('votes', this.get('votes') + 1);
  },
  
  rankUp: function() {
    this.set({rank: this.get('rank') - 1});
  },
  
  rankDown: function() {
    this.set({rank: this.get('rank') + 1});
  }
});

AngryCats = Backbone.Collection.extend({
  model: AngryCat,
  
  initialize: function(cats){
    var rank = 1;
    _.each(cats, function(cat) {
      cat.set('rank', rank);
      ++rank;
    });
    
    this.on('add', function(cat){ if( ! cat.get('rank') ) console.error("Cat must have a rank defined before being added to the collection"); });
    
    var self = this;

    app.vent.on("rank:up", function(cat){
      if (cat.get('rank') == 1) {
        // can't increase rank of top-ranked cat
        return true;
      }
      self.rankUp(cat);
      self.sort();
    });

    app.vent.on("rank:down", function(cat){
      if (cat.get('rank') == self.size()) {
        // can't decrease rank of lowest ranked cat
        return true;
      }
      self.rankDown(cat);
      self.sort();
    });
    
    app.vent.on("cat:disqualify", function(cat){
      var disqualifiedRank = cat.get('rank');
      var catsToUprank = self.filter(
        function(cat){ return cat.get('rank') > disqualifiedRank; }
      );
      catsToUprank.forEach(function(cat){
        cat.rankUp();
      });
      self.trigger('reset');
    });
  },

  comparator: function(cat) {
    return cat.get('rank');
  },
  
  rankUp: function(cat) {
    // find the cat we're going to swap ranks with
    var rankToSwap = cat.get('rank') - 1;
    var otherCat = this.at(rankToSwap - 1);
    
    // swap ranks
    cat.rankUp();
    otherCat.rankDown();
  },
  
  rankDown: function(cat) {
    // find the cat we're going to swap ranks with
    var rankToSwap = cat.get('rank') + 1;
    var otherCat = this.at(rankToSwap - 1);
    
    // swap ranks
    cat.rankDown();
    otherCat.rankUp();
  }
});

AngryCatView = Backbone.Marionette.ItemView.extend({
  template: "#angry_cat-template",
  tagName: 'tr',
  className: 'angry_cat',
  
  events: {
    'click .rank_up img': 'rankUp',
    'click .rank_down img': 'rankDown',
    'click a.disqualify': 'disqualify'
  },
  
  initialize: function(){
    this.listenTo(this.model, "change:votes", this.render);
  },
  
  rankUp: function(){
    this.model.addVote();
    app.vent.trigger("rank:up", this.model);
  },
  
  rankDown: function(){
    this.model.addVote();
    app.vent.trigger("rank:down", this.model);
  },
  
  disqualify: function(){
    app.vent.trigger("cat:disqualify", this.model);
    this.model.destroy();
  }
});

AngryCatsView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  id: "angry_cats",
  className: "table-striped table-bordered",
  template: "#angry_cats-template",
  itemView: AngryCatView,
  
  appendHtml: function(collectionView, itemView){
    collectionView.$("tbody").append(itemView.el);
  }
});

app.addInitializer(function(options){
  var angryCatsView = new AngryCatsView({
    collection: options.cats
  });
  app.mainRegion.show(angryCatsView);
});

$(document).ready(function(){
  var cats = new AngryCats([
      new AngryCat({ name: 'Alfred', image_path: 'http://placehold.it/75x75&text=Alfred' }),
      new AngryCat({ name: 'Barbara', image_path: 'http://placehold.it/75x75&text=Barbara' }),
      new AngryCat({ name: 'Charlie', image_path: 'http://placehold.it/75x75&text=Charlie' })
  ]);

  app.start({cats: cats});
  
  cats.add(new AngryCat({
    name: 'Darwin',
    image_path: 'http://placehold.it/75x75&text=Darwin',
    rank: cats.size() + 1
  }));
});