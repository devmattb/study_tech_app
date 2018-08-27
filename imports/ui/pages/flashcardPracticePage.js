import "./flashcardPracticePage.html";

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/functions/subscriptions";

var counter = 0;
// TODO function to get amountOfReveals
var amountOfReveals = 10;
function allowToRevealAnswer(){
  counter++;
  console.log(counter);
  if(counter > amountOfReveals){
    return false;
  }else{
    return true;
  }
}

Template.flashcardPracticePage.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.flashcardPracticePage.onRendered(function(){
  pageInit();

  // Set height to 100%
  $("#flashcardPracticePage").css('height', $(window).height());
  $(window).resize(function() {
    //resize just happened, makes sure fullpage is always fullpage.
    $("#flashcardsGamePage").css('height', $(window).height());
  });
});

Template.flashcardPracticePage.events({

  "click #revealed-flashcard-btn": function(event) {

    if(allowToRevealAnswer()){
      $("#reveal-flashcard-content-btn").click();
      $("#revealed-flashcard-btn").prop("disabled",true);
    }else{
      console.log("no more reveals allowed");
    }

  },

  "click .card-title": function(event) {
    $("#revealed-flashcard-btn").prop("disabled",false);
  },



});
