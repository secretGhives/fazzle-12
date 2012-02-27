(function(RegisterInterest) {

	RegisterInterest.Model = Backbone.Model.extend({ /* ... */ });
	RegisterInterest.Collection = Backbone.Collection.extend({ /* ... */ });
	RegisterInterest.Router = Backbone.Router.extend({ /* ... */ });


	// This will fetch the tutorial template and render it.
	RegisterInterest.Views.Home = Backbone.View.extend({
		template: "app/templates/login/register-interest.html",
		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				/**
				 * Do stuff here
				 */
				console.log("RegisterInterest");
				
			});
		}
	});

})(fazzle.module("registerInterest"));