// Filename: views/impress/main
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/impress/main.html',
  'classes/sample'
], function($, _, Backbone, impressTemplate){

  var impressView = Backbone.View.extend({
    el: $("body"),
    render: function(){

      //render template
      this.el.html(impressTemplate);

      myAppName.console.log('views/impress/main.js says Hi');
      //myAppName.console.log(myAppName.settings.isOnline);
      
    }
  });
  return new impressView;
});