// Filename: views/buzz/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/buzz/main.html'
], function($, _, Backbone, buzzTemplate){
	var buzzView = Backbone.View.extend({
		el: $("#page"),
		initialize: function(){
		},
		render: function(){
			var data = {};
			var compiledTemplate = _.template( buzzTemplate, data );

			myAppName.console.log('views/buzz/main.js says Hi');

			// Render template
			this.el.html( compiledTemplate );

			$("[rel=tip]").twipsy({live: true});
	
		}
	});
	return new buzzView;
});