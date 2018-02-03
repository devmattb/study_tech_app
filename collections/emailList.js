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

EmailList = new Mongo.Collection('EmailList');

EmailListSchema = new SimpleSchema({

  email: {
    type: String,
    label:"email",
    optional: false
  }

});

EmailList.attachSchema(EmailListSchema);
