import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/***
*   Creates the collection studySession and attaches a simple schema to it.
***/
StudySession = new Mongo.Collection( 'studySession' );
let studySessionSchema = new SimpleSchema({

  // All common info between events in the same chain are stored in study chain objects.
  'connectedStudyChainId': {
    type: String,
    label: 'The connected studyChain',
    optional: true
  },

  // TODO: Once we manage to rewrite the calendar-event-fetching function.
  //       So that we can use the ID from the studyChain object,
  //       then we can remove this.
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

StudySession.attachSchema(studySessionSchema);
