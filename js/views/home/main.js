// Filename: views/home/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home/main.html',
	'classes/sample',
	'partials/bootstrap-roundabout'
], function($, _, Backbone, mainHomeTemplate){

	var mainHomeView = Backbone.View.extend({
		el: $("#page"),
		render: function(){

			//render template
			this.el.html(mainHomeTemplate);

			myAppName.console.log('views/home/main.js says Hi');
			//myAppName.console.log(myAppName.settings.isOnline);

			// Run a site tour
			// $(this).joyride({
			// 	'scrollSpeed': 300,
			// 	'nextButton': true,
			// 	'tipAnimation': 'fade',
			// 	'tipAnimationFadeSpeed': 500,
			// 	'cookieMonster': false,
			// 	'inline': false,
			// 	'tipContent': '#tourContent'
			// });

			// checkbox add on logic
			$('.add-on :checkbox').click(function () {
				if ($(this).attr('checked')) {
					$(this).parents('.add-on').addClass('active')
				} else {
					$(this).parents('.add-on').removeClass('active')
				}
			});

			$("a[rel=pop]").popover( {offset: 10} ).click(function(e) { e.preventDefault() });
			$("a[rel=tip]").twipsy({live: true});
			if ($("[rel=roundabout]").length > 0){
				$("[rel=roundabout]").roundabout();
			};

			//Loading Demo button
			var btn = $('#fat-btn').click(function () {
				btn.button('loading')
				setTimeout(function () {
					btn.button('reset')
				}, 3000)
			});
			
		}
	});
	return new mainHomeView;
});