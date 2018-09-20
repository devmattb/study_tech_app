import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({

  /**
  *  Inserts a document "doc" in to the "feedbackAnswer" collection.
  *
  *  @param doc is a JSON object we wish to be inserted.
  **/
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
