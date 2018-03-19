/**
*   This file helps populate the content on the page "studySession",
*   The "studySession" page is used to display information about
*   specific scheduled study sessions to the user.
**/
Template.studySession.helpers({

  // Displays the descripton of the activity:
  description: function(){
    // Find this particular study session
    var studySessionId = FlowRouter.getParam('_id');
    const studySessionObj = CalEvents.findOne({_id:studySessionId});

    // The study session always holds the id to the activity description:
    const activityObj = Activities.findOne({_id:studySessionObj.htmlDescriptionId});
    return activityObj.desc; // Returns the HTML code for this activity description.
  },

  // Displays the descripton of the activity:
  title: function() {
    // Find this particular study session
    var studySessionId = FlowRouter.getParam('_id');
    const studySessionObj = CalEvents.findOne({_id:studySessionId});
    return studySessionObj.title;
  },


});
