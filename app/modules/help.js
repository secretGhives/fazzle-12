(function(Help) {

	Help.Model = Backbone.Model.extend({ /* ... */ });
	Help.Collection = Backbone.Collection.extend({ /* ... */ });
	Help.Router = Backbone.Router.extend({ /* ... */ });


	// This will fetch the tutorial template and render it.
	Help.Views.Home = Backbone.View.extend({
		template: "app/templates/help/main.html",
		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				/**
				 * Do stuff here
				 */
				console.log("Help");
				
			});
		}
	});

})(fazzle.module("help"));