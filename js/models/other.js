define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var otherModel = Backbone.Model.extend({
    defaults: {
      score: 10
    },
    initialize: function(){
    }

  });
  return otherModel;

});