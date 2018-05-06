import {Meteor} from "meteor/meteor";

Meteor.methods({

  // Insert a document in to the feedbackAnswer collection.
  "FeedbackAnswer.insert": function(doc) {
    FeedbackAnswer.insert(
      doc,
      function(error, doc_id) {
        if ( error ) {
          console.log ( error ); //info about what went wrong
          return; // Stop exec
        }
    });
  },

});
