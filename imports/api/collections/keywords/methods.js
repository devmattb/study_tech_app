import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({

  /**
  *  Inserts a document "doc" in to the "keywords" collection.
  *
  *  @param doc is a JSON object we wish to be inserted.
  **/
  "Keywords.insert": function(doc) {
    Keywords.insert(
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

  // /**
  // *  Updates an object in the "keywords" collection.
  // *
  // *  @param id is the id of the JSON object that is to be updated.
  // *  @param doc is a JSON object with the parameters that wish to be updated.
  // **/
  // "Keywords.upsert": function( id, doc ) {
  //  Keywords.upsert({_id: id}, {$set:doc},
  //   function(err, objId) { // Handle errors
  //     if(err) {
  //       console.log("ERROR in UPSERT: " + err + " with object " + objId);
  //       Materialize.toast('Något gick fel!', 4000, "red");
  //     }
  //   }
  //  );
  // }

});
