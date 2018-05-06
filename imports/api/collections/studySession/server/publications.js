Meteor.publish('studySession', function studySessionPublication() {
  // TODO/OPTIMIZE: Add userId ONLY in studyChain and not in studySession too.
  return StudySession.find({connectedUserId:Meteor.userId()});
});
