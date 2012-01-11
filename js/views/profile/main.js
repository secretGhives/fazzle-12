// Filename: views/profile/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/profile/main.html',
	'order!partials/bootstrap-alerts',
	'order!partials/bootstrap-buttons',
	'order!partials/bootstrap-dropdown',
	'order!partials/bootstrap-modal',
	'order!partials/bootstrap-tabs',
	'order!partials/bootstrap-roundabout',
	'order!partials/bootstrap-twipsy',
	'order!partials/bootstrap-popover',
	'order!libs/jquery/easing',
	'order!libs/jquery/mousewheel',
	'order!partials/bootstrap-vacordian'
], function($, _, Backbone, profileTemplate){
	var profileView = Backbone.View.extend({
		el: $("#page"),
		initialize: function(){
		},
		render: function(){
			var data = {};
			var compiledTemplate = _.template( profileTemplate, data );

			myAppName.console.log('views/profile/main.js says Hi');

			// Render template
			this.el.html( compiledTemplate );


			$("[rel=pop]").popover( {offset: 10} ).click(function(e) { e.preventDefault() });
			$("[rel=tip]").twipsy({live: true});
			if ($("[rel=roundabout]").length > 0){
				$("[rel=roundabout]").roundabout();
			};

			$('#va-accordion').vaccordion({
				expandedHeight	: 220,
				animSpeed		: 300,
				animOpacity		: 0.6,
				visibleSlices	: 3
			});

			// add on logic
			// ============
			$('.add-on :checkbox').click(function () {
				if ($(this).attr('checked')) {
					$(this).parents('.add-on').addClass('active')
				} else {
					$(this).parents('.add-on').removeClass('active')
				}
			});

		}
	});
	return new profileView;
});