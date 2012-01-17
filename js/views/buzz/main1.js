// Filename: views/buzz/main1
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/buzz/main1.html'
], function($, _, Backbone, buzzTemplate){
	var buzzView = Backbone.View.extend({
		el: $("#page"),
		initialize: function(){
		},
		render: function(){
			var data = {};
			var compiledTemplate = _.template( buzzTemplate, data );

			myAppName.console.log('views/buzz/main1.js says Hi');

			// Render template
			this.el.html( compiledTemplate );

			$("[rel=tip]").twipsy({live: true});
	
		}
	});
	return new buzzView;
});