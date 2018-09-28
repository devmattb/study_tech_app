Meteor.publish('keywords2', function() {
  // Publish All Questions.
  return Keywords2.find();
});
