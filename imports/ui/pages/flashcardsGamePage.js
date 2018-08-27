import "./flashcardsPage.html";

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/functions/subscriptions";

Template.flashcardsPage.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.flashcardsPage.onRendered(function(){

  
  pageInit();

  // Set height to 100%
  $("#flashcardsPage").css('height', $(window).height());

  $(window).resize(function() {
    //resize just happened, makes sure fullpage is always fullpage.
    $("#flashcardsPage").css('height', $(window).height());
  });

});

Template.flashcardsPage.helpers({

  // Keeps track of the number of keywords.
//   numKeywords: function(){
//     return Session.get("numKeywords");
//   },

});

Template.flashcardsPage.events({

  // "click #addKeywordContainerBtn":function(event) {
  //   // We're creating a new keyword:
  //   $("#submit-keyword-btn").attr("data-editing", false);
  //   editKeywordContent();
  // },

});
