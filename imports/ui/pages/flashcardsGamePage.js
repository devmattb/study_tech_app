import "./flashcardsGamePage.html";

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/functions/subscriptions";

var keywordQue;
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

function fadeOutFlashcardText(){
  $(".flashcard-text").fadeOut(200);
}

function fadeInFlashcardText(){
  $(".flashcard-text").fadeIn(500);
}

Template.flashcardsGamePage.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.flashcardsGamePage.onRendered(function(){
  pageInit();

  // Init number of displayed keywords
  if (!Session.get("flashcardValues")) {
    keywordQue = 0;
    // TODO dummy content, swop for db content

    var dummyContent = {
      "keyword":[
        {
          "value": "Michael Jordan",
          "description": "Played for the bulls, won 6 championships"
        },
        {
          "value": "Koby Bryant",
          "description": "Played for the Lakers",
        },
        {
          "value": "Lebron James",
          "description": "Played for the Miami heat",
        },
        {
          "value": "James Harden",
          "description": "Played for the rockets",
        }
      ]
    };

    Session.set("flashcardValues", dummyContent);
    setActiveKeyword();
  }

  // Set height to 100%
  $("#flashcardsGamePage").css('height', $(window).height());
  $(window).resize(function() {
    //resize just happened, makes sure fullpage is always fullpage.
    $("#flashcardsGamePage").css('height', $(window).height());
  });
});

Template.flashcardsGamePage.helpers({

  keywordValue: function(){
    return Session.get("activeFlashcardKeyword");
  },
  keywordDescription: function(){
    return Session.get("activeFlashcardDescription");
  },

});

Template.flashcardsGamePage.events({

  "click #next-flashcard-btn": function(event) {
    var div = $("#flashcard-learn");
    fadeOutFlashcardText();
    div.slideUp(700);
    div.slideDown(700);
    setTimeout(function(){
      swopToNextFlashcard();
      fadeInFlashcardText();
    }, 1200);
  },

  "click #previous-flashcard-btn": function(event) {
    var div = $("#flashcard-learn");
    fadeOutFlashcardText();
    div.slideUp(700);
    div.slideDown(700);
    setTimeout(function(){
      swopToPreviousFlashcard();
      fadeInFlashcardText();
    }, 1200);
  }
});
