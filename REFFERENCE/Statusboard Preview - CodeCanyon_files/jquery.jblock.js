(function(jQuery)
{
	
	var jblock_settings;
	
	jQuery.extend({			
		block: function(options)
		{	
			var default_settings = {
				contentElement:		'',
				content: 			'',
				autoClose:			false,
				autoCloseTime:		3000,
				clickClose:			true,
				showAnimationSpeed: 500,
				hideAnimationSpeed: 500,
				overlayCss: {},
				messageCss: {},
				cbBeforeShow: function(){},
				cbAfterShow: function(){},
				cbBeforeHide: function(){},
				cbAfterHide: function(){},
				cbAlreadyActive: function(){}
			}
			
			var default_overlay_css = {
				position: 'fixed',
				top: 0,
				right: 0,
				left: 0,
				bottom: 0,
				width: '100%',
				height: '100%',
				'z-index': 9998,
				'background-color': '#000000',
				opacity: 0.5	
			}
			
			var default_message_css = {
				"z-index": 9999
			}

			// Merge settings
			var settings 		= jQuery.extend({}, default_settings, options);
			
			// If already active
			if($(".jblock").is(":visible")){
				settings.cbAlreadyActive.call($(".jblock-message"));
				return;
			}
			
			// Merge overlay css
			var overlay_css				= jQuery.extend({}, default_overlay_css, settings.overlayCss);
			
			// Merge message css
			var message_css				= jQuery.extend({}, default_message_css, settings.messageCss);
			
			// Save settings global so the unblock function can
			// also use these
			jblock_settings = settings;
			
			var overlay = jQuery('<div></div>').hide().addClass("jblock").css(overlay_css).appendTo('body');
			
			// Bind click close if this is enabled
			if(settings.clickClose){
				overlay.click(function(){
					$.unblock();
				});
			}
			
			if(settings.contentElement != ""){
				var message = settings.contentElement.hide().clone();	// Add clone to end of page
			}else{
				var message = jQuery('<div></div>').hide().html(settings.content);	// Create div with content
			}
			
			// Append message to html body
			message.css(message_css).addClass("jblock-message").appendTo('body');
				
			// Center in screen
			center(message);
			
			// Show the message
			show();
			
			/**
			 * Center a div in the screen
			 * 
			 * @return HTMLElement
			 */
			function center(element){
				element.css("position","absolute");
				element.css("top", ( $(window).height() - element.height() ) / 2+$(window).scrollTop() + "px");
				element.css("left", ( $(window).width() - element.width() ) / 2+$(window).scrollLeft() + "px");
			    return element;
			}
			
			/**
			 * Show block
			 * 
			 * @return void
			 */
			function show(){
				
				jblock_settings.cbBeforeShow.call($(".jblock-message"));
				
				$(".jblock").fadeIn(400, function(){
					$(".jblock-message").fadeIn(settings.showAnimationSpeed, function(){
						startAutoCloseTimer();
						jblock_settings.cbAfterShow.call($(".jblock-message"));
					});
				})
				
			}
			
			/**
			 * Start the auto close timer if enabled
			 * 
			 * @return void
			 */
			function startAutoCloseTimer(){
				if(settings.autoClose){
					setTimeout(function()
							{
								jQuery.unblock();
							},
					settings.autoCloseTime);
				}
			}
			
		},
		
		unblock: function()
		{	
			jblock_settings.cbBeforeHide.call($(".jblock-message"));
			$(".jblock-message").fadeOut(jblock_settings.hideAnimationSpeed, function(){
				$(".jblock").fadeOut(400, function(){ 
					$(".jblock").remove();
					$(".jblock-message").remove();
					jblock_settings.cbAfterHide.call($(".jblock-message"));
				});
			})
		}
		
		
	});
})(jQuery);

