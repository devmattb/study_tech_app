Meteor.methods({

  /**
  *  Inserts a document "doc" in to the "activityDescription" collection.
  *
  *  @param doc is a JSON object we wish to be inserted.
  **/
  "ActivityDescription.insert": function(doc) {
    ActivityDescription.insert(
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
