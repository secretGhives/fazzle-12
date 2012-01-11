// Filename: views/login/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/login/main.html',
	'order!libs/jquery/easing',
	'order!libs/jquery/mousewheel',
	'order!partials/bootstrap-vacordian',
	'order!partials/bootstrap-tabs'
], function($, _, Backbone, loginTemplate){
	var loginView = Backbone.View.extend({
		el: $("body"),
		initialize: function(){
		},
		render: function(){
			var data = {};
			var compiledTemplate = _.template( loginTemplate, data );

			myAppName.console.log('views/login/main.js says Hi');

			// Render template
			this.el.html( compiledTemplate );


			$('#va-accordion').vaccordion({
				accordionW		: $(window).width(),
				accordionH		: $(window).height(),
				visibleSlices	: 4,
				expandedHeight	: 420,
				animOpacity		: 0.1,
				contentAnimSpeed: 100
			});
	
		}
	});
	return new loginView;
});