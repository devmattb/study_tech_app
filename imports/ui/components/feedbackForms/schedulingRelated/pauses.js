import './pauses.html';

import {submitFeedback} from "../../../../api/functions/feedbackFunctions";

Template.pauses.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});
Template.pauses.events({
  "submit #pauses": function(e){
    // 1 Param: Answer.
    // Not a double question.
    submitFeedback(e, "pauses", 1, false);
  },
});
