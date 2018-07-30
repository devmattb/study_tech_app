import "../components/header.js";
import "../components/navbar.js";
import "../components/preloader.js";
import "../components/summaryComponents/keyword.js";
import "./summaryPage.html";
import "../components/summaryComponents/keywordModal.js";
import "../components/summaryComponents/keyword.js";

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/functions/subscriptions";
import {addKeyword} from "../../api/functions/summaryPage/addKeyword";
import {removeKeyword} from "../../api/functions/summaryPage/removeKeyword";

function editKeywordContent(){
  $("#keywordModal").modal('open');
  currentIndex = Session.get("currentIndex");
  Session.set("activeKeyword", currentIndex);
}

Template.summaryPage.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.summaryPage.onRendered(function(){
  pageInit();
  // Init number of displayed keywords
  if (!Session.get("numKeywords")) {
    Session.set("numKeywords", -1);
    Session.set("currentIndex", -1);
    Session.set("keywords", {"keys":[]});
  }
});

Template.summaryPage.helpers({

  // Keeps track of the number of keywords.
  numKeywords: function(){
    return Session.get("numKeywords");
  },

  keywords: function(){
    return Session.get("keywords");
  },

});

var keywordCounter = 0;
Template.summaryPage.events({

  "click #addKeywordContainerBtn":function(event) {
    // We're creating a new keyword:
    $("#submit-keyword-btn").attr("data-editing", false);
    editKeywordContent();
  },

  "click .deleteKeywordContainer":function(event) {
    removeKeyword(event.target.getAttribute("data-index"));
  },

});
