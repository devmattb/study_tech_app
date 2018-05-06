/**
*   Upload documents to DB on startup.
**/
import { Meteor } from 'meteor/meteor';
import "../../api/api.js";

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
        Meteor.call("ActivityDescription.insert", fileContents);
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
        var fileContents = JSON.parse(Assets.getText('feedbackQuestions/'+templateNames[i]));
        Meteor.call("FeedbackQuestion.insert", fileContents);
    }
  }

});
