import '/imports/startup/server';

/**
*    Database Security, Allows clients to do certain operations to the specific collections:
**/
// Allow all clients to perform any operation on their own studysession data.
StudySession.allow({
 insert: function (userId, doc) {
  if (userId && doc.userId === userId) {
    return true;
  }
 },
 update: function (userId, doc) {
   if (userId && doc.userId === userId) {
     return true;
   }
 },
 remove: function (userId, doc) {
  if (userId && doc.userId === userId) {
    return true;
  }
 },
});

// Allow all clients to perform any operation on their own studychain data.
StudyChain.allow({
 insert: function (userId, doc) {
   if (userId && doc.userId === userId) {
     return true;
   }
 },
 update: function (userId, doc) {
    if (userId && doc.userId === userId) {
     return true;
    }
 },
 remove: function (userId, doc) {
  if (userId && doc.userId === userId) {
    return true;
  }
 },
});

// Allow all users to give us feedback data.
FeedbackAnswer.allow({
 insert: function () {
     return true;
 },
});

// Deny all users from tampering with feedback answer data.
FeedbackAnswer.deny({
 update: function () {
     return true;
 },
 remove: function () {
     return true;
 },
});


/**
*   Define global meteor functions
**/
var studyChainId; // Used to connect studySessions and studyChains.
Meteor.methods({

/**
*   Gets the current time left in a studysession.
**/
'getCurrentTime': function (){
  return Date.parse(new Date());
},

/**
*   Gets the current studyChainId
**/
'getStudyChainId': function (){
  return studyChainId;
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

/**
*  Updates the StudySession collection.
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
