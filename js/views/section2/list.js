// Filename: views/section2/list
define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/section2/list.html'
], function($, _, Backbone, section2ListTemplate){
  var section2ListView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
    },
    render: function(){
      var data = {};
      var compiledTemplate = _.template( section2ListTemplate, data );

      myAppName.console.log('views/section2/list.js says Hi');

      // Render template
      this.el.html( compiledTemplate );
    }
  });
  return new section2ListView;
});