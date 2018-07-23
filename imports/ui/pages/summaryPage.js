import "../components/header.js";
import "../components/navbar.js";
import "../components/preloader.js";
import "../components/summaryComponents/keyword.js";
import "./summaryPage.html";
import "../components/modals/keywordModal.js";
import "../components/summaryComponents/keyword.js";

import {pageInit} from "../../api/functions/pageInit"
import {subscriptions} from "../../api/functions/subscriptions"

function addKeyword() {
  // Get the current "keywords" json object.
  var keywords = Session.get("keywords");
  // Add to the current "keywords" json object.
  Session.set("numKeywords", Session.get("numKeywords")+1);
  keywords["keys"][Session.get("numKeywords")] = {
    index: Session.get("numKeywords"),
    keywordValue: "",
    keywordDescription: "",
  }
  // Save the new "keywords" json object in the session variable.
  Session.set("keywords", keywords);
}

function removeKeyword(index) {
  // Get the current "keywords" json object.
  var keywords = Session.get("keywords");

  // Create a new keywords object, that replaces the old one.
  var newKeywords = {"keys":[]};
  Session.set("numKeywords", Session.get("numKeywords")-1);
  for (var i = 0; i <= Session.get("numKeywords")+1; i++) {
    if (i != index) {
      // We want to keep this cell. Copy it!
      newKeywords["keys"][i] = keywords["keys"][i];
      console.log(i);
    }
  }
  // Save the new "keywords" json object in the session variable.
  Session.set("keywords", newKeywords);
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
    addKeyword();
  },

  "click .deleteKeywordContainer":function(event) {
    removeKeyword(event.target.getAttribute("data-index"));
  },

});
