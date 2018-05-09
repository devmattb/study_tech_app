import "./feedbackPage.html"

import {pageInit} from "../../api/functions/pageInit"
import {subscriptions} from "../../api/functions/subscriptions"

Template.feedbackPage.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.feedbackPage.onRendered(function(){
      pageInit();
});

Template.feedbackPage.helpers({

  // All questions
  feedbackQuestion: function(){
    return FeedbackQuestion.find();
  },

  // All answers
  feedbackAnswer: function(){
    return FeedbackAnswer.find();
  },

  // Checks if two strings are Equal.
  isEqual: function(v1,v2) {
    if(v1 === v2) {
      return true;
    }
    return false;
  },

});
