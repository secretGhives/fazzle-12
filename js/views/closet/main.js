// Filename: views/closet/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/closet/main.html',
	'classes/sample'
], function($, _, Backbone, closetTemplate){

	var closetView = Backbone.View.extend({
		el: $("#page"),
		render: function(){

			//render template
			this.el.html(closetTemplate);

			myAppName.console.log('views/closet/main.js says Hi');
			//myAppName.console.log(myAppName.settings.isOnline);
			
		}
	});
	return new closetView;
});