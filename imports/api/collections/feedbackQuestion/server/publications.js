Meteor.publish('feedbackQuestion', function() {
  // Publish All Questions.
  return FeedbackQuestion.find();
});
