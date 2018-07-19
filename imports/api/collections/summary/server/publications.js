Meteor.publish('summary', function() {
  // TODO/OPTIMIZE: Add userId ONLY in studyChain and not in studySession too.
  return Summary.find();
});
