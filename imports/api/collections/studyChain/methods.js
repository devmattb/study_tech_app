import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {sharedVariables} from "../sharedVariables"

Meteor.methods({

  /**
  *  Inserts a document "doc" in to the "studyChain" collection.
  *
  *  @param doc is a JSON object we wish to be inserted.
  **/
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
