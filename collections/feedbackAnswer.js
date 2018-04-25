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

FeedbackAnswer = new Mongo.Collection('feedbackAnswer');
let schema = new SimpleSchema({

  'feedbackTemplateName': {
    type: String, // Array of String(s)
    label: 'The template of the feedback question',
  },

  'answer': {
    type: String, // Array of String(s)
    label: 'A feedback answer.',
  },

  'answer2': {
    type: String, // Array of String(s)
    label: 'A feedback answer.',
    optional: true
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

FeedbackAnswer.attachSchema( schema );
