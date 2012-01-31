(function(Helper) {

  Helper.SubRoute = Backbone.Router.extend({
    constructor: function(prefix) {
      var routes = {};

      // Prefix is optional, set to empty string if not passed
      prefix = prefix || "";

      // Allow for optionally omitting trailing /.  Since base routes do not
      // trigger with a trailing / this is actually kind of important =)
      if (prefix[prefix.length-1] == "/") {
        prefix = prefix.slice(0, prefix.length-1);

      // If a prefix exists, add a trailing /
      } else if (prefix) {
        prefix += "/";
      }

      // Every route needs to be prefixed
      _.each(this.routes, function(callback, path) {
        if (path) {
          return routes[prefix + path] = callback;
        }

        // If the path is "" just set to prefix, this is to comply
        // with how Backbone expects base paths to look gallery vs gallery/
        routes[prefix] = callback;
      });

      // Must override with prefixed routes
      this.routes = routes;

      // Required to have Backbone set up routes
      Backbone.Router.prototype.constructor.call(this);
    }
  });

})(fazzle.module("helper"));