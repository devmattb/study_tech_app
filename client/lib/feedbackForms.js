/**
*   Frequently Used Functions
**/

// Exits Session State:
function exit(){

  Session.set("ended", false);
  Session.set("paused", false);
  Session.set("cyclesDone", 0);
  Session.set("feedbackStep", 1); // reset step too.
  FlowRouter.go("home");
  // TODO: Destroy Study Session?
  // TODO: Notify parents that student studied?
  // TODO: etc..

}

function submitFeedback(event, templateName, numParams, doubleQuestion) {

  event.preventDefault();
  var answer = $("#question").val();
  var answer2;

  var doc = {
    'feedbackTemplateName': templateName,
    'answer': answer
  }

  // Record double answers.
  if (doubleQuestion) {
    answer2 = $("#question2").val();
    doc.answer2 = answer2;
  }

  // TODO OPTIMIZE: This sequence happens in this document and a lot in studySession.js
  var studySessionId = FlowRouter.getParam('_id');
  const studySessionObj = CalEvents.findOne({_id:studySessionId});
  const studyChainObj = StudyChains.findOne({_id:studySessionObj.connectedStudyChainId});
  const activityObj = Activities.findOne({_id:studySessionObj.htmlDescriptionId});
  // Add fields to our document if the data we want is more
  // specified than just an answer.
  if (numParams == 2 ) {
    doc.courseName = studyChainObj.courseName;
  } else if (numParams == 3 ) {
    doc.courseName = studyChainObj.courseName;
    doc.activityName = activityObj.name;
  }

  // Make sure the user has answered all questions before proceeding.
  if ((answer && !doubleQuestion) || (answer && answer2)) {

    FeedbackAnswers.insert(
      doc,
      function(error, doc_id) {
        if ( error ) {
          console.log ( error ); //info about what went wrong
          return; // Stop exec
        }
    });
    // Feedback recorded!
    // Check if we got more questions to get answers too.
    var step = Session.get("feedbackStep");
    if (step == 1) {

      // Hide this question:
      $("#feedbackQuestion1").addClass("scale-out");
      setTimeout(function(){
        $("#feedbackQuestion1").addClass("hidden");
        // Go to next feedback step:
        $("#feedbackQuestion2").removeClass("hidden");
        Session.set("feedbackStep", step+1);
      },300);

      // Show next question:
      setTimeout(function(){
        $("#feedbackQuestion2").removeClass("scale-out");
      },400);

    } else {
      // Exit study session!
      exit();
    }
  } else {
    // User failed to answer all questions.
    Materialize.toast('Svara på frågan för att gå vidare!', 4000, "red");
  }

}

/**
*   Feedback forms select init.
*   (Without this <select>'s won't work.)
**/
Template.funniness.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});

Template.learningQuality.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});

Template.amountOfSessions.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});

Template.pauses.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});

Template.tooLong.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});


/**
*   Form Submission Handling
**/
Template.funniness.events({
  "submit #funniness": function(e){
    // 3 Params: Answer, activityName, CourseName.
    // Not a double question.
    submitFeedback(e, "funniness", 3, false);
  },
});

Template.learningQuality.events({
  "submit #learningQuality": function(e){
    // 3 Params: Answer, activityName, CourseName.
    // Not a double question.
    submitFeedback(e, "funniness", 3, false);
  },
});

Template.amountOfSessions.events({
  "submit #amountOfSessions": function(e){
    // 2 Params: Answer, CourseName.
    // Not a double question.
    submitFeedback(e, "funniness", 2, false);
  },
});

Template.pauses.events({
  "submit #pauses": function(e){
    // 1 Param: Answer.
    // Not a double question.
    submitFeedback(e, "funniness", 1, false);
  },
});

Template.tooLong.events({
  "submit #tooLong": function(e){
    const tooLong = $("#question").val();
    // It's only a double question if they answered "yes".
    if (tooLong === "true") {
      // 3 Params: Answer, activityName, CourseName.
      // Double Question!
      submitFeedback(e, "funniness", 3, true);
    } else {
      // 3 Params: Answer, activityName, CourseName.
      // Not a double question.
      submitFeedback(e, "funniness", 3, false);
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

// Sets a global template variable:
Template.registerHelper( 'btnText', ( ) => {
  var step = Session.get("feedbackStep");
  if ( step == 1 ) {
    return "Nästa";
  } else {
    return "Avsluta Session"
  }
});
