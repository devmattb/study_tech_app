export function editKeyword(hashCodeVal, keyVal, keyDesc) {
  // Get the current "keywords" json object.
  var keywords = Session.get("keywords");
  // Add to the current "keywords" json object.

  var cellNumber = 0;
  jQuery.each(keywords["keywords"], function(i, val) {
    if ( keywords["keywords"][i].hashCode === hashCodeVal ) {
      cellNumber = i;
    }
  });


  keywords["keywords"][cellNumber] = {
    hashCode: hashCodeVal,
    keywordValue: keyVal,
    keywordDescription: keyDesc,
  }
  // Save the new "keywords" json object in the session variable.
  Session.set("keywords", keywords);
}
