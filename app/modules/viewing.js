(function(Viewing) {

	Viewing.Model = Backbone.Model.extend({ /* ... */ });
	Viewing.Collection = Backbone.Collection.extend({ /* ... */ });
	//Viewing.Router = Backbone.Router.extend({ /* ... */ });

	var Helper = fazzle.module("helper");

	Viewing.Router = Helper.SubRoute.extend({
		routes: {
			"": "view"
		},
		view: function(hash) {
			var route = this;
			var viewing = new Viewing.Views.Home();

			// Attach the runway to the DOM
			viewing.render(function(el) {
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

	// This will fetch the tutorial template and render it.
	Viewing.Views.Home = Backbone.View.extend({
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

})(fazzle.module("viewing"));