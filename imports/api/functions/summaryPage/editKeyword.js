export function editKeyword(indexVal, keyVal, keyDesc) {
  // Get the current "keywords" json object.
  var keywords = Session.get("keywords");
  indexVal = parseInt(indexVal); // Make sure index is a number.
  // Add to the current "keywords" json object.
  keywords["keys"][indexVal] = {
    index: indexVal,
    keywordValue: keyVal,
    keywordDescription: keyDesc,
  }
  // Save the new "keywords" json object in the session variable.
  Session.set("keywords", keywords);
}
