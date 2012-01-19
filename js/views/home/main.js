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
	'libs/jquery/chosen-min',
	'libs/jquery/storage',
	//autostart
	'bootstrap/bootstrap-tabs',
	'bootstrap/bootstrap-alerts',
	'bootstrap/bootstrap-modal',
	'bootstrap/bootstrap-buttons',
	'bootstrap/bootstrap-dropdown',
	'bootstrap/bootstrap-notifications',
	//'bootstrap/bootstrap-maxinput',
	//requires init
	'order!bootstrap/bootstrap-twipsy',
	'order!bootstrap/bootstrap-popover',
	'classes/tour',
	'classes/roundabout',
	'classes/sticky',
	//'classes/lite-accordian',
	'classes/accordion',
	'classes/vacordian',
	'classes/sample',
	//'classes/contentflow',
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
			if(!(jQuery.Storage.get("tour_runway") == "true")){
				var config = {
						mainTitle: "First time here?",
						saveCookie: true, 
					steps: [
					{
						"name" 		: "tour_1",
						"type"		: "warning",
						"position"	: "B",
						"text"		: "Main attraction, Public RUNWAY",
						"time" 		: 5000
					},
					{
						"name" 		: "tour_2",
						"type"		: "info",
						"text"		: "This is where your vote counts (like/dislike)",
						"position"	: "R",
						"time" 		: 5000
					},
					{
						"name" 		: "tour_3",
						"type"		: "success",
						"text"		: "Shortcut menus to other areas of the app",
						"position"	: "BL",
						"time" 		: 5000
					},
					{
						"name" 		: "tour_4",
						"text"		: "Let the World know what you think",
						"position"	: "BL",
						"time" 		: 5000
					},
					{
						"name" 		: "tour_5",
						"type"		: "danger",
						"text"		: "Load more comments.",
						"position"	: "BL",
						"time" 		: 5000
					}]
				};

				//$.tour.start(config);

			}

			$("#tour-start").click(function(e) {
				e.preventDefault();
				$.tour.start(config);
			});

			// $(".max100").maxinput({
			// 	limit		: 100,
			// 	showtext 	: true,
			// 	message	: 'left'	
			// });

			$(".chzn-select").chosen();

			$("[rel=pop]").popover( {offset: 10} ).click(function(e) { e.preventDefault() });
			$("[rel=tip]").twipsy({live: true});

			//Loading Demo button
			// var btn = $('#btn-create-new-look').click(function () {
			// 	btn.button('loading')
			// 	setTimeout(function () {
			// 		btn.button('reset')
			// 	}, 3000)
			// });

			$("#btn-like").toggle(
				function(){
					$(this).text("Dislike");
					$(this).addClass("active");
				}, 
				function(){
					$(this).text("Like");
					$(this).removeClass("active");
				}
			);


			$(".runway-reply-show").toggle(
				function(){
					$(this).parent().parent().next(".runway-reply-wrap").removeClass("hide");
				}, 
				function(){
					$(this).parent().parent().next(".runway-reply-wrap").addClass("hide");
				}
			);

			

			$.ajax({
				url: 'https://picasaweb.google.com/data/feed/api/all?q=fashion'
				, dataType: 'jsonp'
				, data: {
					alt: 'json'
					, 'max-results': 13
				}
				, success: function (data) {
					//console.log(data.feed.entry[0]);

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
								//console.log(entry);
						}
					});
				}
			});

			
		}
	});
	return new mainHomeView;
});