/**
*   This file helps populate the content on the page "studySession",
*   The "studySession" page is used to display information about
*   specific scheduled study sessions to the user.
**/

Template.studySession.onCreated(function(){

    // Declaring variables that we want to show to the user:
    this.description = new ReactiveVar("Ett problem uppstod när vi försökte hämta dina studieinstruktioner från databasen.");
    this.title = new ReactiveVar("ERROR:");

    /**
    *   Fetch details from database:
    **/

    // Used to get this study session's details from the database.
    var studySessionId = FlowRouter.getParam('_id');

    const studySessionObj = CalEvents.findOne({_id:studySessionId});

    this.description.set(studySessionObj.htmlDescription);
    this.title.set(studySessionObj.title);

});


Template.studySession.helpers({

  // Displays the descripton of the activity:
  description: function(){
    return Template.instance().description.get();
  },

  // Displays the descripton of the activity:
  title: function(){
    return Template.instance().title.get();
  },

});
