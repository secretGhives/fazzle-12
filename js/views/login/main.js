// Filename: views/login/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/login/main.html'
], function($, _, Backbone, loginTemplate){
	var loginView = Backbone.View.extend({
		el: $("body"),
		initialize: function(){
		},
		render: function(){
			var data = {};
			var compiledTemplate = _.template( loginTemplate, data );

			// Render template
			this.el.html( compiledTemplate );

			myAppName.console.log('views/login/main.js says Hi');

			$('#va-accordion').vaccordion({
				accordionW		: $(window).width(),
				accordionH		: $(window).height(),
				visibleSlices	: 3,
				expandedHeight	: 555,
				animOpacity		: 0.1,
				contentAnimSpeed: 100
			});
	
		}
	});
	return new loginView;
});