import "../components/header.js";
import "../components/navbar.js";
import "../components/preloader.js";
import "../components/summaryComponents/keyword.js";
import "./summaryPage.html";
import "../components/modals/keywordModal.js";

import {pageInit} from "../../api/functions/pageInit"
import {subscriptions} from "../../api/functions/subscriptions"


Template.summaryPage.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.summaryPage.onRendered(function(){
  pageInit();
});

var keywordCounter = 0;
Template.summaryPage.events({

  "click #addKeywordContainerBtn":function(event) {
    // Slide in
    keywordCounter++;
    var keywordHtml = `
      <div class="keywordContainer red col s12 white-text">
        <span id="keywordTxt" class="left">TEST`+keywordCounter+`</span>
        <span class="right deleteKeywordContainer"><i style="font-size: 16px;" class="fa fa-times"></i></span>
      </div>`;
    $("#keywordBox").append(keywordHtml).fadeIn(900);
  },

  "click .deleteKeywordContainer":function(event) {
    // Slide out
    keywordCounter--;
    $(event.target).closest(".keywordContainer").remove();
  },

});
