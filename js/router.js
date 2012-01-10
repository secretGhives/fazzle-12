// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/main',
  'views/bootstrap/main',
  'views/javascript/main',
  'views/other/list',
  'views/impress/main'
], function($, _, Backbone, mainHomeView, bootstrapView, bootstrapJavascriptView, otherView, impressView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'impress': 'showImpress',
      'other': 'showOther',
      'bootstrap': 'showBootstrap',
      'javascript': 'showBootstrapJavascript',

      // Default
      '*actions': 'defaultAction'
    },
    showBootstrap: function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      bootstrapView.render();
    },
      // As above, call render on our loaded module
      // 'views/users/list'
    showBootstrapJavascript: function(){
      bootstrapJavascriptView.render();
    },
    showOther: function(){
      otherView.render();
    },
    showImpress: function(){
      impressView.render();
    },

    defaultAction: function(actions){
      // We have no matching route, lets display the home page
      mainHomeView.render();
    }
  });

  var initialize = function(){
    var app_router = new AppRouter;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});