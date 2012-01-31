// Filename: views/closet/edit
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/closet/edit.html'
], function($, _, Backbone, editItemsTemplate){

	var editItemsView = Backbone.View.extend({
		el: $("#page"),
		render: function(){
			var data = {};
			var compiledTemplate = _.template( editItemsTemplate, data );

			myAppName.console.log('views/closet/edit.js says Hi');

			// Render template
			this.el.html( compiledTemplate );

			//Everything else,
			$(".chzn-select").chosen();

			$("[rel=pop]").popover( {offset: 10} ).click(function(e) { e.preventDefault() });
			$("[rel=tip]").twipsy({live: true});

			
			
		} // Render function ends here
	});
	return new editItemsView;
});