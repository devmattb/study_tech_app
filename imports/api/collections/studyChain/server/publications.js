Meteor.publish('studyChain', function() {
  // TODO/OPTIMIZE: Add userId ONLY in studyChain and not in studySession too.
  return StudyChain.find({connectedUserId:this.userId});
});
