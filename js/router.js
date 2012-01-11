// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/main',
  'views/profile/main',
  'views/buzz/main',
  'views/closet/main',
  'views/settings/main'
], function($, _, Backbone, mainHomeView, profileView, buzzView, closetView, settingsView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'profile': 'showProfile',
      'buzz': 'showBuzz',
      'closet': 'showCloset',
      'settings': 'showSettings',

      // Default
      '*actions': 'defaultAction'
    },
    showProfile: function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/profile/main'
      profileView.render();
    },
      // As above, call render on our loaded module
      // 'views/buzz/main'
    showBuzz: function(){
      buzzView.render();
    },
    showCloset: function(){
      closetView.render();
    },
    showSettings: function(){
      settingsView.render();
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