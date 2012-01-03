var visible = false;
document.onkeydown = console_slide;
var Tilde = 192, Esc = 27;
function console_slide(evt){
  if (!evt) {
    evt = window.event;
  }
  if (evt.keyCode === Esc || evt.keyCode === Tilde) {// Esc
    if(visible==false){
        visible = true;
        $('#console').animate({
            top: 0
        });
    }
    else if(visible==true){
        visible = false;
        $('#console').animate({
            top: -350
        });
    }
    return false;
  }
}

////////////////////////////////////////////////////////////////////////////////
// CLASS
////////////////////////////////////////////////////////////////////////////////
var myAppName = {
		settings: {
				isOnline: true
		},

		console: {
			log: function(message) {
				var element = document.getElementById('console_output');
				element.innerHTML = element.innerHTML + message + '<br />';
			}
		}
}
//accessed as
console.log(myAppName.settings.isOnline); // true
myAppName.console.log('myApp says Hello');




////////////////////////////////////////////////////////////////////////////////
// USING NAMESPACE.JS
////////////////////////////////////////////////////////////////////////////////

// creates an empty namespace
Namespace('com.myProject');

// creates or use a namespace and fill it with the specified properties
Namespace('com.myProject', {

	Settings: {
		isOnline: true
	},

	Console: {
		log: function(message) {
			var element = document.getElementById('console_output');
			element.innerHTML = element.innerHTML + message + '<br />';
		}
	},

	Alert: function(message) {
		alert(message);
	}
	
});




////////////////////////////////////////////////////////////////////////////////
// USING BACKBONE.JS
////////////////////////////////////////////////////////////////////////////////

	SearchView = Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function(){
			//Pass variables in using Underscore.js Template
			var variables = { search_label: "My Search" };
			// Compile the template using underscore
			var template = _.template( $("#search_template").html(), variables );
			// Load the compiled HTML into the Backbone "el"
			this.el.html( template );
		},
		events: {
			"click button": "doSearch"  
		},
		doSearch: function( event ){
			// Button clicked, you can access the element that was clicked with event.currentTarget
			myAppName.console.log( "Searched for " + $("#search_input").val() );
		}
	});

	var search_view = new SearchView({ el: $("#search_container") });



////////////////////////////////////////////////////////////////////////////////
// ON DOM READY
////////////////////////////////////////////////////////////////////////////////

(function ($) {

	//Console log a property of settings
	console.log(com.myProject.Settings.isOnline);

	// calls Console using the fully qualified name (fqn)
	com.myProject.Console.log(', hello world');
	//com.myProject.Alert("Hello");

	// imports all properties from com.sandbox into the global space
	Namespace.use('com.myProject.*');
	Console.log('unpacked hello world');
	Console.log('online check: ' + Settings.isOnline);

	// imports all properties from com.myProject.classes after including the file js/classes.js
	// the use() identifier can also be relative to the identifier used in from() by starting 
	// with a dot (would be .* in this case)
	Namespace.from('js.classes.sample').use('com.myProject.classes.*', function() {
		new MyClass1();
		//new MyClass2();
		//new MyClass3('hello, i was looped through a class and back here');
	});

	// auto includes com/sandbox/MyNameIsClass.js file and imports MyNameIsClass into the global space
	// unpack() will use include(). will be async as we use a callback
	Namespace.use('js.classes.sample', function() {
		new MyClass2('OMG');
	});

	// register a listener for the includeError event
	Namespace.addEventListener('includeError', function(event) {
		Console.log('an error occured loading ' + event.identifier);
	});
	
})(jQuery);