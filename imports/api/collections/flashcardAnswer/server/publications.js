Meteor.publish('flashcardAnswer', function() {
  // TODO/OPTIMIZE: Add userId ONLY in studyChain and not in studySession too.
  return FlashcardAnswer.find();
});
