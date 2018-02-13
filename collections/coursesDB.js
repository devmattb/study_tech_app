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

Activities = new Mongo.Collection( 'Activities' );

let CourseSchema = new SimpleSchema({

  'courseType': {
    type: String,
    label: 'The course type this activity is linked to.',
    // allowedValues: "Skriftligt Prov", "Litteraturanalys", "Muntlig Redovisning", "Glosor", "Uppsats"
  },

  'examinationType': {
    type: String,
    label: 'The examination type this activity is linked to.',
    // allowedValues: "Skriftligt Prov", "Litteraturanalys", "Muntlig Redovisning", "Glosor", "Uppsats"
  },

  'phase': {
    type: Number,
    label: 'The study phase this activity is linked to.'
  },

  'desc': {
    type: String,
    label: 'The description of this activity.'
  },

});

Activities.attachSchema( CourseSchema );
