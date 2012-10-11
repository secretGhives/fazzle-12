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
        alert("Show some menu");
    }
    else if(visible==true){
        visible = false;
        alert("Hide that menu");
    }
    return false;
  }
}



////////////////////////////////////////////////////////////////////////////////
// ON DOM READY
////////////////////////////////////////////////////////////////////////////////
$(function() {





});


////////////////////////////////////////////////////////////////////////////////
// ON WINDOW LOADED
////////////////////////////////////////////////////////////////////////////////
$(window).load(function() {

  // attach tooltips
  $('[rel=tip]').tooltip();

  // Like button events
  $(".like").toggle(
    function(){
      $(this).parent().addClass("active").attr("data-original-title", "Dislike it");
      $(this).parent().parent().parent().addClass("liked");
      $('#modal-shelves').modal('show');
      $('<a href="#" class="btn like-edit" rel="tip" title="Edit">S</a>').click(function(e) {
        e.preventDefault();
        $('#modal-shelves').modal('show');
      }).insertAfter( $(this) );
    }, 
    function(){
      $(this).parent().removeClass("active").attr("data-original-title", "Like it");
      $(this).parent().parent().parent().removeClass("liked");
      $(this).next('.like-edit').remove();
    }
  );

  // activate dropdown-menu plugin
  $(".chzn-select").chosen();

});