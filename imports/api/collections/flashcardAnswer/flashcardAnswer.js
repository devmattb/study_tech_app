import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/***
*   Creates the collection studySession and attaches a simple schema to it.
***/
FlashcardAnswer = new Mongo.Collection('flashcardAnswer');
let schema = new SimpleSchema({

  'keywordValue': {
    type: String,
    label: 'The keyword.',
    optional: false,
  },

  'keywordDescription': {
    type: String,
    label: 'The description of the keyword.',
    optional: false,
  },

  'keywordValueAnswer': {
    type: String,
    label: 'The answer to a description.',
    optional: false,
  },

  'keywordDescriptionAnswer' : {
    type: String,
    label: "The answer to a keyword value.",
    optional: false,
  }

});

FlashcardAnswer.attachSchema(schema);
