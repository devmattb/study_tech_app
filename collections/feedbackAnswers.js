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

FeedbackAnswers = new Mongo.Collection('FeedbackAnswers');
let schema = new SimpleSchema({

  'connectedQuestionId': {
    type: String, // Array of String(s)
    label: 'Links to the feedback question',
  },

  'answer': {
    type: String, // Array of String(s)
    label: 'A feedback answer.',
  },

  'courseName': {
    type: String, // Array of String(s)
    label: 'The course name of the activity that feedback was given on.',
    optional: true
  },

  'activityName': {
    type: String, // Array of String(s)
    label: 'The activity name.',
    optional: true
  },

});

FeedbackAnswers.attachSchema( schema );
