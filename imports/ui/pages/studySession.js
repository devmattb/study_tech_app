/**
*   BUG/TODO 's:
*   Ta bort pausen i slutet.
*   Slutvillkor efter en studiesession är inte klara. diskutera med partners.
*
**/
import "./studySession.html";
import "../components/header.js"
import "../components/preloader.js"

import "../components/feedbackForms/activityRelated/funniness.js"
import "../components/feedbackForms/activityRelated/learningQuality.js"
import "../components/feedbackForms/schedulingRelated/amountOfSessions.js"
import "../components/feedbackForms/schedulingRelated/pauses.js"
import "../components/feedbackForms/schedulingRelated/tooLong.js"
import "../components/feedbackForms/userRelated/performance.js"

// General function imports.
import {pageInit} from "../../api/functions/pageInit"
import {addMinutes} from "../../api/functions/dateFunctions"
import {replaceAll} from "../../api/functions/replaceAll"
import {getRandNumList} from "../../api/functions/getRandNumList"
import {scaleSwitch} from "../../api/functions/scaleSwitch"

// Specific functions for this page.
import {getQuestionTemplateNames} from "../../api/functions/studySession/getQuestionTemplateNames"
import {initTimer} from "../../api/functions/studySession/initTimer"
import {stopTimer} from "../../api/functions/studySession/stopTimer"
import {nextCyclePrep} from "../../api/functions/studySession/nextCyclePrep"
import {updateStepIndicators} from "../../api/functions/studySession/updateStepIndicators"
import {getSSObjects} from "../../api/functions/studySession/getSSObjects"
import {subscriptions} from "../../api/subscriptions"

Template.studySession.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});


Template.studySession.onRendered(function(){
  pageInit();

  /**
  *   Takes a while to load in studysession info..
  *   Scale in when info is loaded on average (700ms)
  **/
  setTimeout(function(){
    // Show GUI and create stepIndicators:
    $("#gui").removeClass("scale-out");
    var numSteps = $(".descItem").length;
    for(var i = 0; i < numSteps; i++) {
      if ( i == 0 ) {
        $("#stepIndicators").append('<div class="stepIndicator activeStep"></div>');
      } else {
        $("#stepIndicators").append('<div class="stepIndicator"></div>');
      }
    }
  }, 700);

  // Timer variables:
  Session.set("paused", false);
  Session.set("cyclesDone", 0);
  // Feedback variables:
  Session.set("feedbackStep", 1);

});

/**
*   This function helps populate the content on the page "studySession",
*   The "studySession" page is used to display information about
*   specific scheduled study sessions to the user.
*   TODO: OPTIMIZE how we grab the details of the calendar events below:
**/
Template.studySession.helpers({

  // Displays the descripton of the activity:
  description: function(){
    // Get an array with a studySessionObj and a studyChainObj based of current URL id.
    var ssObjArr = getSSObjects();
    var studySessionObj = ssObjArr[0];
    if (studySessionObj) {
      // The study session always holds the id to the activity description:
      const activityObj = ActivityDescription.findOne({_id:studySessionObj.htmlDescriptionId});

      /**
      *   Manipulate the description:
      ***/
      if (activityObj) {
        var dbDesc = activityObj.desc;
        var showableDesc = replaceAll(dbDesc, '<li>', '<li style="max-width: 75%;" class="descItem scale-transition scale-out">');
        return showableDesc; // Returns the HTML code for this activity description.
      }
    }
  },

  // Displays the descripton of the activity:
  title: function() {
    // Get an array with a studySessionObj and a studyChainObj based of current URL id.
    var ssObjArr = getSSObjects();
    var studySessionObj = ssObjArr[0];
    if (studySessionObj) {
      return studySessionObj.title;
    }
  },

  // Displays the course name.
  courseName: function (){
    // Get an array with a studySessionObj and a studyChainObj based of current URL id.
    var ssObjArr = getSSObjects();
    var studyChainObj = ssObjArr[1];
    if (studyChainObj) {
      return studyChainObj.courseName;
    }
  },

  backBtnHref: function(){
    return Session.get("backBtnHref");
  },

  // Below are three variables used in the timer functionality:
  ended:function () {
    if (!Session.get("paused")) {
      if (Session.get("t")) {
        console.log(Session.get("t").total <= 0);
        return Session.get("ended");
      }
    } else {
      return false;
    }
  },

  paused:function() {
    //TODO: Don't pause last cycle.
    return Session.get("paused");
  },

  done:function(){
    return Session.get("cyclesDone") >= 3;
  },

  t: function () {
    return Session.get("t");
  },

  unitsPerSession: function () {
    // Get an array with a studySessionObj and a studyChainObj based of current URL id.
    var ssObjArr = getSSObjects();
    var studyChainObj = ssObjArr[1];
    if (studyChainObj) {
      return studyChainObj.unitsPerSession;
    }
  },

  pageMeasurement: function () {
    // Get an array with a studySessionObj and a studyChainObj based of current URL id.
    var ssObjArr = getSSObjects();
    var studyChainObj = ssObjArr[1];
    if (studyChainObj) {
      if ( studyChainObj.examinationType === "Glosor" ) {
        return false;
      } else {
        return true;
      }
    }
  },

  randomQuestions: function() {
    // Get the template names of two uniquely randomized numbers.
    return getQuestionTemplateNames(getRandNumList(0,3,2));
  },

});


/**
*   EVENTS: Mostly for handling the scripting of each session!
**/
// Step indicator variables:
var step = 1; // Keeps track of current activity step.
Template.studySession.events({

/**
*   Handles the hiding and showing of instructions.
*   All written in chronological order.
**/
"click #startCycle":function(event) {
  // Scale out "startDiv" and scale in "startCycleDiv"
  scaleSwitch("#startDiv", "#startCycleDiv");
},

"click #showPreparations":function(event) {
  // Scale out "repetitionDiv" and scale in "preparationsDiv"
  scaleSwitch("#repetitionDiv", "#preparationsDiv");
},

"click #startActivity":function(event) {
  // Initiate timer with 25 minutes on the clock.
  initTimer(25);

  // Scale out "startCycleDiv" and scale in "activityDiv"
  scaleSwitch("#startCycleDiv", "#activityDiv");
  setTimeout(function(){
    // Scale in current instruction.
    $(".descItem:nth-child("+step+")").removeClass("scale-out");
  }, 300);

},

/**
*   Go to the next step in our activity description:
**/
"click #nextStep":function(event) {
  var numSteps = $(".descItem").length; // Keeps track of total amount of steps.
  // Hide previous step:
  $(".descItem:nth-child("+(step)+")").addClass("scale-out");
  // Show next (now current) step:
  setTimeout( function(){
    if (step != numSteps) {
      step++;
      $(".descItem:nth-child("+step+")").removeClass("scale-out");
      // Set the next step as the active step:
      updateStepIndicators(step);
    } else {
      // Student is done with entire study session!
      // TODO: Give student a message saying he finished early?
      stopTimer();
      Session.set("paused", false);
      Session.set("ended", false);
      // Jump to end:
      step=1;
      Session.set("cyclesDone", 3);
    }
  }, 200);

},

/**
*   Go to the previous step in our activity description:
**/
"click #prevStep":function(event) {
  var numSteps = $(".descItem").length;
  if (step != 1) {
    // Hide previous step:
    $(".descItem:nth-child("+(step)+")").addClass("scale-out");
    // Show previous (now current) step:
    setTimeout( function(){
      step--;
      $(".descItem:nth-child("+(step)+")").removeClass("scale-out");
      updateStepIndicators(step);
    }, 200);
  }
},

/**
*   Enter Pause State
**/
"click #endActivity":function(event){
  scaleSwitch("#endActivityDiv", "#pauseDiv");
  setTimeout(function(){
    Session.set("paused", true);
    Session.set("ended", false);
    initTimer(10);
  }, 250);
},

/**
*   Exit Pause State Manually
**/
"click #endPause":function(event){
  stopTimer();
  Session.set("paused", false);
  Session.set("ended", false);
  nextCyclePrep();
},

});
