(function($){

FazzleX.Modules.register({
	id: 'closet',
	template: "app/templates/closet/main.html"
});

})(jQuery);

/*(function(Closet) {

	Closet.Model = Backbone.Model.extend({ });
	Closet.Collection = Backbone.Collection.extend({ });
	Closet.Router = Backbone.Router.extend({ });


	// This will fetch the Main template and render it.
	Closet.Views.Home = Backbone.View.extend({
		template: "app/templates/closet/main.html",
		render: function(done) {
			var view = this;
			// Fetch the template, render it to the View element and call done.
			fazzle.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl();
				done(view.el);

				console.log("Closet");
				
			});
		}
	});


})(fazzle.module("closet"));*/