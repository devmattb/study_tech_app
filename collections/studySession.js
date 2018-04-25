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

StudySession = new Mongo.Collection( 'studySession' );

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

  // All common info between events in the same chain are stored in study chain objects.
  'connectedStudyChainId': {
    type: String,
    label: 'The connected studyChain',
    optional: true
  },

  'connectedUserId': {
    type: String,
    label: 'The connected user ID.',
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

  'url': {
    type: String,
    label: 'The unique clickable url for information about this study session'
  },

});

StudySession.attachSchema( EventsSchema );
