// Filename: views/home/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/home/main.html',
	//libs
	'jqueryui',
	'libs/jquery/easing',
	'libs/jquery/mousewheel',
	//autostart
	'bootstrap/bootstrap-tabs',
	'bootstrap/bootstrap-alerts',
	'bootstrap/bootstrap-modal',
	'bootstrap/bootstrap-buttons',
	'bootstrap/bootstrap-dropdown',
	//requires init
	'order!bootstrap/bootstrap-twipsy',
	'order!bootstrap/bootstrap-popover',
	'classes/roundabout',
	'classes/accordian',
	'classes/vacordian',
	'classes/sample',
	'order!classes/coulisse',
	'order!classes/coulisseuiwrapper'
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
						, activeSize: 369
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