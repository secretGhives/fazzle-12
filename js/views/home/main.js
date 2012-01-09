// Filename: views/home/main
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/home/main.html',
  'classes/sample'
], function($, _, Backbone, mainHomeTemplate){

  var mainHomeView = Backbone.View.extend({
    el: $("#page"),
    render: function(){

      //render template
      this.el.html(mainHomeTemplate);

      myAppName.console.log('views/home/main.js says Hi');
      //myAppName.console.log(myAppName.settings.isOnline);
    }
  });
  return new mainHomeView;
});