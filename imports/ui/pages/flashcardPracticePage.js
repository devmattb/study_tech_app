import "./flashcardPracticePage.html";

import {pageInit} from "../../api/functions/pageInit";
import {subscriptions} from "../../api/subscriptions";

var amountOfReveals = 0;
var maxAmountOfReveals = 10; // TODO function to get maxAmountOfReveals
function allowToRevealAnswer(){
  amountOfReveals++;
  console.log(amountOfReveals);
  if(amountOfReveals > maxAmountOfReveals){
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

// NOTE: TEST OLD.
// var testArray = [
//   {keywordValue: "Cake", keywordDescription: "A bakery dish made with flour", hashCode: "1"},
//   {keywordValue: "Ice cream", keywordDescription: "A mix of cream, sugar, milk and other goodies", hashCode: "2"},
//   {keywordValue: "Ribs", keywordDescription: "The ribcage of a pig or cow, often BBQ’ed", hashCode: "3"},
//   {keywordValue: "Mac and cheese", keywordDescription: "Cheese with macaroni, served warm", hashCode: "4"},
//   {keywordValue: "Coca cola", keywordDescription: "The world's most famous soft drink", hashCode: "5"}
// ];


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

// This answers i a description of a keyword
function correctDescription(stringToBeCorrected){

  stringToBeCorrected

  console.log("correctDescription " + stringToBeCorrected);
}

// This answers i a keyword that matches a description
function correctKeywordValue(stringToBeCorrected){
  console.log("correctKeywordValue " + stringToBeCorrected);
}


function createAnswerObject(){
  const usersAnswer = $("#textarea1").val();
  const keywordHashCode = Template.instance().hashCode.get();
  const answerIsADescription = (contentIterations % 2) == 0;
  const answerObj = {
    answer: usersAnswer,
    isADescriptionAnswer: answerIsADescription,
    hashCode: keywordHashCode,
  }
  return answerObj;
}

function getMaxArrayIndex(){
  // return testArray.length - 1;
  // TODO reactive data not working...
  return Template.instance().keywordObject.get().keywords.length-1;
}

function setArrayIteration(){
  if(currentIndex == getMaxArrayIndex()){
    currentIndex = -1;
    contentIterations += 1;
  }
}

function checkIfContentHasBeenShowedFourTimes(){
  if(contentIterations == 4){
    //TODO break the session here, the user is done
    alert("you are done");
    correctAnswers();
  }
}

function changeFlashcardText(){
  arrayOfAnswers.push(createAnswerObject());
  setArrayIteration();
  checkIfContentHasBeenShowedFourTimes();
  setFlashcardText(currentIndex += 1);
}

function setFlashcardText(index){
  // NOTE: TEST OLD.
  // let value = testArray[index].keywordValue;
  // let description = testArray[index].keywordDescription;
  // let connectedKeywordCode = testArray[index].hashCode;

  // TODO: Reactive data not working...
  //let kwObj = this.keywordObject.get();
  console.log("kwObj " + this.keywordObject.get());
  // let value = kwObj.keywords[index].keywordValue;
  // let description = kwObj.keywords[index].keywordDescription;
  // let connectedKeywordCode = kwObj.keywords[index].hashCode;
  //
  // if ((contentIterations % 2) != 0) {
  //   // The user sees a keywordDescription and answers with a keywordValue
  //   Template.instance().currentFlashcardText.set(description);
  //   Template.instance().currentHiddenFlashcardText.set(value);
  //   Template.instance().hashCode.set(connectedKeywordCode);
  // } else{
  //   // The user sees a keywordValue and answers with a keywordDescription
  //   Template.instance().currentFlashcardText.set(value);
  //   Template.instance().currentHiddenFlashcardText.set(description);
  //   Template.instance().hashCode.set(connectedKeywordCode);
  // }
  // $("#textarea1").val(""); //clear the form
}



Template.flashcardPracticePage.onCreated(function() {
  let template = Template.instance();
  subscriptions(template);

  this.currentFlashcardText = new ReactiveVar();
  this.currentHiddenFlashcardText = new ReactiveVar();
  this.hashCode = new ReactiveVar();
  this.keywordObject = new ReactiveVar();

  // Run this chunk of code whenever the data changes
  // in the Keywords.find().fetch() function.
  //
  // This allows us to correctly fetch keyword data.
  this.autorun(() => {
    // NOTE: Need to make sure that we find only the
    //       database objects with the current
    //       STUDYSESSION-ID in the future!
    this.keywordObject.set(Keywords.find({"connectedStudySessionId": Meteor.userId()}).fetch());
    console.log(this.keywordObject.get());

    // Init flashcards if our keywords object is set.
    if (this.keywordObject) {
      setFlashcardText(0); // set 0 to currentIndex ??? TODO.
      console.log("a");
    }
  });

});

Template.flashcardPracticePage.helpers({
  flashcardText: function(){
    return  Template.instance().currentFlashcardText.get();
  },

  hiddenFlashcardText: function(){
    return  Template.instance().currentHiddenFlashcardText.get();
  },

  keywordObject: function(){
    return  Template.instance().keywordObject.get();
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
      console.log(Template.instance().keywordObject.get());
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

    // TODO clear form text
    changeFlashcardText();

  },

});
