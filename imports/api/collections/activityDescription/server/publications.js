Meteor.publish('activityDescription', function() {
  return ActivityDescription.find();
});
