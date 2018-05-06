import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/***
*   Creates the collection studyChain and attaches a simple schema to it.
***/
StudyChain = new Mongo.Collection('studyChain');
let schema = new SimpleSchema({
  // TODO/OPTIMIZE: Only have the userId in this collection and not in studySession.
  'connectedUserId': {
    type: String,
    label: 'The connected user ID.',
  },

  'courseName': {
    type: String,
    label: 'A feedback answer.',
  },

  'examinationType': {
    type: String,
    label: 'The course name of the activity that feedback was given on.',
    optional: true
  },

  'deadline': {
    type: String,
    label: 'How many units (pages/words/etc) do we wish to have per session?'
  },

  'unitsPerSession': {
    type: String,
    label: 'How many units (pages/words/etc) do we wish to have per session?'
  },

  'icon': {
    type: String,
    label: 'What event icon should this course have?',
    autoValue:function(){
      var courseName = this.siblingField("courseName").value;
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
  },

});

StudyChain.attachSchema(schema);
