
Namespace('com.myProject.classes', {

	MyClass1: function() {
		com.myProject.Console.log('MyClass1');
		return {};
	},
	
	MyClass2: function(message) {
		com.myProject.Console.log(message);
		return {};
	},

	MyClass3: function(message) {
		com.myProject.Alert(message);
		return {};
	}

});
