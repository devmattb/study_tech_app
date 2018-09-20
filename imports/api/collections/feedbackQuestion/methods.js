import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({

  /**
  *  Inserts a document "doc" in to the "feedbackQuestion" collection.
  *
  *  @param doc is a JSON object we wish to be inserted.
  **/
  "FeedbackQuestion.insert": function(doc) {
    FeedbackQuestion.insert(
      doc,
      function(error, res_id) {
        if ( error ) {
          console.log ( error ); //info about what went wrong
          Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
          return; // Stop exec
        }
      }
    );
  },

});
