import './routes.js';
import './useraccounts-configuration.js';


// Sets a global template variable for feedback questions:
Template.registerHelper( 'btnText', ( ) => {
  var step = Session.get("feedbackStep");
  if ( step == 1 ) {
    return "Nästa";
  } else {
    return "Avsluta Session"
  }
});
