import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/***
*   Creates the collection studySession and attaches a simple schema to it.
***/
Summary = new Mongo.Collection('summary');
let schema = new SimpleSchema({

  // All common info between events in the same chain are stored in study chain objects.
  'connectedStudyChainId': {
    type: String,
    label: 'The connected studyChain to this summary post.',
    optional: true
  },
  
  'pages': {
    type: String,
    label: 'The current pages of this summary post.',
  },

});

Summary.attachSchema(schema);
