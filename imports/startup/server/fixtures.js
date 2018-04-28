/**
*   Initiate Server
**/
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {


  /**
  *   Make sure the database has all our activites inserted in to it:
  *
  *   NOTE/TODO:
  *   Getting all filenames in a directory seemed to be a nightmare in Meteor.
  *   Therefore, the filenames are listed here, until further notice.
  **/
  var fileNames = [
    "flashcards1.json", "flashcards2.json", "flashcards3.json",
    "glosor1.json", "glosor2.json", "mattenedbrytning1.json",
    "mindmap1.json","mindmap2.json","mindmap3.json","mindmap4.json",
    "minnespromenad1.json", "minnespromenad2.json",
    "planerande1.json", "presentationsdesign1.json",
    "sammanfattning1.json", "sammanfattning2.json", "skriv1.json",
    "övning1.json", "övningsprov1.json"];
  var amountOfFilesInDB = ActivityDescription.find().count();

  // If we have more files in our activityDesc folder than in in our database, we need to update our DB.
  if ( fileNames.length > amountOfFilesInDB ) {
    // Clean out the entire database:
    ActivityDescription.remove({});

    // Insert the updated activity files:
    for(var i = 0; i < fileNames.length; i++) {
        // Read the contents of this file, and insert it to our activities database.
        var fileContents = JSON.parse(Assets.getText('activityDescriptions/'+fileNames[i]));
        ActivityDescription.insert(fileContents);
    }
  }

  /**
  *   Make sure all our feedback questions exist in the database:
  **/
  var templateNames = [
    "funniness.json", "learningQuality.json", "amountOfSessions.json", "pauses.json", "tooLong.json"
  ];
  var numFBQuestions = FeedbackQuestion.find().count();

  if ( templateNames.length > numFBQuestions ) {
    // Clean out the entire database:
    FeedbackQuestion.remove({});

    // Insert the updated activity files:
    for(var i = 0; i < templateNames.length; i++) {
        // Read the contents of this file, and insert it to our activities database.
        var fileContents = JSON.parse(Assets.getText('feedbackQuestion/'+templateNames[i]));
        FeedbackQuestion.insert(fileContents);
    }
  }

 /**
 *    Database Security, Allows and denies clients to doe certain operations to the database:
 **/
 StudySession.allow({
   insert() { return true; },
   update() { return true; },
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
