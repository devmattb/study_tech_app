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

Samhällskunskap = new Mongo.Collection( 'Samhällskunskap' );
Språk = new Mongo.Collection( 'Språk' );
Kvantitativ = new Mongo.Collection( 'Kvantitativ' );

let CourseSchema = new SimpleSchema({

  'examinationType': {
    type: String,
    label: 'The description of this study technique',
    // allowedValues: "Skriftligt Prov", "Litteraturanalys", "Muntlig Redovisning", "Glosor", "Uppsats"
  },

  'desc': {
    type: String,
    label: 'The description of this study technique'
  },

});

Samhällskunskap.attachSchema( CourseSchema );
Språk.attachSchema( CourseSchema );
Kvantitativ.attachSchema( CourseSchema );
