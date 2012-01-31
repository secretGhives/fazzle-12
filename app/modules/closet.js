(function(Closet) {

	Closet.Model = Backbone.Model.extend({ /* ... */ });
	Closet.Collection = Backbone.Collection.extend({ /* ... */ });
	//Closet.Router = Backbone.Router.extend({ /* ... */ });

	var Helper = fazzle.module("helper");

	Closet.Router = Helper.SubRoute.extend({
		routes: {
			"": "view",
			"closet/": "view"
		},
		view: function(hash) {
			var route = this;
			var closet = new Closet.Views.Home();

			// Attach the runway to the DOM
			closet.render(function(el) {
				$("#main").html(el);

				// Fix for hashes in pushState and hash fragment
				if (hash && !route._alreadyTriggered) {
					// Reset to home, pushState support automatically converts hashes
					Backbone.history.navigate("", false);

					// Trigger the default browser behavior
					location.hash = hash;

					// Set an internal flag to stop recursive looping
					route._alreadyTriggered = true;
				}
			});
		}
	});

	// This will fetch the Main template and render it.
	Closet.Views.Home = Backbone.View.extend({
		template: "app/templates/closet/main.html",

		render: function(done) {
			var view = this;

			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();

				done(view.el);

			});
			
		}
	});

	// This will fetch the Image viewing template and render it.
	Closet.Views.Viewing = Backbone.View.extend({
		template: "app/templates/closet/view.html",

		render: function(done) {
			var view = this;

			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();

				done(view.el);
			});
		}
	});

	// This will fetch the Image viewing template and render it.
	Closet.Views.Editing = Backbone.View.extend({
		template: "app/templates/closet/edit.html",

		render: function(done) {
			var view = this;

			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();

				done(view.el);
			});
		}
	});

})(fazzle.module("closet"));