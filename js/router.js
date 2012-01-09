// Filename: router.js
define([
  'jquery',
  'underscore',
  'backbone',
  'views/home/main',
  'views/section1/list',
  'views/section2/list'
], function($, _, Backbone, mainHomeView, section1ListView, section2ListView ){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'section-1': 'showSection1',
      'section-2': 'showSection2',

      // Default
      '*actions': 'defaultAction'
    },
    showSection1: function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      section1ListView.render();
    },
      // As above, call render on our loaded module
      // 'views/users/list'
    showSection2: function(){
      section2ListView.render();
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