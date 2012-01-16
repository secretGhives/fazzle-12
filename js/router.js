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
  'views/closet/view',
  'views/settings/main'
], function($, _, Backbone, loginView, mainHomeView, profileView, buzzView, closetView, itemsView, settingsView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'login': 'showLogin',
      'runway': 'showRunway',
      'profile': 'showProfile',
      'buzz': 'showBuzz',
      'closet': 'showCloset',
      'view': 'showItems',
      'settings': 'showSettings',

      // Default
      '*actions': 'defaultAction'
    },
    // Call render on the module we loaded in via the dependency array
    showRunway: function(){
      // 'views/home/main'
      mainHomeView.render();
    },
    showProfile: function(){
      // 'views/profile/main'
      profileView.render();
    },
      // 'views/buzz/main'
    showBuzz: function(){
      buzzView.render();
    },
    showCloset: function(){
      // 'views/closet/main'
      closetView.render();
    },
    showItems: function(){
      // 'views/closet/main'
      itemsView.render();
    },
    showSettings: function(){
      // 'views/settings/main'
      settingsView.render();
    },
    showLogin: function(){
      // 'views/login/main'
      loginView.render();
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