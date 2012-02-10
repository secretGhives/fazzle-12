this.fazzle = {
	module: function() {
		// Internal module cache.
		var modules = {};

		// Create a new module reference scaffold or load an existing module.
		return function(name) {
			// If this module has already been created, return it.
			if (modules[name]) {
				return modules[name];
			}

			// Create a module and save it under this name
			return modules[name] = { Views: {} };
		};
	}(),

	fetchTemplate: function(path, done) {
		window.JST = window.JST || {};

		// Should be an instant synchronous way of getting the template, if it
		// exists in the JST object.
		if (JST[path]) {
			return done(JST[path]);
		}

		// Fetch it asynchronously if not available from JST
		return $.get(path, function(contents) {
			var tmpl = _.template(contents);
			JST[path] = tmpl;

			done(tmpl);
		});
	},

	// Keep active application instances namespaced under an app object.
	app: _.extend({}, Backbone.Events)
};

// Treat the jQuery ready function as the entry point to the application.
// Inside this function, kick-off all initialization, everything up to this
// point should be definitions.
jQuery(function($) {

	// Shorthand the application namespace
	var app = fazzle.app

	// Include the primary modules
		, Runway = fazzle.module("runway")
		, Profile = fazzle.module("profile")
		, Buzz = fazzle.module("buzz")
		, Closet = fazzle.module("closet")
		, Settings = fazzle.module("settings")

	// Include the secondary modules
		, Viewing = fazzle.module("viewing")
		, Editing = fazzle.module("editing")
		, Login = fazzle.module("login");


	// Defining the application router, you can attach sub routers here.
	var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "runway": "display_runway",
      "profile": "display_profile",
      "buzz": "display_buzz",
      "closet": "display_closet",
      "settings": "display_settings",
      "viewing": "display_viewing",
      "editing": "display_editing",
      "login": "display_login"
      //":hash": "index"
    },

		index: function(hash) {
			var route = this
				, home = new Runway.Views.Home();

			// Attach the runway to the DOM
			home.render(function(el) {
				$("#main").html(el);

				// Fix for hashes in pushState and hash fragment
				if (hash && !route._alreadyTriggered) {
					// Reset to home, pushState support automatically converts hashes
					Backbone.history.navigate("", false);

					// Trigger the default browser behavior
					location.hash = hash;

					// Set an internal flag to stop recursive looping
					route._alreadyTriggered = true;
				}
			});
		},

    display_runway: function() {
      var route = this
        , runway = new Runway.Views.Home();

      runway.render(function(el) {
        $("#main").html(el);
      });
    },

    display_profile: function() {
      var route = this
        , profile = new Profile.Views.Home();

      profile.render(function(el) {
        $("#main").html(el);
      });
    },

    display_buzz: function() {
      var route = this
        , buzz = new Buzz.Views.Home();

      buzz.render(function(el) {
        $("#main").html(el);
      });
    },

    display_closet: function() {
      var route = this
        , closet = new Closet.Views.Home();

      closet.render(function(el) {
        $("#main").html(el);
      });
    },

    display_settings: function() {
      var route = this
        , settings = new Settings.Views.Home();

      settings.render(function(el) {
        $("#main").html(el);
      });
    },

    display_viewing: function() {
      var route = this
        , viewing = new Viewing.Views.Home();

      viewing.render(function(el) {
        $("#main").html(el);
      });
    },

    display_editing: function() {
      var route = this
        , editing = new Editing.Views.Home();

      editing.render(function(el) {
        $("#main").html(el);
      });
    },

    display_login: function() {
      var route = this
        , login = new Login.Views.Home();

      login.render(function(el) {
        $("#main").html(el);
      });
    }
	});
	
  app.router = new Router();
  Backbone.history.start({ pushState: true });

  $(document).on("click", "a:not([data-bypass])", function(e) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href.slice(protocol.length) !== protocol) {
      e.preventDefault();
      app.router.navigate(href, true);
    }
  });
});