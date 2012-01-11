// Filename: views/buzz/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/buzz/main.html',
	'order!partials/bootstrap-alerts',
	'order!partials/bootstrap-buttons',
	'order!partials/bootstrap-dropdown',
	'order!partials/bootstrap-modal',
	'order!partials/bootstrap-tabs',
	'order!partials/bootstrap-scrollspy',
	'order!partials/bootstrap-roundabout',
	'order!partials/bootstrap-twipsy',
	'order!partials/bootstrap-popover'
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
	
		}
	});
	return new buzzView;
});