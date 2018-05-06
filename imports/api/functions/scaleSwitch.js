/**
*   Scales out an element, and scales in another.
*   @param hideElem is the element that should be scaled out.
*   @param showElem is the element that should be scaled in.
**/
export function scaleSwitch(hideElem, showElem) {
  $(hideElem).addClass("scale-out");
  setTimeout(function(){
    $(hideElem).addClass("hidden");
  },200)
  setTimeout(function(){
    $(showElem).removeClass("scale-out");
  }, 300);
}
