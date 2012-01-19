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

			// $('#va-accordion').vaccordion({
			// 	expandedHeight	: 220,
			// 	animSpeed		: 300,
			// 	animOpacity		: 0.6,
			// 	visibleSlices	: 3
			// });

			$('#profile-edit').toggle(function() {
					$(this).removeClass('active');
					$('.profile-ei').removeClass('editing').attr('contenteditable', 'false');
				}, function() {
					$(this).addClass('active');
					$('.profile-ei').addClass('editing').attr('contenteditable', 'true');
			});

			$('#profile-comments-toggle').toggle(function() {
				$(this).addClass('active');
					$(this).parent().find('.comment-body-wrap, .more').show();
				}, function() {
					$(this).removeClass('active');
					$(this).parent().find('.comment-body-wrap, .more').hide();
			});

			$(".runway-reply-show").toggle(
				function(){
					$(this).parent().parent()
					.next(".runway-reply-wrap")
					.removeClass("hide");
				}, 
				function(){
					$(this).parent().parent()
					.next(".runway-reply-wrap")
					.addClass("hide");
				}
			);


			$(".image_stack").delegate('img', 'mouseenter', function () { //when user hover mouse on image with div id=stackphotos 
				if ($(this).hasClass('stackphotos')) { //
					// the class stackphotos is not really defined in css , it is only assigned to each images in the photo stack to trigger the mouseover effect on  these photos only 
					var $parent = $(this).parent();
					$parent.find('img#photo1').addClass('rotate1'); //add class rotate1,rotate2,rotate3 to each image so that it rotates to the correct degree in the correct direction ( 15 degrees one to the left , one to the right ! )
					$parent.find('img#photo2').addClass('rotate2');
					$parent.find('img#photo3').addClass('rotate3');
					$parent.find('img#photo1').css("left", "3px"); // reposition the first and last image 
					$parent.find('img#photo3').css("left", "6px");
				}
			}).delegate('img', 'mouseleave', function () { // when user removes cursor from the image stack
				$('img#photo1').removeClass('rotate1'); // remove the css class that was previously added to make it to its original position
				$('img#photo2').removeClass('rotate2');
				$('img#photo3').removeClass('rotate3');
				$('img#photo1').css("left", ""); // remove the css property 'left' value from the dom
				$('img#photo3').css("left", "");
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