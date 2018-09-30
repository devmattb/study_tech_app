/**
*    Database Security, Allows clients to do certain operations to the specific collections:
**/

// It's okay for users to add a group of keywords in a summary studysession.
Keywords.allow({

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

});

// Don't let the users keywords be deleted by sketchy circumstances.
Keywords.deny({
  remove: function () {
    return true;
  },
});

<<<<<<< HEAD
//TODO
=======
// It's okay for the user to insert and update their answers.
>>>>>>> b401712fb8ab5039ae4319e970f27bcbfa04172a
KeywordAnswers.allow({

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

});

// Don't let the users answers be deleted by sketchy circumstances.
KeywordAnswers.deny({
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
