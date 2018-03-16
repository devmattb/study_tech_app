/**
*   This file helps populate the content on the page "studySession",
*   The "studySession" page is used to display information about
*   specific scheduled study sessions to the user.
**/
Template.studySession.helpers({

  // Displays the descripton of the activity:
  description: function(){
    var studySessionId = FlowRouter.getParam('_id');
    const studySessionObj = CalEvents.findOne({_id:studySessionId});
    return studySessionObj.htmlDescription;
  },

  // Displays the descripton of the activity:
  title: function(){
    var studySessionId = FlowRouter.getParam('_id');
    const studySessionObj = CalEvents.findOne({_id:studySessionId});
    return studySessionObj.title;
  },


});
