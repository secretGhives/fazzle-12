// Filename: views/closet/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/closet/main.html'
], function($, _, Backbone, closetTemplate){

	var closetView = Backbone.View.extend({
		el: $("#page"),
		render: function(){
			var data = {};
			var compiledTemplate = _.template( closetTemplate, data );

			myAppName.console.log('views/closet/main.js says Hi');

			// Render template
			this.el.html( compiledTemplate );

			$("[rel=tip]").twipsy({live: true});

			$('#wardrobe').liteAccordion({
			 slideSpeed : 300,
				enumerateSlides : true 
			});
			
		}
	});
	return new closetView;
});