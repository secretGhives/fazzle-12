(function($){

FazzleX.Modules.register({
	id: 'buzz',
	template: "app/templates/buzz/main.html"
});

})(jQuery);

/*(function(Buzz) {

	Buzz.Model = Backbone.Model.extend({ });
	Buzz.Collection = Backbone.Collection.extend({  });
	Buzz.Router = Backbone.Router.extend({  });

	// This will fetch the tutorial template and render it.
	Buzz.Views.Home = Backbone.View.extend({
		template: "app/templates/buzz/main.html",
		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				console.log("Buzz");
				
			});
		}
	});

})(fazzle.module("buzz"));*/