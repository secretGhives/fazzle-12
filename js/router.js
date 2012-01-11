// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/login/main',
  'views/home/main',
  'views/profile/main',
  'views/buzz/main',
  'views/closet/main',
  'views/settings/main'
], function($, _, Backbone, loginView, mainHomeView, profileView, buzzView, closetView, settingsView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'login': 'showLogin',
      'runway': 'showRunway',
      'profile': 'showProfile',
      'buzz': 'showBuzz',
      'closet': 'showCloset',
      'settings': 'showSettings',

      // Default
      '*actions': 'defaultAction'
    },
    showRunway: function(){
      mainHomeView.render();
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
    showLogin: function(){
      loginView.render();
    },

    defaultAction: function(actions){
      // We have no matching route, lets display the home page
      //loginView.render();
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