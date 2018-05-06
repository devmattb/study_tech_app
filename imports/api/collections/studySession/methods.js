import {Meteor} from "meteor/meteor"
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
  *  Inserts in to the StudySession collection with a chained upsert.
  *  @param doc is a JSON object with the parameters that wish to be updated.
  *  @param studyChainId is the connected studychain id to this studysession.
  **/
  "StudySession.insert": function(doc) {
    StudySession.insert(
      doc,
      function(error, doc_id) {
        if ( error ) {
          console.log(descIdArray[i]);
          console.log ( error ); //info about what went wrong
          Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
          return; // Stop exec
        } else {
          // Everything went smoothly...
          /**
          *   UPDATE
          *   1. The studysession url with its id.
          *   2. The studychain id to the connected studychain.
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
