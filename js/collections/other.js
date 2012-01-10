define([
  'jquery',
  'underscore',
  'backbone',
  'models/other'
], function($, _, Backbone, otherModel){
  var otherCollection = Backbone.Collection.extend({
    model: otherModel,
    initialize: function(){

    }

  });

  return new otherCollection;
});