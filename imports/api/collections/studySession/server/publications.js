Meteor.publish('studySession', function() {
  // TODO/OPTIMIZE: Add userId ONLY in studyChain and not in studySession too.
  return StudySession.find({connectedUserId:this.userId});
});
