import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {sharedVariables} from "../sharedVariables"

Meteor.methods({

  /**
  *   Gets the current studyChainId
  **/
  'getStudyChainId': function (){
    return studyChainId;
  },

  /**
  *  Updates the studySession collection.
  *
  *  @param id is the id of the JSON object that is to be updated.
  *  @param doc is a JSON object with the parameters that wish to be updated.
  **/
  "StudySession.upsert": function( id, doc ) {
   StudySession.upsert({_id: id}, {$set:doc},
    function(err, res) { // Handle errors
      if(err) {
        console.log("ERROR in UPSERT: " + err);
        Materialize.toast('Något gick fel!', 4000, "red");
      }
    }
   );
  },

  /**
  *  Inserts in to the "studySession" collection (with a chained upsert!).
  *
  *  @param doc is a JSON object we wish to be inserted.
  *  @param studyChainId is the connected studyChain id to this studySession.
  **/
  "StudySession.insert": function(doc) {
    StudySession.insert(
      doc,
      function(error, doc_id) {
        if ( error ) {
          console.log ( error ); //info about what went wrong
          return; // Stop exec
        } else {
          // Everything went smoothly...
          /**
          *   UPDATE
          *   1. The studySession url with its id.
          *   2. The studyChain id to the connected studyChain.
          *   This makes each study session uniquely clickable with dynamic info.
          **/
          doc.url = Meteor.absoluteUrl("studySession/"+doc_id, {}); // Update doc with new unique url
          doc.connectedStudyChainId = Meteor.call("getStudyChainId"); // Update to connected studychain id.
          Meteor.call("StudySession.upsert", doc_id, doc);
        }
      }
    );
  },

});
