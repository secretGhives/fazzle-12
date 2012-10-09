function getEmbed(){
   var e = window.frames["fazzle_bookmarklet_iframe"];
   return e;
}

function addCSS(url){
  var headID = document.getElementsByTagName("head")[0];
  var cssNode = document.createElement('link');
  cssNode.type = 'text/css';
  cssNode.rel = 'stylesheet';
  cssNode.href = url;
  cssNode.media = 'screen';
  headID.appendChild(cssNode);
}


(function(){

 
  var iframe_url = "//fazzle.kuzya.com/assets/libs/bookmarklet/bookmark.html";
  var existing_iframe = document.getElementById('fazzle_bookmarklet_iframe');
    
  addCSS("//fazzle.kuzya.com/assets/libs/bookmarklet/bookmark.css");
 
  var div = document.createElement("div");
  div.id = "fazzle-bookmarklet";
  
  var str = "";
  str += "<iframe frameborder='0' scrolling='no' name='fazzle_bookmarklet_iframe' id='fazzle_bookmarklet_iframe' src='" + iframe_url + "' width='333px' height='100%''></iframe>";
  
  div.innerHTML = str;
  
  document.body.appendChild(div, document.body);


  $("img").addClass("fazzled");
	$("body").on("click", "img.fazzled", function(e) {

		e.preventDefault();

		var thisLink=$(this).attr('src');
		var thisTitle= $(this).attr('alt') || $(this).attr('title') || "Enter title..";
		$('#bookmark-image-wrap', fazzle_bookmarklet_iframe.document.body).html("<img id='bookmark-image' src='"+thisLink+"' style='margin:0;padding:0;border:0;max-width:100%;'>");
		$('#bookmark-image-title', fazzle_bookmarklet_iframe.document.body).html(thisTitle);
		$('#bookmark-image-url', fazzle_bookmarklet_iframe.document.body).html(thisLink);

	});


})()
