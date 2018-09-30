export function addKeyword(hashCodeVal, keyVal, keyDesc) {
  // Get the current "keywords" json object.
  var keywords = Session.get("keywords");
  // Add to the current "keywords" json object.
  Session.set("numKeywords", Session.get("numKeywords")+1);
  keywords["keywords"][Session.get("numKeywords")] = {
    hashCode: hashCodeVal,
    keywordValue: keyVal,
    keywordDescription: keyDesc,
  }
  // Save the new "keywords" json object in the session variable.
  Session.set("keywords", keywords);
}
