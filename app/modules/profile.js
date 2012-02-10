(function(Profile) {

	Profile.Model = Backbone.Model.extend({ /* ... */ });
	Profile.Collection = Backbone.Collection.extend({ /* ... */ });
	Profile.Router = Backbone.Router.extend({ /* ... */ });


	// This will fetch the tutorial template and render it.
	Profile.Views.Home = Backbone.View.extend({
		template: "app/templates/profile/main.html",
		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				/**
				 * Do stuff here
				 */
				console.log("Profile");
				
			});
		}
	});

})(fazzle.module("profile"));