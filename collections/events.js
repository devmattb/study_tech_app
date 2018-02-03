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
  'htmlDescription': {
    type: String,
    label: 'The HTML code for the description of this event!',
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
    allowedValues: [ 'Math', 'Literature', 'Glossary', 'Essay' ]
  },
  'deadline': {
    type: String,
    label: 'When is this examination due?'
  },
  'editable': {
    type: Boolean,
    label: 'Can you edit this event?'
  }

});

CalEvents.attachSchema( EventsSchema );
