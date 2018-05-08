import './routes.js';
import './useraccounts-configuration.js';

// Import all collections:
import "../../api/collections/activityDescription/activityDescription.js"
import "../../api/collections/feedbackAnswer/feedbackAnswer.js"
import "../../api/collections/feedbackQuestion/feedbackQuestion.js"
import "../../api/collections/studyChain/studyChain.js"
import "../../api/collections/studySession/studySession.js"

// Sets a global template variable for feedback questions:
Template.registerHelper( 'btnText', ( ) => {
  var step = Session.get("feedbackStep");
  if ( step == 1 ) {
    return "Nästa";
  } else {
    return "Avsluta Session"
  }
});

// All
