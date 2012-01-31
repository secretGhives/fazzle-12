define([
  "namespace",

  // Libs
  "use!backbone",

  // Plugins
  "use!libs/backbone/backbone-layoutmanager"
],

function(bocoup, Backbone) {

  // Shorthand the app
  var app = bocoup.app;

  // Create a new module
  var Settings = bocoup.module();

  Settings.Collection = Backbone.Collection.extend({

    initialize: function(models, options) {
      // if (options) {
      //   this.user = options.user;
      //   this.repo = options.repo;
      // }
    }
  });

  Settings.Views.Item = Backbone.LayoutManager.View.extend({
    template: "settings/main",

    tagName: "li",

    serialize: function() {
      return this.model.toJSON();
    }
  });

  Settings.Views.List = Backbone.View.extend({
    template: "settings/main",

    render: function(layout) {
      var view = layout(this);

      this.collection.each(function(settings) {
        view.insert("ul", new Settings.Views.Item({
          model: settings
        }));
      });

      return view.render();
    },

    initialize: function() {
      this.collection.bind("reset", function() {
        this.render();
      }, this);
    }
  });

  // Required, return the module for AMD compliance
  return Settings;

});
