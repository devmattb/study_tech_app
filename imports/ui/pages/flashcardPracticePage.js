import "./flashcardPracticePage.html";

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/functions/subscriptions";


var currentIndex = 0;
var testArray = [
  {keywordValueAnswer: "Cake", keywordDescriptionAnswer: "A bakery dish made with flour", connectedKeywordHashCode: "1"},
  {keywordValueAnswer: "Ice cream", keywordDescriptionAnswer: "A mix of cream, sugar, milk and other goodies", connectedKeywordHashCode: "2"},
  {keywordValueAnswer: "Ribs", keywordDescriptionAnswer: "The ribcage of a pig or cow, often BBQ’ed", connectedKeywordHashCode: "3"},
  {keywordValueAnswer: "Mac and cheese", keywordDescriptionAnswer: "Cheese with macaroni, served warm", connectedKeywordHashCode: "4"},
  {keywordValueAnswer: "Coca cola", keywordDescriptionAnswer: "The world's most famous soft drink", connectedKeywordHashCode: "5"}
];

var counter = 0;
var amountOfReveals = 10; // TODO function to get amountOfReveals
function allowToRevealAnswer(){
  counter++;
  console.log(counter);
  if(counter > amountOfReveals){
    return false;
  }else{
    return true;
  }
}

function changeFlashcardText(){
  setFlashcardText(currentIndex += 1);
}


function setFlashcardText(index){
  Template.instance().currentFlashcardText.set(testArray[index].keywordValueAnswer);
  Template.instance().currentHiddenFlashcardText.set( testArray[index].keywordDescriptionAnswer);
}

Template.flashcardPracticePage.helpers({
  flashcardText: function(){
    return  Template.instance().currentFlashcardText.get();
  },

  hiddenFlashcardText: function(){
    return  Template.instance().currentHiddenFlashcardText.get();
  },
});

Template.flashcardPracticePage.onCreated(function() {
  let template = Template.instance();
  subscriptions(template);

  this.currentFlashcardText = new ReactiveVar();
  this.currentHiddenFlashcardText = new ReactiveVar();

  setFlashcardText(currentIndex);
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
      // TODO tell the user that they may not reveal any more answers
      console.log("no more reveals allowed");
    }

  },

  "click .card-title": function(event) {
    $("#revealed-flashcard-btn").prop("disabled",false);
  },

  "click #submit-flashcard-answer-btn": function(event) {
    event.preventDefault();
    changeFlashcardText();
  },

  'change select': function( event, template ) {
    if ( $( event.target ).val() === "show" ) {
      // Here we get our template instance from the template
      // argument in our event handler.
      template.showExtraFields.set( true );
    } else {
      template.showExtraFields.set( false );
    }
  }





});
