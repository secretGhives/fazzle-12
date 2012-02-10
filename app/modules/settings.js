(function(Settings) {

	Settings.Model = Backbone.Model.extend({ /* ... */ });
	Settings.Collection = Backbone.Collection.extend({ /* ... */ });
	Settings.Router = Backbone.Router.extend({ /* ... */ });


	// This will fetch the tutorial template and render it.
	Settings.Views.Home = Backbone.View.extend({
		template: "app/templates/settings/main.html",
		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				/**
				 * Do stuff here
				 */
				console.log("Settings");
				
			});
		}
	});

})(fazzle.module("settings"));