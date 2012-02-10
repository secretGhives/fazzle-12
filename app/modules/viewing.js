(function(Viewing) {

	Viewing.Model = Backbone.Model.extend({ /* ... */ });
	Viewing.Collection = Backbone.Collection.extend({ /* ... */ });
	//Viewing.Router = Backbone.Router.extend({ /* ... */ });


	// This will fetch the tutorial template and render it.
	Viewing.Views.Home = Backbone.View.extend({
		template: "app/templates/closet/view.html",
		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				/**
				 * Do stuff here
				 */
				console.log("Viewing");
				
			});
		}
	});

})(fazzle.module("viewing"));