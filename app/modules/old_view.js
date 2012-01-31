// Filename: views/closet/view
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/closet/view.html'
], function($, _, Backbone, viewItemsTemplate){

	var viewItemsView = Backbone.View.extend({
		el: $("#page"),
		render: function(){
			var data = {};
			var compiledTemplate = _.template( viewItemsTemplate, data );

			myAppName.console.log('views/closet/view.js says Hi');

			// Render template
			this.el.html( compiledTemplate );

			//Toggle Comments sidebar
			$('#fullscreen-sb-toggle').toggle(function() {
					$('#fullscreen-sidebar').show();
					$('.main-image-view').css({
						right: '420px'
					});
				}, function() {
					$('#fullscreen-sidebar').hide();
					$('.main-image-view').css({
						right: '0'
					});
			});

			//Toggle thumbs bar
			$('#fullscreen-poster').toggle(function() {
					$('#fullscreen-thumbs').hide();
				}, function() {
					$('#fullscreen-thumbs').show();
			});

			
		} // Render function ends here
	});
	return new viewItemsView;
});