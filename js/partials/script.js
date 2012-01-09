var visible = false;
document.onkeydown = console_slide;
var Tilde = 192, Esc = 27;
function console_slide(evt){
  if (!evt) {
    evt = window.event;
  }
  if (evt.keyCode === Esc || evt.keyCode === Tilde) {// Esc
    if(visible==false){
        visible = true;
        $('#console').animate({
            top: 0
        });
    }
    else if(visible==true){
        visible = false;
        $('#console').animate({
            top: -350
        });
    }
    return false;
  }
}


////////////////////////////////////////////////////////////////////////////////
// ON DOM READY
////////////////////////////////////////////////////////////////////////////////
(function ($) {


	
})();