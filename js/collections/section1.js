define([
  'jquery',
  'underscore',
  'backbone',
  'models/section1'
], function($, _, Backbone, projectsModel){
  var sectionsCollection = Backbone.Collection.extend({
    model: projectsModel,
    initialize: function(){

    }

  });

  return new sectionsCollection;
});