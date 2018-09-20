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
import {subscriptions} from "../../api/functions/subscriptions"

// TODO: Can't get server methods to work!!!!
function test(){
  /**
  *   Test new collections!
  **/
  const exampleKeywordInput = {
    'connectedUserId': "bla",
    'keywords': [{"keywordValue": "keywordVal1","keywordDescription": "summaryTxt1", "hashCode": "hash1"}],
    'pages': "51-55"
  }
  Keywords.insert(exampleKeywordInput);
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
