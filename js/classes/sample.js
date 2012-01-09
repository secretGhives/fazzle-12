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
//console.log(myAppName.settings.isOnline); // true
myAppName.console.log('isOnline: ' + myAppName.settings.isOnline); // true
myAppName.console.log('myApp says Hello');