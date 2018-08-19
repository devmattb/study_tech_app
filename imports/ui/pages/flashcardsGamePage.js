import "./flashcardsGamePage.html";

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/functions/subscriptions";

function changeToNextFlashcard(){

}

function changeToPreviousFlashcard(){

}

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

  keywordValue: function(){
    return "Keyword"
  },

  keywordDescription: function(){
    return "Description"
  },

});

Template.flashcardsGamePage.events({

  "click #next-flashcard-btn": function(event) {
    var div = $("#flashcard-learn");
    div.slideUp(700);
    changeToNextFlashcard();
    div.slideDown(700);
  },

  "click #previous-flashcard-btn": function(event) {
    var div = $("#flashcard-learn");
    div.slideUp(700);
    changeToPreviousFlashcard();
    div.slideDown(700);
  }

});
