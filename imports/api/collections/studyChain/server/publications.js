Meteor.publish('studyChain', function studyChainPublication() {
  // TODO/OPTIMIZE: Add userId ONLY in studyChain and not in studySession too.
  return StudyChain.find({connectedUserId:Meteor.userId()});
});
