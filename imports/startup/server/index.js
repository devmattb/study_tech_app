import "./fixtures.js";

/**
*   Initiate Server
**/
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

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
 Meteor.methods({

  /**
  *   Gets the current time left in a studysession.
  **/
  'getCurrentTime': function (){
    return Date.parse(new Date());
  },

  /**
  *  Updates the StudySession collection.
  *  @param id is the id of the JSON object that is to be updated.
  *  @param doc is a JSON object with the parameters that wish to be updated.
  **/
  upsertStudySession: function( id, doc ) {
   StudySession.upsert({_id: id}, {$set:doc},
    function(err, res) { // Handle errors
      if(err) {
        console.log("ERROR in UPSERT: " + err);
        Materialize.toast('Något gick fel!', 4000, "red");
      }
    }
   );
  },

 });

 /**
 *   Setting up Social Media Service Configurations for logins.
 **/
 // Facebook
 ServiceConfiguration.configurations.upsert(
   { service: 'facebook' },
   {
     $set: {
       loginStyle: "popup",
       appId: "184449002332303", // Located in facebook dev on navbar.
       secret: "3b759eb0ddb439bd0bd4357a9d474d0a" // Located in facebook dev in advanced settings.
     }
   }
 );

 // Google
 ServiceConfiguration.configurations.upsert(
   { service: 'google' },
   {
     $set: {
       loginStyle: "popup",
       // Both below are found under "Credentials in google dev."
       clientId: "120105098168-qg427giabikgi591p2bh688b5pmk155d.apps.googleusercontent.com",
       secret: "0fa9HyaJU5DbHAdiO4lUuneA"
     }
   }
 );

 //Meteor.publish( 'StudySession', function() { return StudySession.find(); } );

});
