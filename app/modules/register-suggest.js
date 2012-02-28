(function(RegisterSuggest) {

	RegisterSuggest.Model = Backbone.Model.extend({ /* ... */ });
	RegisterSuggest.Collection = Backbone.Collection.extend({ /* ... */ });
	RegisterSuggest.Router = Backbone.Router.extend({ /* ... */ });


	// This will fetch the tutorial template and render it.
	RegisterSuggest.Views.Home = Backbone.View.extend({
		template: "app/templates/login/register-suggest.html",
		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				/**
				 * Do stuff here
				 */
				console.log("RegisterSuggest");
				
			});
		}
	});

})(fazzle.module("registerSuggest"));