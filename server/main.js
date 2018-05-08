import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import '/imports/startup/server/index.js';

/**
*    Database Security, Allows clients to do certain operations to the specific collections:
**/
//Allow all clients to perform any operation on their own studysession data.
StudySession.allow({
 insert: function (userId, doc) {
  if (userId && doc.userId === userId) {
    return true;
  }
 },
 update: function (userId, doc) {
   if (userId && doc.userId === userId) {
     return true;
   }
 },
 remove: function (userId, doc) {
  if (userId && doc.userId === userId) {
    return true;
  }
 },
});

// Allow all clients to perform any operation on their own studychain data.
StudyChain.allow({
 insert: function (userId, doc) {
   if (userId && doc.userId === userId) {
     return true;
   }
 },
 update: function (userId, doc) {
    if (userId && doc.userId === userId) {
     return true;
    }
 },
 remove: function (userId, doc) {
  if (userId && doc.userId === userId) {
    return true;
  }
 },
});

// Allow all users to give us feedback data.
FeedbackAnswer.allow({
 insert: function () {
     return true;
 },
});

// Deny all users from tampering with feedback answer data.
FeedbackAnswer.deny({
 update: function () {
     return true;
 },
 remove: function () {
     return true;
 },
});

// Deny sketchy operations on the users collection.
FeedbackQuestion.deny({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function () {
      return true;
  },
});

// Deny sketchy operations on the users collection.
Meteor.users.deny({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function () {
      return true;
  },
});


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
