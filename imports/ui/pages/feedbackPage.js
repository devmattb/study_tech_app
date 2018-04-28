import "./feedbackPage.html"
import "../../../collections/feedbackAnswer.js";

import {pageInit} from "../../api/pageInit"

Template.feedbackPage.onRendered(function(){
      pageInit();
});

Template.feedbackPage.helpers({

  // All answers
  feedback: function(){
    // The study session always holds the id to the activity description:
    const feedbackObj = FeedbackAnswer.find({});
    console.log(feedbackObj);
    return feedbackObj; // Returns the HTML code for this activity description.
  },

});
