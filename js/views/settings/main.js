// Filename: views/settings/main
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/settings/main.html',
  'order!partials/bootstrap-alerts',
  'order!partials/bootstrap-buttons',
  'order!partials/bootstrap-dropdown',
  'order!partials/bootstrap-modal',
  'order!partials/bootstrap-tabs',
  'order!partials/bootstrap-twipsy',
  'order!partials/bootstrap-popover',
  'classes/sample'
], function($, _, Backbone, settingsTemplate){

  var settingsView = Backbone.View.extend({
    el: $("#page"),
    render: function(){

      //render template
      this.el.html(settingsTemplate);

      myAppName.console.log('views/settings/main.js says Hi');
      //myAppName.console.log(myAppName.settings.isOnline);

      $("[rel=tip]").twipsy({live: true});

      $('body').tabs('ul[data-tabs] li > a, ul[data-pills] > li > a');
      
    }
  });
  return new settingsView;
});