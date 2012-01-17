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

			$('#btn-create-new-look').toggle(function() {
					$('#closet-create-look').show();
				}, function() {
					$('#closet-create-look').hide();
			});

			$(".chzn-select").chosen();

			$("[rel=pop]").popover( {offset: 10} ).click(function(e) { e.preventDefault() });
			$("[rel=tip]").twipsy({live: true});

			$('#st-accordion').accordion();
			
		}
	});
	return new closetView;
});