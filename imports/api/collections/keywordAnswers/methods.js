import {Meteor} from "meteor/meteor"
import {sharedVariables} from "../sharedVariables"

Meteor.methods({

  "test":function(){
    console.log("ABSjHDASK");
  },
  
  /**
  *  Inserts a document "doc" in to the "keywordAnswers" collection.
  *
  *  @param doc is a JSON object we wish to be inserted.
  **/
  "KeywordAnswers.insert": function(doc) {
    KeywordAnswers.insert(
      doc,
      function(error, keywords_id) {
        if ( error ) {
          console.log ( error + " with object " + keywords_id ); //info about what went wrong
          Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
          return; // Stop exec
        }
      }
    );
  },

  /**
  *  Updates an object in the "keywords" collection.
  *
  *  @param id is the id of the JSON object that is to be updated.
  *  @param doc is a JSON object with the parameters that wish to be updated.
  **/
  "KeywordAnswers.upsert": function( id, doc ) {
   KeywordAnswers.upsert({_id: id}, {$set:doc},
    function(err, objId) { // Handle errors
      if(err) {
        console.log("ERROR in UPSERT: " + err + " with object " + objId);
        Materialize.toast('Något gick fel!', 4000, "red");
      }
    }
   );
  }

});
