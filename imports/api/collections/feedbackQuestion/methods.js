import {Meteor} from "meteor/meteor";

Meteor.methods({

  // Inserts a document in to the feedbackQuestion collection.
  "FeedbackQuestion.insert": function(doc) {
    StudyChain.insert(
      doc,
      function(error, studyChain_id) {
        if ( error ) {
          console.log ( error ); //info about what went wrong
          Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
          return; // Stop exec
        }
      }
    );
  },

});
