import './amountOfSessions.html';

import {submitFeedback} from "../../../../api/functions/feedbackFunctions";

Template.amountOfSessions.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});
Template.amountOfSessions.events({
  "submit #amountOfSessions": function(e){
    // 2 Params: Answer, CourseName.
    // Not a double question.
    submitFeedback(e, "amountOfSessions", 2, false);
  },
});
