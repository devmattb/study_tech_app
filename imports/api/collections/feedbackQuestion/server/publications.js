Meteor.publish('feedbackQuestion', function feedbackQuestionPublication() {
  // Publish All Questions.
  return FeedbackQuestion.find();
});
