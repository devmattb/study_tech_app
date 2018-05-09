import "./tooLong.html";

import {submitFeedback} from "../../../../api/functions/feedbackFunctions";

Template.tooLong.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});


/**
*   Form Submission Handling
**/

Template.tooLong.events({
  "submit #tooLong": function(e){
    const tooLong = $("#question").val();
    // It's only a double question if they answered "yes".
    if (tooLong === "true") {
      // 3 Params: Answer, activityName, CourseName.
      // Double Question!
      submitFeedback(e, "tooLong", 3, true);
    } else {
      // 3 Params: Answer, activityName, CourseName.
      // Not a double question.
      submitFeedback(e, "tooLong", 3, false);
    }
  },
  /**
  *   Dynamic display(s) of double-questions:
  **/
  "change #question": function(e){
    const val = $("#question").val();
    if (val === "true") {
      // Show next part of form:
      $("#q2Div").removeClass("hidden");
    } else {
      // Hide next part of form:
      $("#q2Div").addClass("hidden");
    }
  },
});
