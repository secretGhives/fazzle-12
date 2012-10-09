  //window.parent.handleResponse()
//$('body').bind('click', function(e){
//    alert('ohh');
//});
String.prototype.escape_html = function() {
  return this.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;");
};
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g,"");
};

function tf_tf_y(f) {
    var v = f;
    //this.current_hash = false;
    this.start = function () {
        var self = this;
        this.interval = setInterval(v, 100);
    };

  this.run = function () {
  };

  this.stop = function () {
      clearInterval(this.interval);
      //alert("client interval stopped");
  };
}
tf_check_hash = new tf_tf_y(tf_compare_hash);

var tf_current_hash = false;
function tf_compare_hash(){
    if(window.location.hash != tf_current_hash) {
      //alert("client");
        tf_current_hash = window.location.hash;
        regexp = /^#(.*)tfbml-data|^#(.*)/
	var data = tf_current_hash.replace(regexp,'');
	//alert(data);
        var json_over_url = decodeURIComponent(data);
		if (json_over_url == undefined || (json_over_url != undefined && json_over_url.length <=0))
		  return false;
        json_over_url = eval("(" + json_over_url + ")");
	
	//alert(json_over_url)
        
        if (json_over_url == undefined)
            return false;
        var img_url = '';
        if (json_over_url.client_url != undefined){
            var c_url = json_over_url.client_url;
            if($('input.bookmarklet_info').length){
			  $('input.bookmarklet_info').attr('client_url',c_url.trim());
            }
            else{
                $('body').append('<input class="bookmarklet_info" type="hidden" client_url="'+c_url.trim().escape_html()+'" />');             
            }
		}
        if (json_over_url.title != undefined){
            var title = json_over_url.title;
            if($('input.bookmarklet_info').length){
			  $('input.bookmarklet_info').attr('title',title.trim());
            }
            else{
                $('body').append('<input class="" type="hidden" title="'+title.trim().escape_html()+'" />');             
            }
		}
        if (json_over_url.user_key != undefined){
            var user_key = json_over_url.user_key;
            if($('input.user_key_info').length){
            }
            else{
                $('body').append('<input class="user_key_info" type="hidden" user_key="'+user_key+'" />');             
            }
		}

        if (json_over_url.target_url != undefined)
            img_url = json_over_url.target_url;
        if (img_url.length>0){
            if ($('.tag-photo img').length){
                $('.tag-photo img').attr('src',img_url);
                $('#f-picked-image').attr('src',img_url);
		if (json_over_url.pick_id != undefined){
		  //alert("client recieved pick id "+ json_over_url.pick_id)
		  $('#f-picked-image').attr('pick_id',json_over_url.pick_id);
		}
                $('.tag-photo img').attr('client_url',json_over_url.client_url);    
                var img = new Image(); // preload image
		  if (json_over_url.init_listeners){
			if(document.addEventListener){
				img.onload = Tagger.init;
				img.src = $('.tag-photo img').attr('src');
			}
			else{
				img.src = $('.tag-photo img').attr('src');
				Tagger.init();
			}
		}
		else{
		  img.src = $('.tag-photo img').attr('src');
		  Tagger.handleNext(false);
		  /*
		  var new_image = new Image(); // preload image
		  new_image.src = img_url;
		  capped_new_image_width = new_image.width;
		  capped_new_image_height = new_image.height;
		  
		  if (parseInt(new_image.width) > 620){
			uncapped_new_image_with = capped_new_image_width
			capped_new_image_width = 620;
			//var pic_ratio = pic_real_width/img.width
			var pic_ratio = capped_new_image_width/uncapped_new_image_with
			capped_new_image_height = capped_new_image_height * pic_ratio;
		  }
		  $('#main form fieldset.image .tag-photo').children('img').attr({
		    width: capped_new_image_width, 
		    height: capped_new_image_height
		  });
		  $('#main form fieldset.image .tag-photo').css({width: capped_new_image_width, height: capped_new_image_height});
		  */
		}

                //Tagger.init();

            }
        }
	else{
	  $('form.add_tags').hide();
	  $('form.no_image').show();
	  var p = window.parent;
	  var json_over_url = encodeURIComponent(JSON2.stringify({
		  iframe_width: 402,
		  iframe_height: 345
	      }));
	  var c_url = $('input.bookmarklet_info').attr('client_url');
	  try {
	      p.location.replace(c_url + "#tfbml-data"+json_over_url);
	  } catch (e1) {
	      p.location = c_url + "#tfbml-data"+json_over_url
	  }
	}
    }        
  
}
function liftOff() { 
        tf_check_hash.stop();
        var p = window.parent;
        var json_over_url = encodeURIComponent(JSON2.stringify({
                close_iframe: true
            }));
        var c_url = $('input.bookmarklet_info').attr('client_url');
        try {
            p.location.replace(c_url + "#tfbml-data"+json_over_url);
        } catch (e1) {
            p.location = c_url + "#tfbml-data"+json_over_url
        }
		return false;
} 
 
function watchCountdown(periods) {
    //$('#countdown').text('Closing in '+periods[6] + ''); 
}

$(document).ready(function(){
    tf_check_hash.start();
    $('a.close_box').live('click',function(){
        tf_check_hash.stop();
        var p = window.parent;
        var json_over_url = encodeURIComponent(JSON2.stringify({
                close_iframe: true
            }));
        var c_url = $('input.bookmarklet_info').attr('client_url');
        try {
            p.location.replace(c_url + "#tfbml-data"+json_over_url);
        } catch (e1) {
            p.location = c_url + "#tfbml-data"+json_over_url
        }
		return false;
    });
    $('a.goto_and_close_box').live('click',function(){
		var u = $(this).attr('url');
		form = document.createElement("form");
		form.method = "GET";
		form.action = u;
		form.target = "_blank";
		document.body.appendChild(form);
		form.submit();
		setTimeout(function(){
		  tf_check_hash.stop();
		  var p = window.parent;
		  var json_over_url = encodeURIComponent(JSON2.stringify({
				  close_iframe: true
			  }));
		  var c_url = $('input.bookmarklet_info').attr('client_url');
		  try {
			  p.location.replace(c_url + "#tfbml-data"+json_over_url);
		  } catch (e1) {
			  p.location = c_url + "#tfbml-data"+json_over_url
		  }		  
		},1000);
		return false;
    });
    $("body").live("keyup", function(e) {
	  var kC  = (window.event) ?    // MSIE or Firefox?
				 event.keyCode : e.keyCode;
	  var Esc = (window.event) ?   
				27 : e.DOM_VK_ESCAPE // MSIE : Firefox
	  if(kC==Esc){
        tf_check_hash.stop();
        var p = window.parent;
        var json_over_url = encodeURIComponent(JSON2.stringify({
                close_iframe: true
            }));
        var c_url = $('input.bookmarklet_info').attr('client_url');
        try {
            p.location.replace(c_url + "#tfbml-data"+json_over_url);
        } catch (e1) {
            p.location = c_url + "#tfbml-data"+json_over_url
        }
		return false;		
	  }
    });
    /*
    $("#main #f-whatisit").bind("keypress", function(e) {
      var c = e.which ? e.which : e.keyCode;
      if(c == 13){
	$("#main form a.add_new_thing").click();
      }
    });
    */
    /*
    $('a#login_fazzle').live('click',function(){
        check_hash.stop();
        var p = window.parent;
        var json_over_url = encodeURIComponent(JSON2.stringify({
                close_iframe: true
            }));
        var c_url = $('input.bookmarklet_info').attr('client_url');
        try {
            p.location.replace(c_url + "#"+json_over_url);
        } catch (e1) {
            p.location = c_url + "#"+json_over_url
        }
    });
    */
	
  if($("form").length){
    if (!('placeholder' in document.createElement('input'))) {
    		$('input[placeholder], textarea[placeholder]').each(function() {
    			var text = this.getAttribute('placeholder');
    			var fld = $(this);

    			function setPlaceholder() {
    				if (fld.val() == text || fld.val() == '') {
    					fld.addClass('jqPlaceholder');
    					fld.val(text);
    				}
    			}

    			function removePlaceholder() {
    				if (fld.val() == text || fld.val() == '') {
    					fld.val('');
    					fld.removeClass('jqPlaceholder');
    				}
    			}

    			setPlaceholder();

    			fld.focus(removePlaceholder);
    			fld.blur(setPlaceholder);
    			fld.parents("form").submit(removePlaceholder);
    		});
    	}
  }

});

JSON2 = function () {
	function f(n) {
	return n < 10 ? "0" + n : n
	}
	Date.prototype.toJSON = function () {
	return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
	};
	var m = {
	"\b": "\\b",
	"\t": "\\t",
	"\n": "\\n",
	"\f": "\\f",
	"\r": "\\r",
	'"': '\\"',
	"\\": "\\\\"
	};

	function stringify(value, whitelist) {
	var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g,
		v;
	switch (typeof(value)) {
	case "string":
		return r.test(value) ? '"' + value.replace(r, function (a) {
		var c = m[a];
		if (c) {
			return c
		}
		c = a.charCodeAt();
		return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
		}) + '"' : '"' + value + '"';
	case "number":
		return isFinite(value) ? String(value) : "null";
	case "boolean":
		return value ? 1 : 0;
	case "null":
		return String(value);
	case "object":
		if (!value) {
		return "null"
		}
		a = [];
		if (typeof(value.length) === "number" && !(value.propertyIsEnumerable("length"))) {
		l = value.length;
		for (i = 0; i < l; i += 1) {
			a.push(stringify(value[i], whitelist) || "null")
		}
		return "[" + a.join(",") + "]"
		}
		if (whitelist) {
		l = whitelist.length;
		for (i = 0; i < l; i += 1) {
			k = whitelist[i];
			if (typeof(k) === "string") {
			v = stringify(value[k], whitelist);
			if (v) {
				a.push(stringify(k) + ":" + v)
			}
			}
		}
		} else {
		for (k in value) {
			if (typeof(k) === "string") {
			v = stringify(value[k], whitelist);
			if (v) {
				a.push(stringify(k) + ":" + v)
			}
			}
		}
		}
		return "{" + a.join(",") + "}"
	}
	}
	return {
	stringify: stringify,
	parse: function () {}
	}
}();

function pop_login() {
//var load = window.open('http://192.168.1.101:8000/login');
  fazzleConnected();
}

var fazzleConnected = function() {
	var modal = window.open('/login?close', '_blank', 'height=300,width=900,left=250,top=100,resizable=yes', true);
	var wait  = function() {
		setTimeout(function() {
			if (modal == null) {
				//failure(); // When does this happen?
				return;
			}
			if (modal.closed) {
			  //location.reload(false);
			  var param = {};
			  param['check_login_status']=true;
			  $.post("/check_login_status.xml",param, 
				function(xml){
				  if ($(xml).find("status_code").length>0 && $(xml).find("status_code").text()==1) {
					location.reload(true);
				  }
				  else{
				  }
			  }, "xml");
			}
			else {
				wait();
			}
		}, 25);
	};
	wait();
};
