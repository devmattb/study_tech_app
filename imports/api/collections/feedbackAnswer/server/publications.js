// Only publish the users own answers. (Use their answers to enhance their experience).
Meteor.publish('feedbackAnswer', function feedbackAnswerPublication() {
  return FeedbackAnswer.find();
});
