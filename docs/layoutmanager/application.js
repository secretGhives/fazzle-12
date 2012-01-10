this.twitter = {
  // Create this closure to contain the cached modules
  module: function() {
    // Internal module cache.
    var modules = {};
  
    // Create a new module reference scaffold or load an
    // existing module.
    return function(name) {
      // If this module has already been created, return it.
      if (modules[name]) {
        return modules[name];
      }

      // Create a module and save it under this name
      return modules[name] = { Views: {} };
    };
  }(),

  app: _.extend({}, Backbone.Events)
};

Backbone.LayoutManager.configure({
  paths: {
    layout: "/templates/layouts/",
    template: "/templates/"
  },

  fetch: function(path) {
    var done = this.async();

    $.get(path + ".html", function(contents) {
      done(contents);
    });
  },

  render: function(template, context) {
    return Handlebars.compile(template)(context);
  }
});

// Start application
jQuery(function($) {
  // Shorten the app namespace
  var app = twitter.app;

  // Get dependency
  var Tweet = twitter.module("tweet");

  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "show/:id": "show"
    },

    fetchTweets: function() {
      var _cache;

      return function(done) {
        if (_cache) {
          return done(_cache);
        }

        var tweets = new Tweet.Collection();

        // Fetch the tweets
        tweets.fetch().success(function() {
          _cache = tweets;
          done(_cache);
        });
      };
    }(),

    index: function() {
      // Create a new main layout
      var main = new Backbone.LayoutManager({
        name: "main"
      });

      // Fetch new tweets
      this.fetchTweets(function(tweets) {
        // Assemble the layout
        var list = main.views[".list"] = new Tweet.Views.List({ collection: tweets });
        var detail = main.views[".detail"] = new Tweet.Views.Detail({ model: tweets.at(0) });

        // When a new model is clicked re-render the right column
        list.bind("update", function(model) {
          detail.model = model;

          detail.render();
        });

        // Render into the page
        main.render(function(contents) {
          $(".container").html(contents);
        });
      });
    },

    show: function(id) {
      // Create a new detailed layout
      var detailed = new Backbone.LayoutManager({
        name: "detailed"
      });

      // Fetch new tweets
      this.fetchTweets(function(tweets) {
        // Assemble the layout
        var detail = detailed.views[".detailed"] = new Tweet.Views.Detail({ model: tweets.get(id) });

        // Render into the page
        detailed.render(function(contents) {
          $(".container").html(contents);
        });
      });
    }
  });

  // Start router and trigger first route
  app.router = new Router();
  Backbone.history.start();
});
