import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import '/imports/startup/server/index.js';

/**
*   Define global meteor functions (non-collection related)
**/
Meteor.methods({

  /**
  *   Gets the current time left in a studysession.
  **/
  'getCurrentTime': function (){
    return Date.parse(new Date());
  },

});
