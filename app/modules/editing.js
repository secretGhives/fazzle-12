(function(Editing) {

	Editing.Model = Backbone.Model.extend({ /* ... */ });
	Editing.Collection = Backbone.Collection.extend({ /* ... */ });
	Editing.Router = Backbone.Router.extend({ /* ... */ });


	// This will fetch the tutorial template and render it.
	Editing.Views.Home = Backbone.View.extend({
		template: "app/templates/closet/edit.html",
		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				/**
				 * Do stuff here
				 */
				console.log("Editing");
				
			});
		}
	});

})(fazzle.module("editing"));