var qualifiedImages = new Array();
var title_v = '';

(function () {
function fazzle_tagger_bookmarklet(){
   this.IFrameObj; // our IFrame object
   this.iframe_url = "grabber.html";
   this.css_url = 'grabber.css'
   this.iframe_id = 'fazzle_bookmarklet_tagger_iframe';
   this.css_id = this.iframe_id+"_css";
   this.img_front_div_id = 'fazzle_bookmarklet_img_div_id';
   this.imgBlockObj;
   this.check_hash = null;
   this.fazzle_user_key = '';
   this.getEmbed = function(){
	  var e = window.frames[this.iframe_id];
	  return e;
   };
   
   
   this.keyPressHandler = function(e) {
		 var kC  = (window.event) ?    // MSIE or Firefox?
					event.keyCode : e.keyCode;
		 var Esc = (window.event) ?   
				   27 : e.DOM_VK_ESCAPE // MSIE : Firefox
		 if(kC==Esc){
			var del_node = document.getElementById(fttaggerbookmarklet.iframe_id);
			del_node.parentNode.removeChild(del_node);
			fttaggerbookmarklet.clean_listeners();
			//this.toggleItem(this.iframe_id);
		 }
   };
   
   
   this.toggleItem = function(id){
	 var item = document.getElementById(id);
	 if(item){
	   if ( item.style.display == "none"){
		 item.style.display = "";
	   }
	   else{
		 item.style.display = "none";
	   } 
	 }
   };
   
   this.showItem = function(id){
	 try{
	   var item = document.getElementById(id);
	   if(item){
		   item.style.display = "";
	   }
	 }
	 catch(e){
	 
	 }
   };
   
   
   this.runthis = function(){
	 // get the currently selected text
	 var t;
	 try {
	   t=((window.getSelection && window.getSelection())||(document.getSelection && document.getSelection())||(document.selection && document.selection.createRange && document.selection.createRange().text));
	 }
	 catch(e){ // access denied on https sites
	   t = "";
	 }

	 var calcstring = t.toString();
	 
	 if (calcstring == ""){
	   calcstring = "";
	 }
     this.fazzle_user_key = fazzle_username;
	
	
	 var existing_iframe = document.getElementById(this.iframe_id);
	 
	 if (existing_iframe){
		 existing_iframe.parentNode.removeChild(existing_iframe);
		 //document.body.removeChild(existing_iframe);
	 }
     this.check_hash = new tf_tf_y(this.tf_compare_hash);
     this.check_hash.start();

	  /*
     var e_css = document.getElementById(this.css_id);	
	 if (e_css){
	  e_css.parentNode.removeChild(e_css);
	 }
     var headID = document.getElementsByTagName("head")[0];	 
	 var cssNode = document.createElement('link');
	 cssNode.id = this.css_id;
	 cssNode.type = 'text/css';
	 cssNode.rel = 'stylesheet';
	 cssNode.href = this.css_url;
	 cssNode.media = 'screen';
	 headID.appendChild(cssNode);
	  */
     var img_div = document.getElementById(this.img_front_div_id);	
	 if (img_div){
	  img_div.parentNode.removeChild(img_div);
	 }
	 var imgDivNode = document.createElement('div');
	 imgDivNode.id = this.img_front_div_id;
     imgDivNode.style.display='none';
     imgDivNode.style.border='10px solid #8f0';
     imgDivNode.style.position='absolute';
     imgDivNode.style.zIndex='10000000';
	 imgDivNode.style.backgroundImage= "url( './transparent.gif' )";
     imgDivNode.style.background = "url( 'http://s3.amazonaws.com/fazzle/_ui/images/f-plus.png')   no-repeat scroll 5px 5px transparent";
     //imgDivNode.setAttribute('style','display:none;border: 3px solid green;position: absolute;_position: absolute;z-index: 10000000;');
     this.imgBlockObj=document.body.appendChild(imgDivNode);
	 
	 //var title_v = '';
	  try {
		 title_v = document.title.toString();
		 if (title_v.length>400)
			title_v = title_v.substring(0,400);
	  } catch (e1) {
	  }
          
         var allImages = document.images;
         //var has_pick_id = true;
         for (var i=0;i<allImages.length;i++)
         {
           theImage = allImages[i].src;
            size = this.nodeDim(allImages[i]);
           if(size.w>140 && size.h>140){
             qualifiedImages[qualifiedImages.length]=theImage;
             //alert(qualifiedImages[qualifiedImages.length-1]);
           }
         }
         //alert(qualifiedImages[0]);
         var msg = {
		  client_url: document.URL,
                  user_key: this.fazzle_user_key,
                  //target_url: qualifiedImages[0],
		  close_iframe: false,
		  //iframe_width: 400,
		  //iframe_height: 90,
		  title:title_v,
                  init_listeners: true
		  };
         if(qualifiedImages.length>0){
            msg['pick_id'] = 0,
            msg['target_url'] = qualifiedImages[0]
           // msg['iframe_width'] = 400,
            //msg['iframe_height'] = 90
         }
         /*
         else{
            msg['iframe_width'] = 402,
            msg['iframe_height'] = 345
         }*/
	 this.add_iframe(msg);//this.iframe_url+"#"+json_over_url);
	 //var body = document.getElementsByTagName("body");  
	 //Event.addListener(body,'click',function(e){alert(e.target.nodeName);});
	 //Event.addListener()
	 if(document.addEventListener){	  
	  document.addEventListener('keyup',this.keyPressHandler,false);
	  document.addEventListener('click',this.click_page,false);
	  document.addEventListener('mouseover',this.mouseover_page,false);
	  document.addEventListener('mouseout',this.mouseout_page,false);
	  this.imgBlockObj.addEventListener('mouseout',this.imgBlockout,false);
	 }
     else if (document.attachEvent){
	  document.attachEvent("onkeyup", this.keyPressHandler)
	  document.attachEvent("onclick", this.click_page)
	  document.attachEvent('onmouseover',this.mouseover_page);
	  document.attachEvent('onmouseout',this.mouseout_page);
	  this.imgBlockObj.attachEvent('onmouseout',this.imgBlockout);
     }
   };
   this.mouseover_page = function(e){
	  var t;
	  if (e.target)
		 t = e.target
	  else
		 t = e.srcElement
	  if (t.nodeName == 'IMG'){
		 pos = fttaggerbookmarklet.nodeXY(t);
		 siz = fttaggerbookmarklet.nodeDim(t);
         if(siz.w>140 && siz.h>140){
            fttaggerbookmarklet.display_img_block(pos.y-8,pos.x-8,siz.w-5,siz.h-5,t);
         }
         else{
            var is_anchor_tag = false;
            var p1 = t.parentNode;
            if(p1.nodeName == 'A'){
               is_anchor_tag=true;
            }
            else{
               while(p1 != undefined && p1 != null && p1.nodeName != 'A'){
                  p1 = p1.parentNode
                  if(p1 != undefined && p1 != null && p1.nodeName == 'A'){
                     is_anchor_tag=true;				  
                  }
               }			
            }
            if (is_anchor_tag){
               var href = p1.getAttribute("href");
               if(href && href != "" && href != null){
                  p1.setAttribute('href_bak', href);
                  p1.removeAttribute('href');
               }
            }		             
         }
		 /*
		 var is_anchor_tag = false;
		 var p1 = t.parentNode;
		 if(p1.nodeName == 'A'){
			is_anchor_tag=true;
		 }
		 else{
			while(p1 != undefined && p1 != null && p1.nodeName != 'A'){
			   p1 = p1.parentNode
			   if(p1 != undefined && p1 != null && p1.nodeName == 'A'){
				  is_anchor_tag=true;				  
			   }
			}			
		 }
		 if (is_anchor_tag){
			var href = p1.getAttribute("href");
			if(href && href != "" && href != null){
			   p1.setAttribute('href_bak', href);
			   p1.removeAttribute('href');
			}
		 }
		 */
		 
		 return false; 
	  }
	  else if(t.nodeName == 'A'){
		 var href = t.getAttribute("href");
		 if(href && href != "" && href != null){
			t.setAttribute('href_bak', href);
			t.removeAttribute('href');			
		 }
		 return false;
		 
	  }
	  else{
		 var is_anchor_tag = false;
		 var p1 = t.parentNode;
		 if(p1.nodeName == 'A'){
			is_anchor_tag=true;
		 }
		 else{
			while(p1 != undefined && p1 != null && p1.nodeName != 'A'){
			   p1 = p1.parentNode
			   if(p1 != undefined && p1 != null && p1.nodeName == 'A'){
				  is_anchor_tag=true;				  
			   }
			}			
		 }
		 if (is_anchor_tag){
			var href = p1.getAttribute("href");
			if(href && href != "" && href != null){
			   p1.setAttribute('href_bak', href);
			   p1.removeAttribute('href');
			}
		 }		 
	  }
   };
   this.mouseout_page = function(e){
	  var t;
	  if (e.target)
		 t = e.target
	  else
		 t = e.srcElement
	  //if (t.nodeName == 'IMG'){
		 //fttaggerbookmarklet.hide_img_block();
		 /*
		 var is_anchor_tag = false;
		 var p1 = t.parentNode;
		 if(p1.nodeName == 'A'){
			is_anchor_tag=true;
		 }
		 else{
			while(p1 != undefined && p1 != null && p1.nodeName != 'A'){
			   p1 = p1.parentNode
			   if(p1 != undefined && p1 != null && p1.nodeName == 'A'){
				  is_anchor_tag=true;				  
			   }
			}			
		 }
		 if (is_anchor_tag){
			var href = p1.getAttribute("href_bak");
			if(href && href != "" && href != null){
	  		   p1.setAttribute('href', href);
			   p1.removeAttribute('href_bak');
			}
		 }
		 */

		 
	  //	 return false; 
	  //}
	  if (t.nodeName == 'A'){
		 var href = t.getAttribute("href_bak");
		 if(href && href != "" && href != null){
			t.setAttribute('href', href);
			t.removeAttribute('href_bak');
		 }		 
	  }
	  else{
		 var is_anchor_tag = false;
		 var p1 = t.parentNode;
		 if(p1.nodeName == 'A'){
			is_anchor_tag=true;
		 }
		 else{
			while(p1 != undefined && p1 != null && p1.nodeName != 'A'){
			   p1 = p1.parentNode
			   if(p1 != undefined && p1 != null && p1.nodeName == 'A'){
				  is_anchor_tag=true;				  
			   }
			}			
		 }
		 if (is_anchor_tag){
			var href = p1.getAttribute("href_bak");
			if(href && href != "" && href != null){
	  		   p1.setAttribute('href', href);
			   p1.removeAttribute('href_bak');
			}
		 }
		 
	  }
   };
   this.imgBlockout = function(e){
	  fttaggerbookmarklet.hide_img_block();
   };
   
   this.click_page = function(e){
	  var t;
	  if (e.target)
		 t = e.target
	  else
		 t = e.srcElement
	  if(t.id == fttaggerbookmarklet.imgBlockObj.id){
                 pick_id = qualifiedImages.indexOf(fttaggerbookmarklet.imgBlockObj.img.src);
		 var msg = {
			 target_url: fttaggerbookmarklet.imgBlockObj.img.src,
			 client_url: document.URL,
                         pick_id: pick_id,
			 close_iframe: false,
			 iframe_width: 400,
			 iframe_height: 90
			 };
		 fttaggerbookmarklet.add_iframe(msg);

		 
		 if(document.addEventListener){
                        //alert("document.addlistener");
			/*
                        document.removeEventListener('click',fttaggerbookmarklet.click_page,false);
			document.removeEventListener('mouseover',fttaggerbookmarklet.mouseover_page,false);
			document.removeEventListener('mouseout',fttaggerbookmarklet.mouseout_page,false);
                        */
		 }
		 else if (document.detachEvent){
                        //alert("document.detachevent");
			document.detachEvent("onclick", fttaggerbookmarklet.click_page)
			document.detachEvent('onmouseover',fttaggerbookmarklet.mouseover_page);
			document.detachEvent('onmouseout',fttaggerbookmarklet.mouseout_page);
		 }
		 
		 
	  }
	  /*if (t.nodeName == 'IMG'){
			 var msg = {
				 target_url: t.src,
				 client_url: document.URL,
				 close_iframe: false,
				 iframe_width: 400,
				 iframe_height: 90
				 };
		 fttaggerbookmarklet.add_iframe(msg);
	  }*/
   };
   this.display_img_block = function(top,left,width,height,img){
     /*var imgDivNode = document.getElementById(this.img_front_div_id);	
	 imgDivNode.id = this.img_front_div_id;
     imgDivNode.style.display='block';
     imgDivNode.style.border='3px solid green';
     imgDivNode.style.position='absolute';
     imgDivNode.style.top=top+'px';
     imgDivNode.style.left=left+'px';
     imgDivNode.style.width=width+'px';
     imgDivNode.style.height=height+'px';
     imgDivNode.setAttribute('style','display:block;border: 3px solid green;position: absolute;_position: absolute;z-index: 10000000;top:'+top+'px;left:'+left+'px;width:'+width+'px;height:'+height+'px;');
	 */
     this.imgBlockObj.style.display='block';
     //this.imgBlockObj.style.border='3px solid green';
     //this.imgBlockObj.style.position='absolute';
     this.imgBlockObj.style.top=top+'px';
     this.imgBlockObj.style.left=left+'px';
     this.imgBlockObj.style.width=width+'px';
     this.imgBlockObj.style.height=height+'px';
     //this.imgBlockObj.setAttribute('style','display:block;border: 3px solid green;position: absolute;_position: absolute;z-index: 10000000;top:'+top+'px;left:'+left+'px;width:'+width+'px;height:'+height+'px;');
     this.imgBlockObj.img = img;
   }
   this.hide_img_block = function(){
	  /*
     var imgDivNode = document.getElementById(this.img_front_div_id);	
	 imgDivNode.id = this.img_front_div_id;
     imgDivNode.style.display='none';
     imgDivNode.style.border='3px solid green';
     imgDivNode.style.position='absolute';
     imgDivNode.setAttribute('style','display:none;border: 3px solid green;position: absolute;_position: absolute;z-index: 10000000;');
	  */
	 //this.imgBlockObj.id = this.img_front_div_id;
     this.imgBlockObj.style.display='none';
     //this.imgBlockObj.style.border='3px solid green';
     //this.imgBlockObj.style.position='absolute';
     //this.imgBlockObj.setAttribute('style','display:none;border: 3px solid green;position: absolute;_position: absolute;z-index: 10000000;');
   }
   
   this.JSON2 = function () {
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

   this.scrollXY = function(tmp) {
	   if (!tmp) {
		   tmp = new this.Point(0, 0)
	   }
	   if (window.pageXOffset !== undefined) {
		   tmp.x = window.pageXOffset;
		   tmp.y = window.pageYOffset
	   } else {
		   if (document.documentElement) {
			   tmp.x = document.documentElement.scrollLeft;
			   tmp.y = document.documentElement.scrollTop
		   } else {
			   tmp.x = document.body.scrollLeft;
			   tmp.y = document.body.scrollTop
		   }
	   }
	   return tmp
   }
   this.setScroll = function(pos) {
	   var d = document.documentElement;
	   var b = document.body;
	   d.scrollLeft = b.scrollLeft = pos.x;
	   d.scrollTop = b.scrollTop = pos.y
   }
   this.Point = function(x, y) {
	   this.x = x;
	   this.y = y
   }

   this.nodeXY = function(node) {
	   if (node.getBoundingClientRect) {
		   var box = node.getBoundingClientRect();
		   var doc = document;
		   var left = box.left;
		   var top = box.top;
		   if (TFBrowser.isIE) {
			   left -= 2;
			   top -= 2
		   }
		   var scrollTop = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
		   var scrollLeft = Math.max(doc.documentElement.scrollLeft, doc.body.scrollLeft);
		   return new this.Point(left + scrollLeft, top + scrollTop)
	   } else {
		   var result = new this.Point(node.offsetLeft, node.offsetTop);
		   var parentNode = node.offsetParent;
		   var hasAbs = getStyle(node, "position") == "absolute";
		   if (parentNode != node) {
			   while (parentNode) {
				   result.x += parentNode.offsetLeft;
				   result.y += parentNode.offsetTop;
				   if (TFBrowser.isSafari && !hasAbs && getStyle(parentNode, "position") == "absolute") {
					   hasAbs = true
				   }
				   parentNode = parentNode.offsetParent
			   }
		   }
		   if (TFBrowser.isSafari && hasAbs) {
			   result.x -= document.body.offsetLeft;
			   result.y -= document.body.offsetTop
		   }
		   parentNode = node.parentNode;
		   while (parentNode && parentNode.tagName != "HTML" && parentNode.tagName != "BODY") {
			   if (getStyle(parentNode, "display") != "inline") {
				   result.x -= parentNode.scrollLeft;
				   result.y -= parentNode.scrollTop
			   }
			   parentNode = parentNode.parentNode
		   }
		   return result
	   }
   }
   
   this.nodeDim = function(node) {
	   return {
		   w: parseInt(node.offsetWidth, 10),
		   h: parseInt(node.offsetHeight, 10)
	   }
   }
   this.clean_listeners = function(){
	  if(document.addEventListener){
		 document.removeEventListener('keyup',fttaggerbookmarklet.keyPressHandler,false);
		 document.removeEventListener('click',fttaggerbookmarklet.click_page,false);
		 document.removeEventListener('mouseover',fttaggerbookmarklet.mouseover_page,false);
		 document.removeEventListener('mouseout',fttaggerbookmarklet.mouseout_page,false);
		 fttaggerbookmarklet.imgBlockObj.addEventListener('mouseout',fttaggerbookmarklet.imgBlockout,false);
   
	  }
	  else if (document.detachEvent){
		 document.detachEvent("onkeyup", fttaggerbookmarklet.keyPressHandler)
		 document.detachEvent("onclick", fttaggerbookmarklet.click_page)
		 document.detachEvent('onmouseover',fttaggerbookmarklet.mouseover_page);
		 document.detachEvent('onmouseout',fttaggerbookmarklet.mouseout_page);
		 fttaggerbookmarklet.imgBlockObj.detachEvent('onmouseout',fttaggerbookmarklet.imgBlockout);
	  }
	  if(this.check_hash != null)
		 this.check_hash.stop();
	  
   }

   this.tf_current_hash = false;
   this.tf_compare_hash = function (){
	   if(window.location.hash != this.tf_current_hash) {
		   this.tf_current_hash = window.location.hash;
			regexp = /^#(.*)tfbml-data|^#(.*)/
		   var data = this.tf_current_hash.replace(regexp,'');
		   var json_over_url = decodeURIComponent(data);
		   if (json_over_url != undefined && json_over_url.length >0){
                     //alert("host");
			json_over_url = eval("(" + json_over_url + ")");
                        
			if (json_over_url.iframe_height != undefined && json_over_url.iframe_width != undefined){
			   var if_node = document.getElementById(fttaggerbookmarklet.iframe_id);
                           //alert(json_over_url.iframe_width);
                           //alert(json_over_url.iframe_height);
   
			   if_node.style.border='1px solid #4c515c';
			   if_node.style.position='fixed';
			   if_node.style.top='10px'; 
			   if_node.style.right='10px'; 
			   if_node.style.zIndex='10000001';
			   if_node.style.margin='0';
			   if_node.style.background='#eff1f7';
			   if_node.style.width = json_over_url.iframe_width+"px";
			   if_node.style.height = json_over_url.iframe_height+"px";
			   if_node.setAttribute('style','width:'+json_over_url.iframe_width+'px;height:'+json_over_url.iframe_height+'px;border: 1px solid #4c515c;position: fixed;_position: fixed;top: 10px; right: 10px; z-index: 10000001;margin: 0;background-color: #eff1f7;');
                           
                           /*
                           if (json_over_url.turn_off_lasso != undefined && json_over_url.turn_off_lasso == true){
                              if(document.addEventListener){
                                 //alert("document.addlistener");
                                 document.removeEventListener('click',fttaggerbookmarklet.click_page,false);
                                 document.removeEventListener('mouseover',fttaggerbookmarklet.mouseover_page,false);
                                 document.removeEventListener('mouseout',fttaggerbookmarklet.mouseout_page,false);
                              }
                           }
                           */
   
			}
		   }
		   var orig = (window.location.href).split("#")[0] + "#";
		   var scroll = fttaggerbookmarklet.scrollXY();
		   try {
			   window.location.replace(orig)
		   } catch (e1) {
			   window.location = orig
		   }
		   fttaggerbookmarklet.setScroll(scroll)
			if (json_over_url.close_iframe != undefined && json_over_url.close_iframe==1){
			   var script_id="fazzle_tagger_bookmarklet_helper_js";
			   var s = document.getElementById(script_id);
			   if (s !=undefined && s != null){
				  var del_n = document.getElementById(script_id);
				  del_n.parentNode.removeChild(del_n);
			   }
			}
			if (json_over_url.close_iframe != undefined && json_over_url.close_iframe==1){
			   var del_node = document.getElementById(fttaggerbookmarklet.iframe_id);
			   del_node.parentNode.removeChild(del_node);
			   fttaggerbookmarklet.clean_listeners();
   
			}
			if (json_over_url.current_pick != undefined && json_over_url.current_pick>=0){
                           //alert("show me next");
                           if(json_over_url.direction_id != undefined && json_over_url.direction_id==0){
                              var next_pick = parseInt(json_over_url.current_pick) - 1;
                              if (next_pick < 0)
                              {
                                 next_pick = qualifiedImages.length -1;
                              }
                           }
                           else{
                              var next_pick = parseInt(json_over_url.current_pick) + 1;
                              if (next_pick>qualifiedImages.length -1){
                                 next_pick = 0
                              }
                           }
                           //alert("i am " + next_pick);
                           if(next_pick>=0 && next_pick < qualifiedImages.length){
                              //alert("sending_message");
                              var msg = {
                                       client_url: document.URL,
                                       user_key: this.fazzle_user_key,
                                       target_url: qualifiedImages[next_pick],
                                       pick_id: next_pick,
                                       close_iframe: false,
                                       iframe_width: 400,
                                       iframe_height: 90,
                                       title:title_v
                                       };
                              fttaggerbookmarklet.add_iframe(msg);//this.iframe_url+"#"+json_over_url);
                           }
			}
	   }   
   }
   



   this.add_iframe = function(msg){
	 if (!this.IFrameObj && document.createElement) {
		 var tempIFrame=document.createElement('iframe');
		 tempIFrame.setAttribute('id',this.iframe_id);
		 tempIFrame.id = this.iframe_id;
	
         tempIFrame.style.border='1px solid #4c515c';
         tempIFrame.style.position='fixed';
         tempIFrame.style.top='10px'; 
         tempIFrame.style.right='10px'; 
         tempIFrame.style.zIndex='10000001';
         tempIFrame.style.margin='0';
         tempIFrame.style.background='#EFF1F7';
         tempIFrame.style.width = "279px";
         tempIFrame.style.height = "372px";
         tempIFrame.setAttribute('allowtransparency',true);
         tempIFrame.setAttribute('style','width:279px;height:372px;border: 1px solid #4c515c;position: fixed;_position: fixed;top: 10px; right: 10px; z-index: 10000001;margin: 0;background-color: #eff1f7;');
         
		 var firstC = document.body.firstChild;
		 this.IFrameObj = document.body.insertBefore(tempIFrame, firstC)
		 //this.IFrameObj = document.body.appendChild(tempIFrame);
		 if (document.frames) {
			// this is for IE5 Mac, because it will only
			// allow access to the document object
			// of the IFrame if we access it through
			// the document.frames array
			this.IFrameObj = document.frames[this.iframe_id];
		 }
	  }
	  else{
	  }
	  var IFrameDoc;
	  if(document.createElement){
                 if (this.IFrameObj.contentWindow) {
		   // For IE5.5 and IE6
		   IFrameDoc = this.IFrameObj.contentWindow;
		 }else{
			IFrameDoc = this.IFrameObj;
		 }
		 /*} else if (this.IFrameObj.document) {
		   // For IE5
		   IFrameDoc = this.IFrameObj.document;
		 }
		 else if (this.IFrameObj.contentDocument) {
		   // For NS6
		   IFrameDoc = this.IFrameObj.contentDocument;
		 }
		 else{
	  		 IFrameDoc = this.IFrameObj.contentWindow;
		 }*/
		 var json_over_url = encodeURIComponent(fttaggerbookmarklet.JSON2.stringify(msg));
		 var url = fttaggerbookmarklet.iframe_url+"#tfbml-data"+json_over_url;
		 IFrameDoc.location.replace(url);
                 //alert(url);
	 }
   
   };
   
}

var TFBrowserDetect = {
	init: function () {
		this.browserInfo = this.searchInfo(this.dataBrowser) || null;
		this.browser = this.browserInfo ? this.browserInfo.identity : "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent, this.browserInfo) || this.searchVersion(navigator.appVersion, this.browserInfo) || "an unknown version";
		this.OSInfo = this.searchInfo(this.dataOS) || null;
		this.OS = this.OSInfo ? this.OSInfo.identity : "an unknown OS";
		this.layoutEngineInfo = this.searchInfo(this.dataLayoutEngine) || null;
		this.layoutEngine = this.layoutEngineInfo ? this.layoutEngineInfo.identity : "an unknown layout engine";
		this.layoutEngineVersion = this.searchVersion(navigator.userAgent, this.layoutEngineInfo) || this.searchVersion(navigator.appVersion) || "an unknown layout engine version"
	},
	searchInfo: function (data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1) {
					return data[i]
				}
			} else {
				if (dataProp) {
					return data[i]
				}
			}
		}
		return false
	},
	searchVersion: function (dataString, browserInfo) {
		var versionSearchString = browserInfo ? browserInfo.versionSearch || browserInfo.identity : "";
		var index = dataString.indexOf(versionSearchString);
		if (index == -1) {
			return false
		}
		return parseFloat(dataString.substring(index + versionSearchString.length + 1))
	},
	dataBrowser: [{
		string: navigator.userAgent,
		subString: "MSIE",
		identity: "IE",
		versionSearch: "MSIE",
		upgradeURL: "http://www.microsoft.com/windows/Internet-explorer/default.aspx"
	},
	{
		string: navigator.userAgent,
		subString: "Firefox",
		identity: "Firefox",
		upgradeURL: "http://www.getfirefox.com"
	},
	{
		string: navigator.vendor,
		subString: "Apple",
		identity: "Safari",
		upgradeURL: "http://www.apple.com/safari/download/"
	},
	{
		string: navigator.userAgent,
		subString: "Chrome",
		identity: "Chrome",
		upgradeURL: "http://www.google.com/chrome"
	},
	{
		prop: window.opera,
		identity: "Opera"
	},
	{
		string: navigator.userAgent,
		subString: "Netscape",
		identity: "Netscape"
	},
	{
		string: navigator.userAgent,
		subString: "Gecko",
		identity: "Mozilla",
		versionSearch: "rv"
	},
	{
		string: navigator.userAgent,
		subString: "Mozilla",
		identity: "Netscape",
		versionSearch: "Mozilla"
	},
	{
		string: navigator.vendor,
		subString: "Camino",
		identity: "Camino"
	},
	{
		string: navigator.userAgent,
		subString: "OmniWeb",
		versionSearch: "OmniWeb/",
		identity: "OmniWeb"
	},
	{
		string: navigator.vendor,
		subString: "iCab",
		identity: "iCab"
	},
	{
		string: navigator.vendor,
		subString: "KDE",
		identity: "Konqueror"
	}],
	dataOS: [{
		string: navigator.platform,
		subString: "Win",
		identity: "Windows"
	},
	{
		string: navigator.platform,
		subString: "iPad",
		identity: "iPad"
	},
	{
		string: navigator.platform,
		subString: "Mac",
		identity: "Mac"
	},
	{
		string: navigator.platform,
		subString: "Linux",
		identity: "Linux"
	}],
	dataLayoutEngine: [{
		string: navigator.userAgent,
		subString: "AppleWebKit",
		identity: "WebKit"
	},
	{
		string: navigator.userAgent,
		subString: "Gecko",
		identity: "Gecko",
		versionSearch: "rv"
	},
	{
		string: navigator.userAgent,
		subString: "Presto",
		identity: "Presto"
	}]
};
TFBrowserDetect.init();

var TFBrowser = function () {
	return {
		isIE: "IE" == TFBrowserDetect.browser,
		isSafari: "Safari" == TFBrowserDetect.browser,
		isOpera: "Opera" == TFBrowserDetect.browser,
		isMac: "Mac" == TFBrowserDetect.OS,
		isIPad: "iPad" == TFBrowserDetect.OS,
		isWindows: "Windows" == TFBrowserDetect.OS,
		isFirefox: "Firefox" == TFBrowserDetect.browser,
		isMozilla: "Mozilla" == TFBrowserDetect.browser,
		type: function (t, minV, maxV) {
			return t == TFBrowserDetect.browser && (!minV || minV <= TFBrowserDetect.version) && (!maxV || maxV >= TFBrowserDetect.version)
		},
		layoutEngine: function (t, minV, maxV) {
			return t == TFBrowserDetect.layoutEngine && (!minV || minV <= TFBrowserDetect.layoutEngineVersion) && (!maxV || maxV >= TFBrowserDetect.layoutEngineVersion)
		}
	}
}();


String.prototype.tf_trim_str = function() {
  return this.replace(/^\s+|\s+$/g,"");
};

if (document.URL.indexOf(".fazzle.me") == -1){
   fttaggerbookmarklet = new fazzle_tagger_bookmarklet();
   fttaggerbookmarklet.runthis();
}
else
{
   window.alert("Fazzle bookmarklet now installed. You can now add things to your Fazzle catalog from other sites around the web. Go give it a try!");
}


function tf_tf_y(f) {
   var v = f;
    this.start = function () {
        var self = this;
        this.interval = setInterval(v, 100);
    };

  this.run = function () {
  };

  this.stop = function () {
      clearInterval(this.interval);
      //alert("host interval stopped")
  };
}
if (document.URL.indexOf(".fazzle.me") == -1){
   window.fazzle_bookmarklet = {};
   window.fazzle_bookmarklet.tagger = fttaggerbookmarklet;
}

})();
