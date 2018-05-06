// TODO: BUG WHEN NOT FILLING IN LAST QUESTION. USER IS ABLE TO PROCEED EVEN THOUGH FIELD IS EMPTY...

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

export function submitFeedback(event, templateName, numParams, doubleQuestion) {

  event.preventDefault();
  var answer = $("#question").val();
  var answer2;

  var doc = {
    'connectedUserId': Meteor.userId(),
    'feedbackTemplateName': templateName,
    'answer': answer
  }

  // Record double answers.
  if (doubleQuestion) {
    answer2 = $("#question2").val();
    doc.answer2 = answer2;
  }

  // Getting information of interest before feedback submission.
  var studySessionId = FlowRouter.getParam('_id');
  const studySessionObj = StudySession.findOne({_id:studySessionId});
  const StudyChainObj = StudyChain.findOne({_id:studySessionObj.connectedStudyChainId});
  const activityObj = ActivityDescription.findOne({_id:studySessionObj.htmlDescriptionId});

  // Add fields to our document if the data we want is more
  // specified than just an answer.
  if (numParams == 2 ) {
    doc.courseName = StudyChainObj.courseName;
  } else if (numParams == 3 ) {
    doc.courseName = StudyChainObj.courseName;
    doc.activityName = activityObj.name;
  }

  // Make sure the user has answered all questions before proceeding.
  if ((answer && !doubleQuestion) || (answer && answer2)) {

    Meteor.call("FeedbackAnswer.insert", doc);
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
