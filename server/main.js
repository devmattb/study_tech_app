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
  var amountOfFilesInDB = Activities.find().count();

  // If we have more files in our activityDesc folder than in in our database, we need to update our DB.
  if ( fileNames.length > amountOfFilesInDB ) {
    // Clean out the entire database:
    Activities.remove({});

    // Insert the updated activity files:
    for(var i = 0; i < fileNames.length; i++) {
        // Read the contents of this file, and insert it to our activities database.
        var fileContents = JSON.parse(Assets.getText('activityDescriptions/'+fileNames[i]));
        Activities.insert(fileContents);
    }
  }

  /**
  *   Define global Meteor functions that will be used throughout the entire program.
  **/
  Meteor.methods({

      /**
      *  Updates account collection. (DEPRICATED)
      **/
      accountUpsert: function( id, doc ) {
       Accounts.upsert( id, doc,
        function(err, res) { // Handle errors
          if(err) {
            console.log("ERROR in UPSERT: " + err);
            Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
          }
        }
       );
     },

     /**
     *  Updates event collection.
     **/
     eventUpsert: function( id, doc ) {
      CalEvents.upsert({_id: id}, {$set:doc},
       function(err, res) { // Handle errors
         if(err) {
           console.log("ERROR in UPSERT: " + err);
           Materialize.toast('Something went wrong.', 4000, "red");
         }
       }
      );
    },

    /**
    *   Used in Timer for each study session.
    **/
    'getCurrentTime': function (){
      return Date.parse(new Date());
    },

 });

 /**
 *    Database Security, Allows and denies clients to doe certain operations to the database:
 **/
 CalEvents.allow({
   insert() { return true; },
   update() { return true; },
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

 //Meteor.publish( 'CalEvents', function() { return CalEvents.find(); } );

});
