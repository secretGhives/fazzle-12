// Filename: views/home/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home/main.html',
	//'partials/bootstrap-alerts',
	//'partials/bootstrap-dropdown',
	//'partials/bootstrap-modal',
	//'partials/bootstrap-tabs',
	//'partials/bootstrap-buttons',
	//'order!partials/bootstrap-twipsy',
	//'order!partials/bootstrap-popover',
	'libs/jquery/easing',
	'libs/jquery/mousewheel',
	'classes/sample',
	'order!jqueryui',
	'order!partials/bootstrap-carausel',
	'order!classes/carauselwrapper'
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

			$("[rel=pop]").popover( {offset: 10} ).click(function(e) { e.preventDefault() });
			$("[rel=tip]").twipsy({live: true});

			//Loading Demo button
			var btn = $('#btn-create-new-look').click(function () {
				btn.button('loading')
				setTimeout(function () {
					btn.button('reset')
				}, 3000)
			});

			$.ajax({
				url: 'https://picasaweb.google.com/data/feed/api/all?q=fashion'
				, dataType: 'jsonp'
				, data: {
					alt: 'json'
					, 'max-results': 20
				}
				, success: function (data) {
					console.log(data.feed.entry[0]);

					$('#runwayWrap')
					.coulisse({
						index: 0
						, cyclic:   true
						, images: data.feed.entry
						, imageSrcGetter: ['content', 'src']
						, linkHrefGetter: ['link', 1, 'href']
						, activeSize: 350
						, inactiveSize: 200
						, indexChanging: function (e, arg) {
							var entry = data.feed.entry[arg.index];
							if(!entry)alert(arg.index);
								console.log(entry);
						}
					});
				}
			});
			
		}
	});
	return new mainHomeView;
});