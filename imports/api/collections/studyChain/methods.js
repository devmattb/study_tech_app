import {Meteor} from "meteor/meteor";
import {sharedVariables} from "../sharedVariables"

Meteor.methods({

  // Inserts a document in to the studyChain collection.
  "StudyChain.insert": function(doc) {
    StudyChain.insert(
      doc,
      function(error, studyChain_id) {
        if ( error ) {
          console.log ( error ); //info about what went wrong
          Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
          return; // Stop exec
        } else {
          // Everything went smoothly...
          // Make note of the StudyChain id, that is to be inserted
          // in all the studysessions.
          studyChainId = studyChain_id;
        }
      }
    );
  },

});
