/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/

// import {Mongo} from 'meteor/mongo';
// import SimpleSchema from 'simpl-schema';
//
// CalEvents = new Mongo.Collection( 'CalEvents' );
//
// // CalEvents.allow({
// //   insert: () => false,
// //   update: () => false,
// //   remove: () => false
// // });
// //
// // CalEvents.deny({
// //   insert: () => true,
// //   update: () => true,
// //   remove: () => true
// // });
//
// let EventsSchema = new SimpleSchema({
//
//   // An object holding all event with their info.
//   'eventObj': {
//     type: Object,
//     label: 'The eventArray holding all info about all events.',
//     blackbox: true
//   },
//
//   'eventArray.$._id': {
//     type: String,
//     label: 'The id of the user which has these events connected to it.'
//   },
//
//   'eventArray.$.totalNumOfEvents': {
//     type: String,
//     label: 'The id of the user which has these events connected to it.'
//   },
//
//   // Creating a array type for each event info.
//   'eventArray.$': {
//     type: Array,
//     label: 'The event info about a single event.'
//   },
//
//   'eventArray.$.$.title': {
//     type: String,
//     label: 'The title of this event.'
//   },
//   'eventArray.$.$.start': {
//     type: String,
//     label: 'When this event will start.'
//   },
//   'eventArray.$.$.end': {
//     type: String,
//     label: 'When this event will end.'
//   },
//   'eventArray.$.$.type': {
//     type: String,
//     label: 'What type of event is this?',
//     allowedValues: [ 'Math', 'Literature', 'Glossary', 'Essay' ]
//   },
//   'eventArray.$.$.deadline': {
//     type: String,
//     label: 'When is this examination due?'
//   }
//
// });
//
// CalEvents.attachSchema( EventsSchema );
//
// var doc = {
//   'eventObj': {
//   '_id': 123,
//   'totalNumOfEvents': 2,
//   // EVENT:
//   'event1': {
//     'title': "Math",
//     'start': '2018-01-01 18:00:00',
//     'end': '2018-01-01 20:00:00',
//     'type': 'Math',
//     'deadline': '2018-08-01 22:00:00', // 8 days after.
//     'editable': false,
//   },
//   'event2': {
//     'title': "Math",
//     'start': '2018-01-01 18:00:00',
//     'end': '2018-01-01 20:00:00',
//     'type': 'Math',
//     'deadline': '2018-08-01 22:00:00', // 8 days after.
//     'editable': false,
//   },
//   // End of event
// },
//  // End of eventArray.
// }; // End of event
//
// CalEvents.insert(
// doc,
// function(error, result) {
//   if ( error ) {
//     console.log ( error ); //info about what went wrong
//     Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
//     return; // Stop exec
//   } else {
//     // Everything went smoothly...
//     Materialize.toast('EVENT skapat!', 4000, "green");
//   }
// }
// );
