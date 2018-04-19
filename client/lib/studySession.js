/**
*   BUG/TODO 's:
*   Ta bort pausen i slutet.
*   Slutvillkor efter en studiesession är inte klara. diskutera med partners.
*
**/

/**
*   TIMER: Get the remaining time:
*   @param endtime is the Date object with the final time.
**/
var timeinterval;
function getTimeRemaining(endtime){

  var t = Date.parse(endtime) - Session.get('time');
  var seconds = ("0" + Math.floor( (t/1000) % 60 )).slice(-2);
  var minutes = ("0" + Math.floor( (t/1000/60) % 60 )).slice(-2);

  console.log(t)
  if(t <= 0)
    clearInterval(timeinterval);

  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };

}

function nextCyclePrep() {
  // Change intro text TODO:
  $("#gui #introText").addClass("hidden"); // Nu är det dags för rond "+ Session.get("cyclesDone")+"!".
  $("#gui #continueText").removeClass("hidden");
  // Make sure we add to our cycle count:
  Session.set("cyclesDone", Session.get("cyclesDone")+1);
}

/**
*   Initiates the timer with
*   @param m minutes countdown.
**/
function initTimer(m){
  /***
  *   Timer init
  ***/
  var endtime = new Date();
  endtime.addMinutes(m);
  timeinterval = setInterval(function () {

    /***
    *   End pause appropriately
    **/

    // Keep ticking...
    Session.set("time", new Date());
    var t = getTimeRemaining(endtime);
    if (Session.get("paused")) {
      if (t.total <= 0) {
        Session.set("paused", false);
        stopTimer();
        nextCyclePrep();
      }
    } else if (t.total <= 0) {
      Session.set("ended", true);
    }
    Session.set("t", t);
  }, 1000);
}

function stopTimer() {
  // Make the timer tick out, triggering the change to the page before Pause.
  Session.set("t",{
    'total': 0,
    'minutes': 0,
    'seconds': 0
  });
  // Stop the ticking:
  clearInterval(timeinterval);
}

function updateStepIndicators(s){
  $(".activeStep").removeClass("activeStep");
  $(".stepIndicator:nth-child("+s+")").addClass("activeStep");
}

function getRandNum(min,max){
  /**
  *   NOTE: You could make this more scalable by
  *   searching through the file tree and counting
  *   the numer of files in the partials/feedbackForms folder.
  **/
  return Math.floor(Random.fraction() * (max - min + 1)) + min;
}

/**
*   String.prototype.replaceAll() Function:
*
*   Replaces all occurences of the search 'string', with the 'replacement' string.
*   @param search Is the string you wish to search all occurences of.
*   @param replacement Is the string you wish to replace said occurences with.
*
**/
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/**
*   This function helps populate the content on the page "studySession",
*   The "studySession" page is used to display information about
*   specific scheduled study sessions to the user.
*   TODO: OPTIMIZE how we grab the details of the calendar events below:
**/
Template.studySession.helpers({

  // Displays the descripton of the activity:
  description: function(){
    // Find this particular study session
    var studySessionId = FlowRouter.getParam('_id');
    const studySessionObj = CalEvents.findOne({_id:studySessionId});

    // The study session always holds the id to the activity description:
    const activityObj = Activities.findOne({_id:studySessionObj.htmlDescriptionId});

    /**
    *   Manipulate the description:
    ***/
    var dbDesc = activityObj.desc;
    var showableDesc = dbDesc.replaceAll('<li>', '<li style="max-width: 75%;" class="descItem scale-transition scale-out">');

    return showableDesc; // Returns the HTML code for this activity description.
  },

  // Displays the descripton of the activity:
  title: function() {
    // Find this particular study session
    var studySessionId = FlowRouter.getParam('_id');
    const studySessionObj = CalEvents.findOne({_id:studySessionId});
    return studySessionObj.title;
  },

  // Displays the course name.
  courseName: function (){
    var studySessionId = FlowRouter.getParam('_id');
    const studySessionObj = CalEvents.findOne({_id:studySessionId});
    const studyChainObj = StudyChains.findOne({_id:studySessionObj.connectedStudyChainId});
    return studyChainObj.courseName;
  },

  backBtnHref: function(){
    return Session.get("backBtnHref");
  },

  // Below are three variables used in the timer functionality:
  ended:function () {
    if (!Session.get("paused")) {
      console.log(Session.get("t").total <= 0);
      return Session.get("ended");
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
    var studySessionId = FlowRouter.getParam('_id');
    const studySessionObj = CalEvents.findOne({_id:studySessionId});
    const studyChainObj = StudyChains.findOne({_id:studySessionObj.connectedStudyChainId});
    return studyChainObj.unitsPerSession;
  },

  pageMeasurement: function () {
    var studySessionId = FlowRouter.getParam('_id');
    const studySessionObj = CalEvents.findOne({_id:studySessionId});
    const studyChainObj = StudyChains.findOne({_id:studySessionObj.connectedStudyChainId});
    if ( studyChainObj.examinationType === "Glosor" ) {
      return false;
    } else {
      return true;
    }
  },

  randomQuestion: function() {
    var randNum = getRandNum(0,3);
    if (randNum == 0) {
      return "funniness";
    } else if (randNum == 1) {
      return "learningQuality";
    } else if (randNum == 2) {
      return "tooLong";
    } else if (randNum == 3) {
      return "pauses";
    }
    // TODO: If last study session, return "amountOfSessions"
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

  $("#startDiv").addClass("scale-out");
  setTimeout(function(){
    $("#startDiv").addClass("hidden");
  },200)
  setTimeout(function(){
    $("#startCycleDiv").removeClass("scale-out");
  }, 300);
},

"click #showPreparations":function(event) {

  $("#repetitionDiv").addClass("scale-out");
  setTimeout(function(){
    $("#repetitionDiv").addClass("hidden");
  },200)
  setTimeout(function(){
    $("#preparationsDiv").removeClass("scale-out");
  }, 300);
},

"click #startActivity":function(event) {

  initTimer(25);

  $("#startCycleDiv").addClass("scale-out");
  setTimeout(function(){
    $("#startCycleDiv").addClass("hidden");
  },200)
  setTimeout(function(){
    $("#activityDiv").removeClass("scale-out");
    $(".descItem:nth-child("+step+")").removeClass("scale-out");
  }, 550);
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
  $("#endActivityDiv").addClass("scale-out");
  setTimeout(function(){
    $("#endActivityDiv").addClass("hidden");
  },200)
  setTimeout(function(){
    Session.set("paused", true);
    Session.set("ended", false);
    initTimer(10);
  }, 250);
  setTimeout(function(){$("#pauseDiv").removeClass("scale-out");},400);
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
