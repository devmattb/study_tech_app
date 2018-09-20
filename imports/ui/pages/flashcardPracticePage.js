import "./flashcardPracticePage.html";

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/functions/subscriptions";

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

var arrayOfAnswers = [];

/*iterat over the array 4 times so the users practices 2 times for keywordValue and 2 times for keywordDescription
*********************************/
var contentIterations = 0; //shows how many times the array has been iterated
var currentIndex = 0;
var testArray = [
  {keywordValue: "Cake", keywordDescription: "A bakery dish made with flour", connectedKeywordHashCode: "1"},
  {keywordValue: "Ice cream", keywordDescription: "A mix of cream, sugar, milk and other goodies", connectedKeywordHashCode: "2"},
  {keywordValue: "Ribs", keywordDescription: "The ribcage of a pig or cow, often BBQ’ed", connectedKeywordHashCode: "3"},
  {keywordValue: "Mac and cheese", keywordDescription: "Cheese with macaroni, served warm", connectedKeywordHashCode: "4"},
  {keywordValue: "Coca cola", keywordDescription: "The world's most famous soft drink", connectedKeywordHashCode: "5"}
];
function getMaxArrayIndex(){
  return testArray.length - 1;
}
function setArrayIteration(){
  if(currentIndex == getMaxArrayIndex()){
    currentIndex = -1;
    contentIterations += 1;
  }
}
function checkIfContentHasBeenShowedFourTimes(){
  if(contentIterations == 4){
    //break the session here, the user is done
    alert("you are done");
    correctAnswers();
  }else{
    setArrayIteration();
  }
}

// TODO
function correctAnswers(){
  length = arrayOfAnswers.length;
  for(var i=0; i < length; i++){
    var stringToBeCorrected = arrayOfAnswers[i].answer;
    var isDescAnswer = arrayOfAnswers[i].isADescriptionAnswer;
    if(isDescAnswer){
      correctDescription(stringToBeCorrected);
    }else if(!isDescAnswer){
      correctKeywordValue(stringToBeCorrected);
    }
  }
  console.log(arrayOfAnswers);
}

function correctDescription(stringToBeCorrected){
  console.log("correctDescription " + stringToBeCorrected);
}

function correctKeywordValue(stringToBeCorrected){
  console.log("correctKeywordValue " + stringToBeCorrected);
}


function createAnswerObject(){
  var usersAnswer = $("#textarea1").val();
  var keywordHashCode = Template.instance().connectedKeywordHashCode.get();
  var answerIsADescription = (contentIterations % 2) == 0;
  answerObj = {
    answer: usersAnswer,
    isADescriptionAnswer: answerIsADescription,
    hashCode: keywordHashCode,
  }
  return answerObj;
}


function changeFlashcardText(){
  checkIfContentHasBeenShowedFourTimes();
  setFlashcardText(currentIndex += 1);

}
function setFlashcardText(index){
  let value = testArray[index].keywordValue;
  let description = testArray[index].keywordDescription;
  let connectedKeywordCode = testArray[index].connectedKeywordHashCode;

  if((contentIterations % 2) != 0){
    // The user sees a keywordDescription and answers with a keywordValue
    Template.instance().currentFlashcardText.set(description);
    Template.instance().currentHiddenFlashcardText.set(value);
    Template.instance().connectedKeywordHashCode.set(connectedKeywordCode);
  }else{
    // The user sees a keywordValue and answers with a keywordDescription
    Template.instance().currentFlashcardText.set(value);
    Template.instance().currentHiddenFlashcardText.set(description);
    Template.instance().connectedKeywordHashCode.set(connectedKeywordCode);
  }
}



Template.flashcardPracticePage.onCreated(function() {
  let template = Template.instance();
  subscriptions(template);

  this.currentFlashcardText = new ReactiveVar();
  this.currentHiddenFlashcardText = new ReactiveVar();
  this.connectedKeywordHashCode = new ReactiveVar();

  setFlashcardText(currentIndex);
});

Template.flashcardPracticePage.helpers({
  flashcardText: function(){
    return  Template.instance().currentFlashcardText.get();
  },

  hiddenFlashcardText: function(){
    return  Template.instance().currentHiddenFlashcardText.get();
  },
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
    answer = createAnswerObject();
    arrayOfAnswers.push(answer);
    // TODO clear form text
    changeFlashcardText();
  },

});
