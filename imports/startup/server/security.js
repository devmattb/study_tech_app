/**
*    Database Security, Allows clients to do certain operations to the specific collections:
**/
//TODO
Keywords.allow({
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

//TODO
KeywordAnswers.allow({
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

// Deny sketchy operations on the feedbackQuestion collection.
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
