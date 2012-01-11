// Filename: views/closet/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/closet/main.html',
	'order!partials/bootstrap-alerts',
	'order!partials/bootstrap-buttons',
	'order!partials/bootstrap-dropdown',
	'order!partials/bootstrap-modal',
	'order!partials/bootstrap-tabs',
	'order!partials/bootstrap-roundabout',
	'order!partials/bootstrap-twipsy',
	'order!partials/bootstrap-popover',
	'classes/accordian',
	'classes/sample'
], function($, _, Backbone, closetTemplate){

	var closetView = Backbone.View.extend({
		el: $("#page"),
		render: function(){

			//render template
			this.el.html(closetTemplate);

			myAppName.console.log('views/closet/main.js says Hi');
			//myAppName.console.log(myAppName.settings.isOnline);

			$('#wardrobe').liteAccordion({
			  slideSpeed : 300,
		    enumerateSlides : true 
			});
			
		}
	});
	return new closetView;
});