/***
*
*   Created: 18 April 2019
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2018 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/

import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

Keywords2 = new Mongo.Collection('keywords2');
// let schema = new SimpleSchema({
//
//   'question': {
//     type: String,
//     label: 'Question 1'
//   },
//
//   'templateName': {
//     type: String,
//     label: 'The feedback template this question is related to.'
//   },
//
//   'question2': {
//     type: String,
//     label: 'Question 2',
//     optional: true
//   },
//
//   'activityRecorded': {
//     type: Boolean,
//     label: 'Do we record the activity in this question?',
//     optional: true
//   },
//
//   'courseRecorded': {
//     type: Boolean,
//     label: 'Do we record the courseName in this question?',
//     optional: true
//   }
//
// });
//
// FeedbackQuestion.attachSchema( schema );
