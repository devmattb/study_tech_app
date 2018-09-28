import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Import page & component HTML
import "../components/header.js"
import "../components/navbar.js"
import "../components/preloader.js"
import "./home.html"

// Import functions
import {pageInit} from "../../api/functions/pageInit"
import {initCal} from "../../api/functions/initCal"
import {subscriptions} from "../../api/subscriptions"


function test(){
  /**
  *   Test new collections!
  **/
  const exampleKeywordInput = {
    'connectedUserId': "bla",
    'keywords': [
      {"keywordValue": "keywordVal1","keywordDescription": "summaryTxt1", "hashCode": "hash1"},
      {"keywordValue": "keywordVal2","keywordDescription": "summaryTxt2", "hashCode": "hash2"},
      {"keywordValue": "keywordVal3","keywordDescription": "summaryTxt3", "hashCode": "hash3"}
    ],
    'pages': "51-55"
  }

  Meteor.call("Keywords.insert",exampleKeywordInput);
  console.log("click");
}

Template.home.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.home.onRendered(function(){
  pageInit();
  initCal("agendaDay");
});

Template.home.events({
  'click .test-btn':function(){
    test();
  }
})
