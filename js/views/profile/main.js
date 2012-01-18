// Filename: views/profile/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/profile/main.html'
], function($, _, Backbone, profileTemplate){
	
	var profileView = Backbone.View.extend({
		el: $("#page"),
		initialize: function(){
		},
		render: function(){
			var data = {};
			var compiledTemplate = _.template( profileTemplate, data );

			myAppName.console.log('views/profile/main.js says Hi');

			// Render template
			this.el.html( compiledTemplate );

			$("[rel=pop]").popover( {offset: 10} ).click(function(e) { e.preventDefault() });
			$("[rel=tip]").twipsy({live: true});
			if ($("[rel=roundabout]").length > 0){
				$("[rel=roundabout]").roundabout();
			};

			$(".chzn-select").chosen();

			$('#va-accordion').vaccordion({
				expandedHeight	: 220,
				animSpeed		: 300,
				animOpacity		: 0.6,
				visibleSlices	: 3
			});

			$('#profile-edit').toggle(function() {
					$(this).removeClass('active');
					$('.profile-ei').removeClass('editing').attr('contenteditable', 'false');
				}, function() {
					$(this).addClass('active');
					$('.profile-ei').addClass('editing').attr('contenteditable', 'true');
			});


			// if(!(jQuery.Storage.get("tour") == "true")){
			// 	var config = {
			// 			mainTitle: "First time here?",
			// 			saveCookie: true, 
			// 		steps: [
			// 		{
			// 			"name" 		: "tour_1",
			// 			"type"		: "warning",
			// 			"position"	: "TL",
			// 			"text"		: "Your set profile name in big Giant letters.",
			// 			"time" 		: 5000
			// 		},
			// 		{
			// 			"name" 		: "tour_2",
			// 			"type"		: "info",
			// 			"text"		: "That's you!  Click on the photo to change ",
			// 			"position"	: "TL",
			// 			"time" 		: 5000
			// 		},
			// 		{
			// 			"name" 		: "tour_3",
			// 			"type"		: "success",
			// 			"text"		: "Your awesome friends list. Add more.",
			// 			"position"	: "BL",
			// 			"time" 		: 5000
			// 		},
			// 		{
			// 			"name" 		: "tour_4",
			// 			"text"		: "Groups that you're part of.  Join more.",
			// 			"position"	: "BL",
			// 			"time" 		: 5000
			// 		},
			// 		{
			// 			"name" 		: "tour_5",
			// 			"type"		: "danger",
			// 			"text"		: "Local runway, only displays stuff from your closet or if you're viewing another users profile, then their stuff that they allow to share.",
			// 			"position"	: "BL",
			// 			"time" 		: 5000
			// 		},
			// 		{
			// 			"name" 		: "tour_6",
			// 			"type"		: "error",
			// 			"text"		: "Another awesome like button.",
			// 			"position"	: "TL",
			// 			"time" 		: 5000
			// 		},
			// 		{
			// 			"name" 		: "tour_7",
			// 			"type"		: "warning",
			// 			"text"		: "Switch between about and shelves view",
			// 			"position"	: "TL",
			// 			"time" 		: 5000
			// 		}]
			// 	};

			// 	$.tour.start(config);

			// }



		}
	});
	return new profileView;
});