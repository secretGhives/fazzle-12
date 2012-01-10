// Filename: views/javascript/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/javascript/main.html',
	'order!partials/bootstrap-alerts',
	'order!partials/bootstrap-buttons',
	'order!partials/bootstrap-dropdown',
	'order!partials/bootstrap-modal',
	'order!partials/bootstrap-tabs',
	'order!partials/bootstrap-scrollspy',
	'order!partials/bootstrap-roundabout',
	'order!partials/bootstrap-twipsy',
	'order!partials/bootstrap-popover'
], function($, _, Backbone, bootstrapJavascriptTemplate){
	var bootstrapJavascriptView = Backbone.View.extend({
		el: $("#page"),
		initialize: function(){
		},
		render: function(){
			var data = {};
			var compiledTemplate = _.template( bootstrapJavascriptTemplate, data );

			myAppName.console.log('views/javascript/main.js says Hi');

			// Render template
			this.el.html( compiledTemplate );
	
		}
	});
	return new bootstrapJavascriptView;
});