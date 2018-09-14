import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/***
*   Creates the collection keywords and attaches a simple schema to it.
***/
KeywordAnswers = new Mongo.Collection('keywordAnswers');

// Create keyword type, for the keywordsSchema at the bottom of this file.
const keywordAnswer = new SimpleSchema({
  'keywordValueAnswer': {
    type: String,
    label: 'The answer to the name of this keyword.'
  },

  'keywordDescriptionAnswer': {
    type: String,
    label: 'The answer to the summary text of this keyword.'
  },

  // Used to connect users keyword-answers to a specific keyword,
  // while playing games like Flashcards.
  'connectedKeywordHashCode' : {
    type: String,
    label: "The connected keyword ID.",
  }
});

let keywordAnswersSchema = new SimpleSchema({

  // Connects this set of keywords answers, to the ID
  // of the the keywords array, that contains all keywords from one summary.
  'connectedKeywordsId': {
    type: String,
    label: 'The connected keywords object to this set of keyword answers.',
    optional: true
  },

  'keywordsAnswers': {
      type: Array, // Defines an array.
      label: "All keywords for a summary."
  },

  'keywordsAnswers.$': {
      type: keywordAnswer, // Defines each cell in the array as the schema "keywordAnswer"
      label: "All keywords for a summary."
  },

});

KeywordAnswers.attachSchema(keywordAnswersSchema);
