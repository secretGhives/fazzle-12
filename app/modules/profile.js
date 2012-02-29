(function($){

FazzleX.Modules.register({
	id: 'profile',
	template: "app/templates/profile/main.html"
});

})(jQuery);


/*(function(Profile) {

	Profile.Model = Backbone.Model.extend({ });
	Profile.Collection = Backbone.Collection.extend({ });
	Profile.Router = Backbone.Router.extend({ });


	// This will fetch the tutorial template and render it.
	Profile.Views.Home = Backbone.View.extend({
		template: "app/templates/profile/main.html",

		events: {
			"click #profile-comments-toggle":    "toggleComments"
		},
		toggleComments: function(){
			comments = $("#profile-comments-toggle");
			if( comments.hasClass("active") ){
				comments.removeClass("active");
				comments.parent().find('.comment-body-wrap, .more').hide();
				alert("Comments hidden");
			} else{
				comments.addClass("active");
				comments.parent().find('.comment-body-wrap, .more').show();
				alert("Displaying comments");
			}
		},

		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				console.log("Profile");
				
			});
		}
	});

})(fazzle.module("profile")); */