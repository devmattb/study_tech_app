import "./flashcardsGamePage.html";
import "../components/DragDropTouch.js"
import "../../api/functions/flashcardsPage/flashcardsAnimations"

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/functions/subscriptions";

var keywordQue;
// TODO dummy content, swop for db content
var dummyContent = {"keyword":[{"value": "Michael Jordan","description": "Played for the bulls, won 6 championships"},{"value": "Koby Bryant","description": "Played for the Lakers",},{"value": "Lebron James","description": "Played for the Miami heat",},{"value": "James Harden","description": "Played for the rockets",}]};
function setActiveKeyword(){
  Session.set("activeFlashcardKeyword", Session.get("flashcardValues").keyword[keywordQue].value);
  Session.set("activeFlashcardDescription", Session.get("flashcardValues").keyword[keywordQue].description);
}

function swopToPreviousFlashcard(){
  keywordQue += -1;
  setActiveKeyword();
}
function swopToNextFlashcard(){
  keywordQue += 1;
  setActiveKeyword();
}

Template.flashcardsGamePage.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.flashcardsPage.onRendered(function(){

  pageInit();
  var emptyJsonArr = {"keyword":[{}]};
  // Init number of displayed keywords
  if (!Session.get("flashcardValues")) {
    Session.set("certainCard", "");
    Session.set("certainValues", emptyJsonArr);
    Session.set("uncertainCard", "");
    Session.set("uncertainValues", emptyJsonArr);
    keywordQue = 0;
    Session.set("flashcardValues", dummyContent);
    setActiveKeyword();
  }

  // Set height to 100%
  $("#flashcardsGamePage").css('height', $(window).height());
  $(window).resize(function() {
    //resize just happened, makes sure fullpage is always fullpage.
    $("#flashcardsPage").css('height', $(window).height());
  });

});

Template.flashcardsPage.helpers({

  certainCard: function(){
    return Session.get("certainCard");
  },

  uncertainCard: function(){
    return Session.get("uncertainCard");
  },

  keywordValue: function(){
    return Session.get("activeFlashcardKeyword");
  },
  keywordDescription: function(){
    return Session.get("activeFlashcardDescription");
  },

});

Template.flashcardsPage.events({

  "click #next-flashcard-btn": function(event) {
    $(".card-title").click();
    var div = $("#flashcard-learn");
    changeFlashcard();
    swopToNextFlashcard();
  },

  "click #previous-flashcard-btn": function(event) {
    var div = $("#flashcard-learn");
    changeFlashcard();
    swopToPreviousFlashcard();
  }
});
