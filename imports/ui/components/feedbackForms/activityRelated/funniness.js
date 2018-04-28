import "./funniness.html";

import {submitFeedback} from "../../../../api/feedbackFunctions";

Template.funniness.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});
Template.funniness.events({
  "submit #funniness": function(e){
    // 3 Params: Answer, activityName, CourseName.
    // Not a double question.
    submitFeedback(e, "funniness", 3, false);
  },
});
