export function removeKeyword(index) {

  // Animate deletion:
  // $(".keywordContainer[data-index="+index+"]").addClass("scale-out");

  // Delay the actual delete 300ms (let animation run):
  window.setTimeout(function(){
    // Get the current "keywords" json object.
    var keywords = Session.get("keywords");

    // Create a new keywords object, that replaces the old one.
    var newKeywords = {"keys":[]};
    // Copy all cells, but the cell that the user wants to delete.
    var cellno = 0;
    jQuery.each(keywords["keys"], function(i, val) {
      if ( keywords["keys"][i].index != index ) {
        newKeywords["keys"][cellno] = keywords["keys"][i];
        cellno++;
      }
    });


    // If user deleted the latest keyword cell, decrement currentIndex. Otherwise, don't.
    if (index == Session.get("numKeywords")) {
      Session.set("currentIndex", Session.get("currentIndex")-1);
    }
    console.log(newKeywords);
    // We have now removed one keyword.
    Session.set("numKeywords", Session.get("numKeywords")-1);
    // Save the new "keywords" json object in the session variable.
    Session.set("keywords", newKeywords);
  }, 300);
}
