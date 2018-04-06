/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

CalEvents = new Mongo.Collection( 'CalEvents' );

// NOTE: Add when launching, security reasons...
// CalEvents.allow({
//   insert: () => false,
//   update: () => false,
//   remove: () => false
// });
//
// CalEvents.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true
// });

let EventsSchema = new SimpleSchema({

  'connectedUserId': {
    type: String,
    label: 'The id of the user which has these events connected to it.'
  },

  // An object holding all event with their info.
  'htmlDescriptionId': {
    type: String,
    label: 'The ID (in Activities) to the HTML code for the description of this event!',
  },

  'title': {
    type: String,
    label: 'The title of this event.'
  },

  'start': {
    type: String,
    label: 'When this event will start.'
  },

  'end': {
    type: String,
    label: 'When this event will end.'
  },

  'type': {
    type: String,
    label: 'What type of event is this?',
    allowedValues: [ 'Matematik', 'Fysik', 'Biologi', 'Kemi', 'Teknik' , 'Historia' , 'Geografi' , 'Religion' , 'Samhällskunskap', 'Svenska', 'Engelska' , 'Andravalsspråk' ]
  },

  'deadline': {
    type: String,
    label: 'When is this examination due?'
  },

  'url': {
    type: String,
    label: 'The unique clickable url for information about this study session'
  },

  'editable': {
    type: Boolean,
    label: 'Can you edit this event?'
  },

  'pagesPerSession': {
    type: String,
    label: 'How many pages do we wish to have per session?'
  },

  // Calculate the icon for this specific course name.
  'icon': {
    type: String,
    label: 'What event icon should this course have?',
    autoValue:function(){
      var courseName = this.siblingField("type").value;
      if (courseName === "Matematik") {
        return "fas fa-superscript";
      } else if (courseName === "Fysik") {
        return "fas fa-magnet";
      } else if (courseName === "Biologi") {
        return "fas fa-heartbeat";
      } else if (courseName === "Kemi") {
        return "fas fa-flask"; // Alternative: fas fa-vial
      } else if (courseName === "Teknik") {
        return "fas fa-lightbulb";
      } else if (courseName === "Historia") {
        return "fas fa-book";
      } else if (courseName === "Geografi") {
        return "fas fa-globe";
      } else if (courseName === "Religion") {
        return "fas fa-hand-holding-heart";
      } else if (courseName === "Samhällskunskap") {
        return "fas fa-building";
      } else if (courseName === "Svenska") {
        return "fab fa-stripe-s";
      } else if (courseName === "Engelska") {
        return "fas fa-pencil-alt";
      } else if (courseName === "Andravalsspråk") {
        return "fas fa-assistive-listening-systems";
      }
    }
  }


});

CalEvents.attachSchema( EventsSchema );
