Meteor.publish('activityDescription', function activityDescriptionPublication() {
  return ActivityDescription.find();
});
