(function(Tweet) {
  
  var app = twitter.app;

  Tweet.Collection = Backbone.Collection.extend({
    url: function() {
      return "http://search.twitter.com/search.json?q=@tbranyen&callback=?";
    },

    parse: function(data) {
      return data.results;
    }
  });

  Tweet.Views.List = Backbone.View.extend({
    template: "list",

    events: {
      "click li": "update"
    },

    update: function(ev) {
      var index = $(ev.target).index();
      var model = this.collection.at(index);

      this.trigger("update", model);
    },

    render: function(layout) {
      return layout(this).render({ tweets: this.collection.toJSON() });
    }
  });

  Tweet.Views.Detail = Backbone.LayoutManager.View.extend({
    template: "detail",

    events: {
      "click h1": "show"
    },

    show: function() {
      app.router.navigate("show/" + this.model.id, true);
    },

    serialize: function() {
      return { tweet: this.model.toJSON() };
    }
  });

})(twitter.module("tweet"));
