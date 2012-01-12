// Filename: views/profile/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/profile/main.html'
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

		}
	});
	return new profileView;
});