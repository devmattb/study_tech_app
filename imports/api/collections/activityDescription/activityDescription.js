import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/***
*   Creates the collection studySession and attaches a simple schema to it.
***/
ActivityDescription = new Mongo.Collection( 'activityDescription' );
// TODO: Make anonymous Arrays work with SimpleSchema.
// let CourseSchema = new SimpleSchema({
//
//   'courseType': {
//     type: Array, // Array of String(s)
//     label: 'The course type this activity is linked to.',
//     // allowedValues: "Skriftligt Prov", "Litteraturanalys", "Muntlig Redovisning", "Glosor", "Uppsats"
//   },
//
//   'examinationType': {
//     type: Array, // Array of String(s)
//     label: 'The examination type this activity is linked to.',
//     // allowedValues: "Skriftligt Prov", "Litteraturanalys", "Muntlig Redovisning", "Glosor", "Uppsats"
//   },
//
//   'phase': {
//     type: Array, // Array of Number(s)
//     label: 'The study phase this activity is linked to.'
//   },
//
//   'phaseOrder': {
//     type: Array, // Array of Number(s)
//     label: 'The study order in the phase this activity should have.'
//   },
//
//   'desc': {
//     type: String,
//     label: 'The description of this activity.'
//   },
//
// });
//
// ActivityDescription.attachSchema( CourseSchema );
