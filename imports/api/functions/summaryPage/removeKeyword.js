export function removeKeyword(index) {

  // Animate deletion:
  $(".keywordContainer[data-index="+index+"]" ).addClass("scale-out");

  // Delay the actual delete 300ms (let animation run):
  window.setTimeout(function(){
    // Get the current "keywords" json object.
    var keywords = Session.get("keywords");

    // Create a new keywords object, that replaces the old one.
    var newKeywords = {"keys":[]};
    for (var i = 0; i <= Session.get("numKeywords"); i++) {
      if (i < index) {
        // We want to keep this cell. Copy it!
        newKeywords["keys"][i] = keywords["keys"][i];
      } else if (i > index) {
        // Skip cell no. "index"
        newKeywords["keys"][i-1] = keywords["keys"][i];
      }
    }

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
