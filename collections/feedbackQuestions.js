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

FeedbackQuestions = new Mongo.Collection('FeedbackQuestions');
let schema = new SimpleSchema({

  'question': {
    type: String, // Array of String(s)
    label: 'A feedback question.',
  },

  'templateName': {
    type: String, // Array of String(s)
    label: 'The feedback template this question is related to.',
  },

});

FeedbackQuestions.attachSchema( schema );
