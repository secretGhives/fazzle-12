/**
 * Play sounds in the browser without the need for flash or java
 * 
 * @copyright Wim Mostmans (Sitebase)
 * @version 1.0
 */
(function(jQuery)
{
	jQuery.extend({			
		soundPlay: function(options)
		{	
			var defaults = {
				loop: 				false,				// Loop the sound until stop
				autostart:			true,				// Start playing the file when loaded
				volume:				100,				// Volume of the sound
				file: 				'', 				// Sound file you want to play
				multiple:			false				// If true you can play more than one sound at a time
			}
			
			// declare varaibles
			var settings, wrapper;

			// Merge user settings and default settings
			settings 		= jQuery.extend({}, defaults, options);

			// Create/Get sound wrapper div, in this elment are the players placed
			wrapAll	= (!jQuery('.sound-wrap').length) ? jQuery('<div></div>').addClass('sound-wrap').css("height", 1).appendTo('body') : jQuery('.sound-wrap');
			
			// Compose the embed player
			var player = '<EMBED SRC="' + settings.file + '" HEIGHT="0" WIDTH="0" HIDDEN="TRUE" AUTOSTART="' + settings.autostart + '" LOOP="' + settings.loop + '" volume="' + settings.volume + '"></EMBED>';
			
			// Append or replace based on multiple setting
			if(settings.multiple){
				wrapAll.append(player);
			}else{
				wrapAll.html(player);
			}

		},
		
		soundStop: function(obj)
		{
			jQuery('.sound-wrap').html("");
		}
	});
})(jQuery);