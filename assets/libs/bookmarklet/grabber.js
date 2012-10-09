/* tagger Javascript 
 * Authorized by Le Yang (yorsal)
 */

var Tagger = {
	
	init : function(){
		if(document.addEventListener){
			photo_original_width = this.width;
			photo_original_height = this.height;
		}

		if($('div#getcode').length){
			$('div#getcode').remove();
		}
		if($('div#added_thing').length){
			$('div#added_thing').remove();
		}
		$('input#f-whatisit').val('');
		if( $('input#f-note-for-photo').val().length>0 && $('input#f-note-for-photo').val() != $('input#f-note-for-photo').attr('placeholder')){
			$('input#f-note-for-photo').val($('input#f-note-for-photo').attr('placeholder'));
		}
		if($('input#f-note-for-thing').val().length>0 && $('input#f-note-for-thing').val() != $('input#f-note-for-thing').attr('placeholder')){
			$('input#f-note-for-thing').val($('input#f-note-for-thing').attr('placeholder'));
		}
	    $('#f-category-for-photo').val('-1');
	    $('#f-category-for-thing').val('-1');
		
		if($('input.bookmarklet_info').length){
		  var title= $('input.bookmarklet_info').attr('title');
		  if (title != undefined && title != null){
			$('input#f-whatisit').val(title);			
		  }
		}
		$("input#f-whatisit").focus(function(){
			$(this).select();
		});
		//alert("a");
		Tagger.handleCancel(0);
		//alert("b");
		Tagger.handleNext(true);
		//alert("c");
		Tagger.cancel();
		//alert("d");
		Tagger.imagePick();
		//alert("e");
		Tagger.register();
		//alert("f");
		Tagger.taglink();
		//alert("g");
		Tagger.add_thing();
		//alert("h");
		Tagger.enterWhatIsIt();
		//alert("i");
		Tagger.enterNoteForThing();
		//alert("j");
		Tagger.enterCategoryForThing();
		//alert("k");

		/*
		if ($('body.tagger-js').length > 0){
			var obj = $('#main form fieldset.image .tag-photo'),
			obj_inputUrl = $('#main form fieldset:first-child input.text'),
			obj_actions = $('#main form fieldset:first-child li').eq(1),
			obj_imageField = $('#main form fieldset.image');
					 
					
			//Tagger.loadImage(obj, obj_inputUrl, obj_actions, obj_imageField);
			//Tagger.tagPhoto(obj);
			Tagger.register(obj,obj_inputUrl);
			Tagger.cancel();
			Tagger.next(obj,obj_inputUrl,obj_actions,obj_imageField);
			//Tagger.editUrl(obj, obj_inputUrl, obj_actions, obj_imageField);
			//Tagger.errorImage(obj);
			Tagger.errorImage(obj, obj_actions);
			Tagger.accessibleInputValues(obj_inputUrl);
			Tagger.enterUrlKey(obj, obj_inputUrl, obj_actions, obj_imageField);
		}
		*/
	},
	
	loadImage : function(obj, obj_inputUrl, obj_actions, obj_imageField){
		//initialize
		//var img = new Image(); // preload image
		//img.src = obj.find('img').attr('src');
		//var pic_real_width = img.width;
		//var pic_real_height = img.height;
		var pic_real_width = photo_original_width;
		var pic_real_height = photo_original_height;
		
		if (parseInt(pic_real_width) > 620){
			pic_real_width = 620;
			//var pic_ratio = pic_real_width/img.width
			var pic_ratio = pic_real_width/photo_original_width
			pic_real_height = pic_real_height *pic_ratio;
		}
		
		if (pic_real_width > 0){
			//$('img#f-logo').hide();
			$('div#f-foot').show();
			obj_actions.show();
		}

		var obj_msg = $('#main form fieldset.action li').eq(0);
		obj_msg.find('label').hide();
		$('#main form p.tip').text('Tip: click on the image to tag things.');
		$('#main form p.tip').show();
		$('#main .f-header').text("Click to tag things in the image");
		//$('#main .close_box').hide();


		
		obj.children('img').attr({
			width: pic_real_width, 
			height: pic_real_height
			});
			
		obj.css({width: pic_real_width, height: pic_real_height});
				
		// for safari
		/*
		if (jQuery.browser.safari){
			obj.children('img').load(function(){ 
				obj_inputUrl.removeClass('empty');
				obj_actions.show();
				$(this).removeAttr("width").removeAttr("height");
			  pic_real_width = this.width;
			  pic_real_height = this.height;
			  obj.children('img').attr({
				width: pic_real_width, 
				height: pic_real_height,
				src: obj_inputUrl.val()
				});
				obj.css({width: pic_real_width, height: pic_real_height});
				
			});
		}
		*/
		$('div.instruction').hide();
		$('#f-container form').show();
		obj_imageField.show();
	},
	
	//bind Error image
	errorImage : function(obj,obj_actions){
		obj.children('img').bind('error', function(){ 
			obj.unbind('mouseover');
			obj.find('.point').remove();
			obj_actions.hide();
			
		});
		
	},
	
	inputUrlEmpty : function(obj, obj_actions){
			obj.unbind('mouseover');
			obj.find('.point').remove();
			obj_actions.hide();
	},
	
	editUrl : function(obj, obj_inputUrl, obj_actions, obj_imageField){
		
		obj_inputUrl.keydown(function(){
			//obj_actions.show();
			$(this).removeClass('empty');
			Tagger.loadImage(obj, obj_inputUrl, obj_actions, obj_imageField);
			obj.unbind('mouseover');
			Tagger.tagPhoto(obj);
			$('#main .success-tip').remove();
			if ($(this).val() == ''){
				Tagger.inputUrlEmpty(obj, obj_actions);
			}
			//obj_imageField.find('img').load(function(){
			//	Tagger.loadImage(obj, obj_inputUrl, obj_actions, obj_imageField);
			//});			
		});
		
		obj_inputUrl.keyup(function(){	
			//obj_actions.show();
			$(this).removeClass('empty');
			Tagger.loadImage(obj, obj_inputUrl, obj_actions, obj_imageField);
			obj.unbind('mouseover');
			Tagger.tagPhoto(obj);
			$('#main .success-tip').remove();
			if ($(this).val() == ''){
				Tagger.inputUrlEmpty(obj, obj_actions);
			}

		});
		
	},
	add_thing : function(){
		$('#main form a.add_new_thing').click(function(){
			$('.add_thing span.next-action').hide();
			$('.add_thing span.status-msg').show();			
			Tagger.handleAddThing();
			return false;
		})
	},

	handleAddThing : function(){
		var param={};
        if($('input.user_key_info').length){
			var user_key = $('input.user_key_info').attr('user_key');
			param['user_key']=user_key;
		}
		var tag_url = $('input.bookmarklet_info').attr('client_url');
		param['tag_url']=tag_url;		
		param['photo_url']=$('#f-picked-image').attr('src');
		var name = $('form.add_thing').find('input#f-whatisit').val();
		param['name']=name;
		var note_str = $('input#f-note-for-thing').val().trim_str();
		var note_placeholder = $('input#f-note-for-thing').attr('placeholder').trim_str();
		var note_val = '';
		if(note_str.length>0 && note_str != note_placeholder){
			param['note']=note_str;
			note_val = note_str;
		}
	    var cat_str = $('#f-category-for-thing').val();
		if (cat_str != '-1' && cat_str != '-2'){
			param['category']=cat_str;			
		}

		if(name.length<=0){
			alert('Please enter name');
			return false;
		}
		if (!is_add_thing){
			is_add_thing = true;
			var self = this;
			$.post("/add_new_sys_thing.xml",param, 
			  function(xml){
				if ($(xml).find("status_code").length>0 && $(xml).find("status_code").text()==1) {
					$('form.add_thing').hide();
					//$('#main form').before('<p class="success-tip">Image added - thanks! We\'ll check it out and then put it on the front page.</p>')
					$('#main form.add_thing').before('<div id="added_thing">'+
					'<div id="f-head">'+
					'<a class="close_box" href="#"><img style="float: right;" src="http://s3.amazonaws.com/thefazzle/_ui/bookmarklet/f-x.png" /></a>'+
					'<img src="http://s3.amazonaws.com/thefazzle/_ui/bookmarklet/f-logo.png" />'+
					'</div>'+
					'<div id="f-foot">'+
					'<strong>Saved to your collection.</strong><a class="l2 close_box" href="#">Close</a>'+
					'<br/><div id="countdown-hide" style="display:none;"></div><div id="countdown" style="margin-left:5px;margin-top:10px;"></div>'+
					'</div>');
					
					$('#main form p.tip').hide();
					//Tagger.tag_again();
					$('#main .f-header-add').hide();

					var obj = $('#main form fieldset.image .tag-photo');
					var msg = {
						iframe_width: 270,
						iframe_height: 90
						//turn_off_lasso: true
						};
					self.send_msg(obj,msg);
					
					var shortly = new Date(); 
					shortly.setSeconds(shortly.getSeconds() + 2.9); 
					$('#countdown-hide').countdown({until: shortly,onExpiry: liftOff, onTick: watchCountdown});
					//$('#countdown-hide').countdown({until: '+0h +0m +3s',onExpiry: liftOff, onTick: watchCountdown});
					$('#countdown-hide').countdown('pause');
					setTimeout(function(){
						$('#countdown-hide').countdown('resume');						
					},800);
					
					
				}
				else if ($(xml).find("status_code").length>0 && $(xml).find("status_code").text()==0) {
				  alert($(xml).find("message").text());
				}
				is_add_thing=false;
			}, "xml");
		}
	},
	
	register : function(){
		$('#main form a.register').click(function(){
			var obj = $('#main form fieldset.image .tag-photo');
			Tagger.handleRegister(obj);
			return false;
		})
	},
	
	handleRegister : function(obj){
		//var t = new Image();
		//t.src = obj.find('img').attr('src');
		//var rel_img_width = t.width;
		//var rel_img_height = t.height;
		var rel_img_width = photo_original_width;
		var rel_img_height = photo_original_height;

		var img_width = obj.find('img').width();
		var img_height = obj.find('img').height();
		var param={};
        if($('input.user_key_info').length){
			var user_key = $('input.user_key_info').attr('user_key');
			param['user_key']=user_key;
		}
		param['photo_url']=obj.find('img').attr('src');
		param['photo_width']=rel_img_width;
		param['photo_height']=rel_img_height;
		
		var note_str = $('input#f-note-for-photo').val().trim_str();
		var note_placeholder = $('input#f-note-for-photo').attr('placeholder').trim_str();
		if(note_str.length>0 && note_str != note_placeholder){
			param['note']=note_str;						
		}
	    var cat_str = $('#f-category-for-photo').val();
		if (cat_str != '-1' && cat_str != '-2'){
			param['category']=cat_str;			
		}

		var x_ratio = rel_img_width/img_width;
		var y_ratio = rel_img_height/img_height;
		var count = 0;
		var tags = [];
		obj.find('.point').each(function(){
			var info = {};
			var width = $(this).width();
			var height = $(this).height();
			
			var l = $(this).css('left').toString();
			var t = $(this).css('top').toString();
			var x =parseInt(l.replace('px','').trim_str()) * x_ratio;
			var y =parseInt(t.replace('px','').trim_str()) * y_ratio;
			var name=$(this).find('.body input.txt').eq(0).val().trim_str();//what is it?
			var name_label=$(this).find('.body label').eq(0).text().trim_str();//what is it?
			var website=$(this).find('.body input.txt').eq(1).val().trim_str();//optional:
			var website_label=$(this).find('.body label').eq(1).text().trim_str();//optional:
			if (name.length>0 && name.toLowerCase() != name_label.toLowerCase()){
				info['name'] = name;
				info['xcoord']=parseInt(x);
				info['ycoord']=parseInt(y);
				info['width']=parseInt(width);
				info['height']=parseInt(height);
				if(website.length>0 && website.toLowerCase() !=website_label.toLowerCase()){
					info['tag_url']=website;
				}
				tags.push(info);
				count = count +1;
			}
		});
		if (count>0 && !is_registering){
			is_registering = true;
			param['tag_count']=count;
			param['tags']= tags;
			var self = this;
			$.post("/add_photo_tags.xml",param, 
			  function(xml){
				if ($(xml).find("status_code").length>0 && $(xml).find("status_code").text()==1) {
					//$('#main form').before('<p class="success-tip">Image added - thanks! We\'ll check it out and then put it on the front page.</p>')
					$('#main form.add_thing').before('<div id="getcode">'+
					
						'<div id="f-head">'+
						'<a class="close_box" href="#">'+
						'<img style="float: right;" src="http://s3.amazonaws.com/thefazzle/_ui/bookmarklet/f-x.png" /></a>'+
						'<img id="f-logo" src="http://s3.amazonaws.com/thefazzle/_ui/bookmarklet/f-logo.png" />'+
						'</div>'+
						
						'<div id="f-main">'+
						'<p style="margin: 0px;"><strong>Added</strong></p><img style="max-width:140px;max-height:140px;" src="'+$(xml).find("photo_url").text()+'"/><br/><label for="f-embedsnip">Copy + paste this code snippet to embed in blogs and web pages</label>'+
						'<textarea onclick="this.focus(); this.select();" readonly id="codesnippet"><script src="http://www.thefazzle.com/photo/embed.js?photoID='+$(xml).find("photo_id").text()+
						'&url='+$(xml).find("photo_url").text()+'"></script></textarea>'+
						'<label for="f-embedsnip">Link to the tagged image on Fancy</label>'+
						'<textarea onclick="this.focus(); this.select();" readonly id="codesnippet">http://www.thefazzle.com/photo/'+$(xml).find("photo_id").text()+'</textarea>'+
						'</div>'+
					
						'<div id="f-foot">'+
						'<a href="#" class="f-button close_box">Close</a></div>'+
						'</div>'+
					'</div>');
					$('#main form fieldset.action input.text').val('Paste image URL, then click to tag things').addClass('empty');
					$('#main form fieldset.action li').eq(1).hide();
					$('#main form fieldset.image').find('.point').remove();
					$('#main form fieldset.image').hide();
					if($('#main form fieldset.action p#urlpreview')){
						$('#main form fieldset.action p#urlpreview').remove();
					}
					$('#main form p.tip').hide();
					//Tagger.tag_again();
					$('#main .f-header').hide();
					
					$('#main .add_tags').hide();

					var msg = {
						iframe_width: 600,
						iframe_height: 440
						};
					self.send_msg(obj,msg);

				}
				else if ($(xml).find("status_code").length>0 && $(xml).find("status_code").text()==0) {
				  alert($(xml).find("message").text());
				}
				is_registering=false;
			}, "xml");
		}
		if(count==0){
			alert("Nothing tagged in this image yet.");
		}



	},
	taglink : function(){
		var self = this;
		$('a#f-taglink').click(function(){
			var obj = $('#main form fieldset.image .tag-photo');
			//alert(tag_frame_width);
			//alert(tag_frame_height);
			var msg = {
				iframe_width: tag_frame_width,
				iframe_height: tag_frame_height
				//turn_off_lasso: true
				};
			self.send_msg(obj,msg);
			$('form.add_thing').hide();
			$('form.add_tags').show();			
		})
	},
	
	cancel : function(){
		$('#main form a.cancel_tag').click(function(){
			if (window.confirm('Forget tags on this image?')){
				Tagger.handleCancel();
				$('a.close_box').click();
			}			
		}),
		$('#main form a.cancel_add_thing').click(function(){
			Tagger.handleCancel();
			$('a.close_box').click();
			return false;
		})
	},
	send_pick : function(msg){
		var p = window.parent;
		try {
			p.location.replace($('input.bookmarklet_info').attr('client_url') + "#tfbml-data"+encodeURIComponent(JSON2.stringify(msg)));
		} catch (e1) {
			p.location = $('input.bookmarklet_info').attr('client_url') + "#tfbml-data"+json_over_url
		}
		
	},
	imagePick : function(){
		$('#main form a.img-pick').click(function(){
			//Tagger.handleCancel();
			//$('a.close_box').click();
			//alert("bazzinga!!");
			var current_pick = $('#f-picked-image').attr('pick_id');
			var direction_id = $(this).attr('did');
			//alert("direction id: " + direction_id);
			var msg = {
				current_pick: current_pick,
				direction_id: parseInt(direction_id)
				};
			Tagger.send_pick(msg);
			return false;
		})
	},
	tag_again : function(){
		var self =this;
		$('#main #getcode a.tag_again').click(function(){
			$("#getcode").remove();
			Tagger.handleCancel();
			$('a.close_box').click();
		})
	},
	image_load : function(){
		var obj_inputUrl = $('#main form fieldset.action input.text');
		var img_src = obj_inputUrl.val();
		var img = new Image(); // preload image
		img.src = obj_inputUrl.val();
		var pic_real_width = img.width;
		var pic_real_height = img.height;
	},
	next : function(obj, obj_inputUrl, obj_actions, obj_imageField){
		$('#main form button.next_action').click(function(){
			if(!is_action_next){
				is_action_next = true;
				var img_src = obj_inputUrl.val();
				var img = new Image(); // preload image
				img.src = obj_inputUrl.val();
				img.onload = Tagger.handleNext;
				img.onerror = Tagger.handleFail;
			}
			//img.onload = Tagger.handleNext(obj, obj_inputUrl, obj_actions, obj_imageField);
			//img.onreadystatechange = Tagger.handleNext(obj, obj_inputUrl, obj_actions, obj_imageField);
			//Tagger.handleNext(obj, obj_inputUrl, obj_actions, obj_imageField);
			return false;
		})
	},
	//handleNext : function(obj, obj_inputUrl, obj_actions, obj_imageField){
	handleFail : function(){
		is_action_next = false;
		var obj = $('#main form fieldset.image .tag-photo'),
		obj_inputUrl = $('#main form fieldset.action input.text'),
		obj_actions = $('#main form fieldset.action li').eq(1),
		obj_imageField = $('#main form fieldset.image');
		
		obj_inputUrl.parents('li').removeClass('error');
		if(obj_inputUrl.parents('li').find('span.tip')){
			obj_inputUrl.parents('li').find('span.tip').remove();
		}
		obj_inputUrl.parents('li').addClass('error');
		obj_inputUrl.parents('li').append("<span class='tip'>Hmm, that doesn't look like a valid URL</span>");
	},
	
	//handleNext : function(obj, obj_inputUrl, obj_actions, obj_imageField){
	handleNext : function(resize){
		is_action_next = false;

		var obj = $('#main form fieldset.image .tag-photo'),
		obj_inputUrl = $('#main form fieldset.action input.text'),
		obj_actions = $('#main form fieldset.action li').eq(1),
		obj_imageField = $('#main form fieldset.image');

		obj_inputUrl.parents('li').removeClass('error');
		if(obj_inputUrl.parents('li').find('span.tip')){
			obj_inputUrl.parents('li').find('span.tip').remove();
		}
		var img_src = obj.find('img').attr('src');
		
		var pic_real_width = photo_original_width;
		var pic_real_height = photo_original_height;
		if(photo_original_height == 0 || photo_original_width == 0){
			var img = new Image(); // preload image
			img.src = img_src;
			pic_real_width = img.width;
			pic_real_height = img.height;
			
			photo_original_height = img.height;
			photo_original_width = img.width;
		}
		if(pic_real_width>0){
			Tagger.loadImage(obj, obj_inputUrl, obj_actions, obj_imageField);
			Tagger.tagPhoto(obj);

			var iframe_width = pic_real_width + 310;
			var iframe_height = pic_real_height + 230;
			if (iframe_height > 550)
				iframe_height = 550;
			if (iframe_width > 980)
				iframe_width = 980;
			else if (iframe_width < 400)
				iframe_width = 400;
			tag_frame_height = iframe_height;
			tag_frame_width = iframe_width;
			if (resize ==true){
				var msg = {
					iframe_width: 279,
					iframe_height: 372
					};
				this.send_msg(obj,msg);
				$('form.add_thing').show();
				$('form.add_tags').hide();
			}
			

		}
		else{
			obj_inputUrl.parents('li').addClass('error');
			obj_inputUrl.parents('li').append("<span class='tip'>Hmm, that doesn't look like a valid URL</span>");
		}
	},
	send_msg : function(obj,msg){
		var p = window.parent;
		try {
			p.location.replace(obj.find('img').attr('client_url') + "#tfbml-data"+encodeURIComponent(JSON2.stringify(msg)));
		} catch (e1) {
			p.location = obj.find('img').attr('client_url') + "#tfbml-data"+json_over_url
		}
		
	},
	handleCancel : function(snd){
		var obj_msg = $('#main form fieldset.action li').eq(0);
		obj_msg.find('label').show();
		$('#main form p.tip').text('Tip: images will be scaled down to 620 pixels maximum width.');
		$('#main form p.tip').show();
		$('#main .f-header').text('Click an image to add it to Fancy');
		$('#main .close_box').show();
		$('#main form fieldset.action li').eq(1).hide();
		$('#main form fieldset.image').find('.point').remove();
		$('#main form fieldset.image').hide();
		var obj = $('#main form fieldset.image .tag-photo');
		obj.unbind('mouseover');
		obj.unbind('mouseout');
		$('#main form a.cancel_tag').unbind('click');
		$('#main form a.register').unbind('click');
		$('#main form a.tag_again').unbind('click');
		$('#main form a.cancel_add_thing').unbind('click');
		$('a#f-taglink').unbind('click');
		$('#main form a.add_new_thing').unbind('click');
		
		$('form.add_thing').hide();
		$('form.add_tags').show();
		$('#main .f-header').show();

		/*
		if(snd == undefined || snd == null || (snd != undefined && snd != null && snd == 1)){
			var msg = {
				iframe_width: 400,
				iframe_height: 90
				};
			this.send_msg(obj,msg);
		}
		*/
		//$('a.close_box').click();

		//location.reload(false);
	},
	
	tagPhoto : function(obj){
		Tagger.addTagEvent(obj);
	},
	
	addTagEvent : function(obj){
		obj.bind('mouseover', function(e){
			$(this).bind('click', function(e){
				Tagger.addTagClickEvent(obj, e);
				$('body').unbind('click');
			});
		});
		
		obj.bind('mouseout', function(e){
			$(this).unbind('click');
			$('body').bind('click', function(){
				Tagger.hideTip(obj);
			})
		});
	},
	
	addTagClickEvent : function(obj, e){
		// calulate coordinate
		var offset = obj.offset();
		Tagger.hideTip(obj);
		//var str_tip = '<div class="tip"><div class="head"><h4>Tag</h4><span class="btn-del">Delete</span></div><div class="body"><label class="hide">what is it?</label><input type="text" value="what is it?" class="txt" /><label class="hide">optional: URL where it can be found or purchased</label><input type="text" value="optional: URL where it can be found or purchased" class="txt" /></div><span class="b"></span></div>';
		//var one = $('<div class="point focus" style="left:'+ (e.pageX - offset.left - 10) +'px; top: '+ (e.pageY - offset.top - 10) +'px">'+ str_tip +'</div>');
		var str_tip = '<div class="tip"><div class="body"><label class="hide">what is it?</label><input type="text" value="what is it?" class="txt" /><label class="hide">optional: URL where it can be found or purchased</label><input type="text" value="optional: URL where it can be found or purchased" class="txt" /></div><div class="actions"><span class="btn-save">Save</span><span class="btn-del">Delete</span></div><span class="b"></span></div>';
		var one = $('<div class="point focus" style="left:'+ (e.pageX - offset.left - 10) +'px; top: '+ (e.pageY - offset.top - 10) +'px"><span class="dot"></span>'+ str_tip +'</div>');

		obj.append(one);
		obj.find('.point').css('zIndex', '1');
		one.addClass('focus').css('zIndex', '999');
		one.find('input').eq(0).focus().select();
		Tagger.accessibleInputValues(one.find('input').eq(0));
		Tagger.accessibleInputValues(one.find('input').eq(1));
		Tagger.enterKeyOptional(one.find('input').eq(1), obj);
		Tagger.enterTipsyInputKey(one.find('input').eq(0));
		Tagger.enterTipsyInputKey(one.find('input').eq(1));
		
		
		Tagger.addDraggable(one);
		Tagger.addTipEvent(obj,one);
		
	},
	
	hideTip : function(obj){
		obj.find('.point').removeClass('focus');
	},
	
	addDraggable : function(obj){
		obj.draggable({ containment: '#main form fieldset.image div.tag-photo', scroll: false, cursor: 'move' });
	},
	
	focusInput : function(self){
		self.find('input').eq(0).focus();
	},
	
	accessibleInputValues: function(e) {	
		labeltxt = $(e).prev('label').html();
		if ($(e).val() == '') $(e).val(labeltxt);
		$(e)
        .focusin(function() {
			labeltxt = $(this).prev('label').html();
			if ($(this).val() == labeltxt) {
				$(this).val('');
				e.css('color', '#333');
			}
        }).focusout(function() {
			labeltxt = $(this).prev('label').html();
			if ($(this).val() == '') {
				$(this).val(labeltxt);
				e.css('color', '#666');
			}
        });
	},
	
	addTipEvent : function(obj,point){
		//click event
		point.find('.dot').click(function(){
			Tagger.hideTip(obj);
			point.css('zIndex', '1');
			$(this).parent().addClass('focus').css('zIndex', '999');
			//Tagger.focusInput($(this));
		})
		
		//hover event
		point.hover(function(){
			$('body').unbind('click');
			obj.unbind('mouseover');
			obj.unbind('mouseout');
		}, function(){
			Tagger.addTagEvent(obj);
		});

		//save event
		point.find('.btn-save').click(function(){
			$(this).parent().parent().parent().removeClass('focus');
		});
		
		//close event
		point.find('.btn-del').click(function(){
			$(this).parent().parent().parent().remove();
			Tagger.addTagEvent(obj);
		});
	},

	enterTipsyInputKey : function(obj){
		obj.bind('keypress', function(e) {
        if(e.keyCode==13){
        	obj.parent().parent().parent().removeClass('focus');
           return false;
        }
		});
	},
	
	enterWhatIsIt : function(){
		$("#main #f-whatisit").bind("keypress", function(e) {
			var c = e.which ? e.which : e.keyCode;
			if(c == 13){
				Tagger.handleAddThing();
				return false;
			}
		});
	},
	
	enterNoteForThing : function(){
		$("#main #f-note-for-thing").bind("keypress", function(e) {
			var c = e.which ? e.which : e.keyCode;
			if(c == 13){
				Tagger.handleAddThing();
				return false;
			}
		});
	},
	
	
	enterCategoryForThing : function(){
		$("#main #f-category-for-thing").bind("keypress", function(e) {
			var c = e.which ? e.which : e.keyCode;
			if(c == 13){
				Tagger.handleAddThing();
				return false;
			}
		});
	},
	
	enterUrlKey : function(obj, obj_inputUrl, obj_actions, obj_imageField){
		obj_inputUrl.bind('keypress', function(e) {
		$('button.next_action').show();
		$(this).removeClass('empty');
        if(e.keyCode==13){
			if(!is_action_next){
				is_action_next = true;
				var img_src = obj_inputUrl.val();
				var img = new Image(); // preload image
				img.src = obj_inputUrl.val();
				img.onload = Tagger.handleNext;
				img.onerror = Tagger.handleFail;
			}
			//img.onreadystatechange = Tagger.handleNext(obj, obj_inputUrl, obj_actions, obj_imageField);
			//Tagger.handleNext(obj, obj_inputUrl, obj_actions, obj_imageField);
        	//Tagger.loadImage(obj, obj_inputUrl, obj_actions, obj_imageField);
          return false;
        }
		});
		obj_inputUrl.keydown(function(){
			$('button.next_action').show();
			$(this).removeClass('empty');
			
		});

	
	},
	
	enterKeyOptional : function(obj_optional, obj){
		obj_optional.bind('keypress', function(e) {
        if(e.keyCode==9){
        	Tagger.hideTip(obj);
          return false;
        }
		});
	}
	
	
	
	
	
}
var is_registering=false;
var is_action_next=false;
var is_add_thing = false;
var photo_original_width = 0;
var photo_original_height = 0;
//Tagger.init();
var tag_frame_width=0;
var tag_frame_height=0;
String.prototype.escape_html = function() {
  return this.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;");
};
String.prototype.trim_str = function() {
  return this.replace(/^\s+|\s+$/g,"");
};