/**
 * Load global settings
 * 
 */
function loadSettings(){

	$.ajax({
		type: "GET",
        url: "config.xml?" + new Date().getTime(),
        dataType: "xml",
        success: function(xml) {
		
			// Parse config
			$(xml).find('settings').children().each(function(test){
				settings[$(this)[0].localName] = $(this).text();
			});

			// Call init (startup the dashboard)
			init();
				
		}
	});
	
}

/**
 * Init
 * Start the working of the dashboard once
 * the main config file is loaded
 */
function init(){
	 
	// Load CSS and JS files for the active modules
	loadModuleResources();
	
	// Load modules
	loadModules();
	
}



/**
 * Get list of resources to load and add them to the head
 */
function loadModuleResources(){
	
	$.post("lib/ModuleProxy.php",{ action: "loadResources" }, 
		function(response) {
			for(index in response.data.css) {
				$('head').append('<link rel="stylesheet" href="' + response.data.css[index] + '" type="text/css" />');
			}
			
			for(index in response.data.js) {
				$('head').append('<script type="text/javascript" src="' + response.data.js[index] + '"></script>');
			}
			
		}, "json"
	);
	
}

/**
 * Services pollers
 * This function will trigger every x seconds a service
 */
var index_ticker = 0;
function pollServices(){
	
	// If there are no active services
	if( active_services.length == 0 ) return;
	
	$.post("lib/ServiceProxy.php?" + new Date().getTime(),{ service: active_services[index_ticker]['name'], id: active_services[index_ticker]['id'], action: "loadService", index: index_ticker }, 
		function(response) {

			index_ticker++;
			if(index_ticker >= active_services.length) index_ticker = 0;
		
			if(response.display){
				
				var buffer = "";
				buffer += '<header><h2>' + response.title + '</h2></header>';
				if(response.icon != ''){
					buffer += '<div class="content round clearfix"><img src="' + response.icon + '" class="decoraction" /><span>' + decode64(response.content) + '</span></div>';
				}else{
					buffer += '<div class="content round clearfix"><span class="full">' + decode64(response.content) + '</span></div>';
				}
				$("#service").html(buffer);
					
				jQuery.block({
					contentElement: $("#service"),
					autoClose: true,
					autoCloseTime: response.timer
				});
				
				$.soundPlay({file: response.sound});
				
				// Start time again
				setTimeout("pollServices()", settings.service_poll_interval);
			}else{
				// If there is no data for the service than directly poll the next service
				// This is need because otherwise the wait times are to long
				setTimeout("pollServices()", 60000);
			}
			
			
			
		}, "json"
	);
	
}

/** 
 * Load modules
 */
function loadModules(){
	$.post("lib/ModuleProxy.php?" + new Date().getTime(),{ action: "modules" }, 
		function(response) {
			var loader_box = '';
			for(var index in response.data) {
				if(response.data[index]['name'].toLowerCase() != "spacer"){
					loader_box = '<section class="size' + response.data[index]['size'] + ' loading ' + response.data[index]['name'].toLowerCase() + '" id="module' + index + '"><div class="shine"></div><div class="highlight"></div><div class="module_wrap"></div></section>';
					$('#wrapper').append(loader_box);
					
					$.post("lib/ModuleProxy.php", {'action': 'loadModule', 'module': response.data[index]['name'], "id": index},function(data){
						var module_id = $('<div>' + data + '</div>').find('#module_id').val();
						$('#module' + module_id + ' .module_wrap').append(data);
						$('#module' + module_id).hide();
						$('#module' + module_id).fadeIn(1000);
						$('#module' + module_id).removeClass('loading');
						
						// if all modules are loaded
						if($('.loading').length == 0) modules_loaded();
						
					});
				}else{
					$('#wrapper').append('<hr />');
				}
			}
	
		}, "json"
	);
}

/**
 * Modules loaded function
 * This function is called when all modules are loaded
 */
function modules_loaded(){
	
	// Load services
	loadServices();
	
}
 
/**
 * Load services
 * get a list of services to use
 */
function loadServices(){
	$.post("lib/ServiceProxy.php",{ action: "services" }, 
			function(response) {
				active_services = response.data;

				// Start polling for messages
				pollServices();
		
			}, "json"
		);
}

/**
 * Function to reload a specific module
 * Can be used to refresh a module
 */
function reloadModule(id, interval){
	setTimeout ('reloadModuleId('+id+')' , interval);
}	
 
function reloadModuleId(id){
	var module_name = $('#module' + id + ' #module_name').val();
	$.post("lib/ModuleProxy.php", {'action': 'loadModule', 'module': module_name, 'id': id},function(data){
		$('#module' + id + ' .module_wrap').html(data);
	});
}



/**
 * Keystring that is used for base64 encode and decode
 */
var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * Decode a base64 encoded string
 * 
 * @param string input
 * @return string
 */
function decode64(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
       alert("There were invalid base64 characters in the input text.\n" +
             "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
             "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
       enc1 = keyStr.indexOf(input.charAt(i++));
       enc2 = keyStr.indexOf(input.charAt(i++));
       enc3 = keyStr.indexOf(input.charAt(i++));
       enc4 = keyStr.indexOf(input.charAt(i++));

       chr1 = (enc1 << 2) | (enc2 >> 4);
       chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
       chr3 = ((enc3 & 3) << 6) | enc4;

       output = output + String.fromCharCode(chr1);

       if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
       }
       if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
       }

       chr1 = chr2 = chr3 = "";
       enc1 = enc2 = enc3 = enc4 = "";

    } while (i < input.length);

    return unescape(output);
}

function flashModule(module_id, color){
	var highlight = $("#module" + module_id + " .highlight");
	highlight.css({ backgroundColor: color, opacity: 0 });
	flashElement(highlight, 3, 0, 800);
}

function flashElement(element, repeat, count, duration){
	element.animate( { opacity: 0.6 }, duration / 2, function(){
		element.animate( { opacity: 0 }, duration / 2, function(){
			count++;
			if(count < repeat) flashElement(element, repeat, count, duration);
		});		
	});
}

function showMessage(title, message){
	var buffer = "";
	buffer += '<header><h2>' + title + '</h2></header>';
	buffer += '<div class="content round clearfix"><span class="full">' + message + '</span></div>';
	$("#service").html(buffer);
				
	jQuery.block({
		contentElement: $("#service"),
		autoClose: true,
		autoCloseTime: 10000
	});
			
	$.soundPlay({file:"sounds/sonar.mp3"});
}