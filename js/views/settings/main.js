// Filename: views/settings/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/settings/main.html',
	'classes/sample'
], function($, _, Backbone, settingsTemplate){

	var settingsView = Backbone.View.extend({
		el: $("#page"),
		render: function(){

			//render template
			this.el.html(settingsTemplate);

			myAppName.console.log('views/settings/main.js says Hi');
			//myAppName.console.log(myAppName.settings.isOnline);

			// $("[rel=pop]").popover( {offset: 10} ).click(function(e) { e.preventDefault() });
			$("[rel=tip]").twipsy({live: true});
			
		}
	});
	return new settingsView;
});