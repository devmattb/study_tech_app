/**
*   Frequently Used Functions
**/

// Exits Session State:
function exit(){

  Session.set("ended", false);
  Session.set("paused", false);
  Session.set("cyclesDone", 0);
  FlowRouter.go("home");
  // TODO: Destroy Study Session?
  // TODO: Notify parents that student studied?
  // TODO: etc..

}

/**
*   Feedback forms select init.
*   (Without this <select>'s won't work.)
**/
Template.funniness.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});

Template.learningQuality.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});

Template.amountOfSessions.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});

Template.pauses.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});

Template.tooLong.onCreated(function(){
  // Update select.
  window.setTimeout(function(){
    $('select').material_select();
  },10);
});


/**
*   Form Submission Handling
**/
Template.funniness.events({
  "submit #funniness": function(e){
    e.preventDefault();
    const answer = $("#question").val();

    // Done
    exit();
    
  },
});

Template.learningQuality.events({
  "submit #learningQuality": function(e){
    e.preventDefault();
    const answer = $("#question").val();

    // Done
    exit();
    
  },
});

Template.amountOfSessions.events({
  "submit #amountOfSessions": function(e){
    e.preventDefault();
    const answer = $("#question").val();

    // Done
    exit();
    
  },
});

Template.pauses.events({
  "submit #pauses": function(e){
    e.preventDefault();
    const answer = $("#question").val();

    // Done
    exit();
    
  },
});

Template.tooLong.events({
  "submit #tooLong": function(e){
    e.preventDefault();
    const tooLong = $("#question").val();
    const howLong = $("#question2").val();
    if (tooLong === "true") {

    } else {
      // Do
    }

    // Done
    exit();
    
  },
  /**
  *   Dynamic display(s) of double-questions:
  **/
  "change #question": function(e){
    const val = $("#question").val();
    if (val === "true") {
      // Show next part of form:
      $("#q2Div").removeClass("hidden");
    } else {
      // Hide next part of form:
      $("#q2Div").addClass("hidden");
    }
  },
});
