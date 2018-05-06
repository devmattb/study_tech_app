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

  // All answers
  feedback: function(){
    // The study session always holds the id to the activity description:
    //const feedbackObj = Meteor.call("FeedbackAnswer.find",{});
    //console.log(feedbackObj);
    //return feedbackObj; // Returns the HTML code for this activity description.
    var bla = FeedbackQuestion.find();
    return ActivityDescription.find();
  },

});
