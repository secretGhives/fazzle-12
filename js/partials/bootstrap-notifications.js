/*
	Version 1.0.1
	jQuery cNotify is designed and developed by W.M. Chandana Bandara ( chandana at coolbitsoftware dot com ) from Coolbit Software Solutions (www.coolbitsoftware.com)
	You are free to download it, use it and modify it to suit to your needs.
*/

var cbNotifications = 0;
function cNotify(m,t,d){
	var colorScheme = '';
	switch (t){
		case 'error':
		case 'failed':
			colorScheme =  'message error';
		break;
		case 'success':
			colorScheme = 'message success';
		break;
		case 'warning':
			colorScheme = 'message warning';
		break;
		case 'shape':
		default:
			colorScheme = 'message';
		break;
	}
	var duration = (d==undefined) ? 3000 : d;
	
	if ($('#cbNotice-'+cbNotifications).length){
		$('#cbNotice-'+cbNotifications).remove();
	}
	
	cbNotifications++;
	$('body').append('<div id="cbNotice-'+cbNotifications+'" class="app-notification" style="z-index:10000; position:fixed; top:0px; left:0px; width:100%; text-align:center; display:none;" onclick="$(this).slideUp(\'fast\');"></div>');
	
	$('#cbNotice-'+cbNotifications).html('<span class="'+colorScheme+'">'+m+'</span>');
		$('#cbNotice-'+cbNotifications).slideDown('fast',function(){
			var text = "$('#cbNotice-"+cbNotifications+"').slideUp('fast');";
			if (duration>0){
				setTimeout (text,duration);
			}
		});
}


//Consume all alerts to custom notification system
// ie: alert("message", "error");
// ie: alert("message", "success");
// ie: alert("message");
window.alert = function(message, type) {
  cNotify(message, type);
};