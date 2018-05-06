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

FeedbackQuestion = new Mongo.Collection('feedbackQuestion');
let schema = new SimpleSchema({

  'question': {
    type: String,
    label: 'A feedback question.',
  },

  'templateName': {
    type: String, 
    label: 'The feedback template this question is related to.',
  },

});

FeedbackQuestion.attachSchema( schema );
