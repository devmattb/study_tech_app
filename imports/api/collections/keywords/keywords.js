import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/***
*   Creates the collection keywords and attaches a simple schema to it.
***/
Keywords = new Mongo.Collection('keywords');

// Create keyword type, for the keywordsSchema at the bottom of this file.
const keyword = new SimpleSchema({
  'keywordValue': {
    type: String,
    label: 'The name of this keyword.'
  },

  'keywordDescription': {
    type: String,
    label: 'The summary text of this keyword.'
  },

  // Used to connect users keyword-answers to a specific keyword,
  // while playing games like Flashcards.
  'hashCode' : {
    type: String,
    label: "unique id for each keyword",
  }
});

//
//    Create actual schema for the keywords collection.
//
//    Example of a keyword Array:
//
//    cSS-ID  Array of keywords                                                             PAGES
//    {"ID": [{"value": "keywordVal","description": "summaryTxt"},{..},{..}, ... , {..}],  "51-55"}
//
let keywordsSchema = new SimpleSchema({

  // Connects this set of keywords, all from one summary, to the ID
  // of the studySession where the summary was performed.
  //
  // The studySession object can give us the studyChain ID.
  // The studyChain object can give us the user ID.
  //
  //                        Object Sequence:
  //
  //          [FIND]              [FIND]            [FIND]
  // keywords -----> studySession -----> studyChain -----> users
  //
  //                        Field Sequence:
  //
  // connectedStudySessionId, connectedStudyChainId, connectedUserId, _id
  //
  'connectedStudySessionId': {
    type: String,
    label: 'The connected summary to this keyword couple.',
    optional: true
  },

  'keywords': {
      type: [keyword], // An array of the schema 'keyword'.
      label: "All keywords for a summary."
  },

  // The pages this set of keywords is related to.
  'pages': {
    type: String,
    label: 'The current pages of this summary post.',
    optional: true // TODO.
  }

});

Keywords.attachSchema(keywordsSchema);
