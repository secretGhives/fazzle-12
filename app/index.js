(function() {

// Include the example module
var Runway = fazzle.module("runway")
	, Profile = fazzle.module("profile")
	, Buzz = fazzle.module("buzz")
	, Closet = fazzle.module("closet")
	, Settings = fazzle.module("settings")

// Include the secondary modules
	, Viewing = fazzle.module("viewing")
	, Editing = fazzle.module("editing")
	, Login = fazzle.module("login")
	, RegisterInterest = fazzle.module("registerInterest")
	, Help = fazzle.module("help");

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
		"login": "display_login",
		"register-interest": "display_register_interest",
		"help": "display_help"
		//":hash": "index"
	},

	index: function(hash) {
		var route = this
			, home = new Runway.Views.Home();;

		// Attach the tutorial to the DOM
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
	},

	display_register_interest: function() {
		var route = this
			, registerInterest = new RegisterInterest.Views.Home();

		registerInterest.render(function(el) {
			$("#main").html(el);
		});
	},

	display_help: function() {
		var route = this
			, help = new Help.Views.Home();

		help.render(function(el) {
			$("#main").html(el);
		});
	}  

});
	
// Treat the jQuery ready function as the entry point to the application.
// Inside this function, kick-off all initialization, everything up to this
// point should be definitions.
jQuery(function($) {
	// Shorthand the application namespace
	var app = fazzle.app;

	// Define your master router on the application namespace and trigger all
	// navigation from this instance.
	app.router = new Router();

	// Trigger the initial route and enable HTML5 History API support
	Backbone.history.start({ pushState: true });

	// All navigation that is relative should be passed through the navigate
	// method, to be processed by the router.  If the link has a data-bypass
	// attribute, bypass the delegation completely.
	$(document).on("click", "a:not([data-bypass])", function(evt) {
		// Get the anchor href and protcol
		var href = $(this).attr("href");
		var protocol = this.protocol + "//";

		// Ensure the protocol is not part of URL, meaning its relative.
		if (href && href.slice(0, protocol.length) !== protocol) {
			// Stop the default event to ensure the link will not cause a page
			// refresh.
			evt.preventDefault();

			// This uses the default router defined above, and not any routers
			// that may be placed in modules.  To have this work globally (at the
			// cost of losing all route events) you can change the following line
			// to: Backbone.history.navigate(href, true);
			app.router.navigate(href, true);
		}
	});
});

})();