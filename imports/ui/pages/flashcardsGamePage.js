import "./flashcardsGamePage.html";

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/functions/subscriptions";

Template.flashcardsGamePage.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.flashcardsGamePage.onRendered(function(){
  pageInit();

  // Set height to 100%
  $("#flashcardsGamePage").css('height', $(window).height());

  $(window).resize(function() {
    //resize just happened, makes sure fullpage is always fullpage.
    $("#flashcardsGamePage").css('height', $(window).height());
  });
});

Template.flashcardsGamePage.helpers({

  // Keeps track of the number of keywords.
//   numKeywords: function(){
//     return Session.get("numKeywords");
//   },

});

Template.flashcardsGamePage.events({

  // "click #addKeywordContainerBtn":function(event) {
  //   // We're creating a new keyword:
  //   $("#submit-keyword-btn").attr("data-editing", false);
  //   editKeywordContent();
  // },

});
