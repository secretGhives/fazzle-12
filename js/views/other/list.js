// Filename: views/other/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/other',
  'text!templates/other/list.html',
  'classes/sample'

], function($, _, Backbone, otherCollection, otherListTemplate){
  var otherView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.collection = otherCollection;
      this.collection.bind("add", this.exampleBind);
      this.collection = otherCollection.add({ name: "Twitter"});
      this.collection = otherCollection.add({ name: "Facebook"});
      this.collection = otherCollection.add({ name: "Myspace", score: 20});
    },
    exampleBind: function( model ){
      //console.log(model);
      myAppName.console.log(model);
    },
    render: function(){
      var data = {
        sections: this.collection.models,
        _: _
      };
      var compiledTemplate = _.template( otherListTemplate, data );
      $("#page").html( compiledTemplate );
      myAppName.console.log('views/other/list.js says Hi');
    }
  });
  return new otherView;
});