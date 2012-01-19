// Filename: views/closet/main
define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/closet/main.html'
], function($, _, Backbone, closetTemplate){

	var closetView = Backbone.View.extend({
		el: $("#page"),
		render: function(){
			var data = {};
			var compiledTemplate = _.template( closetTemplate, data );

			myAppName.console.log('views/closet/main.js says Hi');

			// Render template
			this.el.html( compiledTemplate );


			$('.st-content img').draggable({ revert: true });
			$( ".droppable" ).droppable({
				tolerance: 'touch',
				over: function() {
					$(this).removeClass('out').addClass('over');
				},
				out: function() {
					$(this).removeClass('over').addClass('out');
				},
				drop: function( event, ui ) {
					var answer = alert('Added xxxx to the Look', 'success');
					$( this ).addClass( "received" );
					$( "<img>" ).attr( "src", ui.draggable.attr("src") ).appendTo( this );
					//ui.draggable.remove();
				}
			});

			$("#closet-view .droppable").delegate("img", "click", function() {
				$(this).remove();
				alert('Item removed from Creating a look', 'success');
			});

			$('#side-box').stickyScroll({ container: '.sidebar' });

			$('#btn-create-new-look').toggle(function() {
					$(this).addClass('active');
					$('#closet-create-look').show();
				}, function() {
					$(this).removeClass('active');
					$('#closet-create-look').hide();
			});

			$(".chzn-select").chosen().change(function(){
				var filter = $(this).val();
				var list = $('#closet-shelf-list');
				//alert( filter );
				$(list).find("li:not(" + filter + ")").addClass("hide");
				$(list).find("li" + filter).removeClass("hide");
				alert('selected: ' + filter, 'success');
				if (filter === null) {
					$(list).find("li").removeClass("hide");
				}
			});

			$("[rel=pop]").popover( {offset: 10} ).click(function(e) { e.preventDefault() });
			$("[rel=tip]").twipsy({live: true});

			$('#st-accordion').accordion();
			
		}
	});
	return new closetView;
});