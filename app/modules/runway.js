(function($){

FazzleX.Modules.register({
	id: 'runway',
	template: "app/templates/runway/main.html"
});

})(jQuery);

/*
(function(Runway) {

  Runway.Model = Backbone.Model.extend({ });
  Runway.Collection = Backbone.Collection.extend({ });
  Runway.Router = Backbone.Router.extend({ });

  // This will fetch the tutorial template and render it.
  Runway.Views.Home = Backbone.View.extend({
    template: "app/templates/runway/main.html",
    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      fazzle.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();
        done(view.el);
        console.log("Home/Runway");
        
      });
    }
  });

})(fazzle.module("runway"));
*/