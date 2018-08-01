import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/***
*   Creates the collection studySession and attaches a simple schema to it.
***/
Keyword = new Mongo.Collection('keyword');
let schema = new SimpleSchema({

  // All common info between events in the same chain are stored in study chain objects.
  'connectedSummaryId': {
    type: String,
    label: 'The connected summary to this keyword couple.',
    optional: true
  },

  'keywordValue': {
    type: String,
    label: 'The name of this keyword.',
  },

  'keywordDescription': {
    type: String,
    label: 'The text of this keyword.',
  },

  'hashCode' : {
    type: String,
    label: "unique id for each keyword",
  }

});

Keyword.attachSchema(schema);
