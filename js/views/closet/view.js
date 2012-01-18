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

			//Everything else,
			$('#fullscreen-sb-toggle').toggle(function() {
					$('#fullscreen-sidebar').show();
				}, function() {
					$('#fullscreen-sidebar').hide();
			});		
			
		} // Render function ends here
	});
	return new viewItemsView;
});