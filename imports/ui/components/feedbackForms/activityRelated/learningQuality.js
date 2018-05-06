import "./learningQuality.html";

import {submitFeedback} from "../../../../api/functions/feedbackFunctions";

Template.learningQuality.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});
Template.learningQuality.events({
  "submit #learningQuality": function(e){
    // 3 Params: Answer, activityName, CourseName.
    // Not a double question.
    submitFeedback(e, "funniness", 3, false);
  },
});
