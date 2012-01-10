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
            bottom: 0
        });
    }
    else if(visible==true){
        visible = false;
        $('#console').animate({
            bottom: -350
        });
    }
    return false;
  }
}



////////////////////////////////////////////////////////////////////////////////
// ON DOM READY
////////////////////////////////////////////////////////////////////////////////
