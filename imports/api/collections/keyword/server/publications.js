Meteor.publish('keyword', function() {
  // TODO/OPTIMIZE: Add userId ONLY in studyChain and not in studySession too.
  return Keyword.find();
});
