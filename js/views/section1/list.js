// Filename: views/section1/list
define([
  'jquery',
  'underscore',
  'backbone',
  // Pull in the Collection module from above
  'collections/section1',
  'text!templates/section1/list.html'

], function($, _, Backbone, sectionsCollection, section1ListTemplate){
  var section1ListView = Backbone.View.extend({
    el: $("#page"),
    initialize: function(){
      this.collection = sectionsCollection;
      this.collection.bind("add", this.exampleBind);
      this.collection = sectionsCollection.add({ name: "Twitter"});
      this.collection = sectionsCollection.add({ name: "Facebook"});
      this.collection = sectionsCollection.add({ name: "Myspace", score: 20});
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
      var compiledTemplate = _.template( section1ListTemplate, data );
      $("#page").html( compiledTemplate );
      myAppName.console.log('views/section1/list.js says Hi');
    }
  });
  return new section1ListView;
});