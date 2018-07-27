export function addKeyword(indexVal, keyVal, keyDesc) {
  // Get the current "keywords" json object.
  var keywords = Session.get("keywords");
  // Add to the current "keywords" json object.
  Session.set("numKeywords", Session.get("numKeywords")+1);
  Session.set("currentIndex", Session.get("currentIndex")+1);
  keywords["keys"][indexVal] = {
    index: indexVal,
    keywordValue: keyVal,
    keywordDescription: keyDesc,
  }
  // Save the new "keywords" json object in the session variable.
  Session.set("keywords", keywords);
}
