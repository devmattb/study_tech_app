/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

function initCal(timeSpan) {
  // NOTE: The time span is used to give us all available timespan buttons.
  //       We use the first given timeSpan from the input as the defaultView of the calendar.
  const defaultView = timeSpan.split(", ");

  let isPast = ( date ) => {
    let today = moment().format();
    return moment( today ).isAfter( date );
  };

  $('.schedule').fullCalendar({

      header: {
        // Buttons and header text:
        left: timeSpan,
        center: 'title',
        right: 'prev, today, next'

      },
      allDayText: 'Deadlines', // Appears on top of the calendar issues.
      // Specifying our time ranges.
      minTime: '16:00:00',
      maxTime: '22:00:00',
      editable: false, // Not editable
      weekends: true, // Include weekends.
      defaultView: defaultView[0],
      eventStartEditable: false,
      // Enabling list-view.
      listDayFormat: true,
      height: 450,
      // Get events from DB
      events( start, end, timezone, callback ) {
        var eventsId = Meteor.userId();
        let data = CalEvents.find({connectedUserId: eventsId}).fetch().map( ( event ) => {
          event.editable = !isPast( event.start );
          return event;
        });

        if ( data ) {
          callback( data );
        }
      },
      // Render events
      eventRender( event, element ) {

      // TODO: Add subject/study tech symbol to html event.
      //if (event.type == "Math") { }
        element.find( '.fc-content' ).html(
          `
           <h4 class="white-text center">${ event.title }<br><br>
           <small style="font-size: 18px;" ><i class="${event.icon}"></i></small>
           </h4>
          `
        )
        // Set the class that controls the events color based on what course name it has!
        element.addClass(event.type.toLowerCase())
      }
  });

  Tracker.autorun( () => {
    var eventsId =  Meteor.userId();
    CalEvents.find({connectedUserId: eventsId}).fetch();
    $( '.schedule' ).fullCalendar( 'refetchEvents' );
  });
}

function pageInit() {

    /**
    *   PRELOADER
    **/
    $("#preloader").fadeOut("slow");
    $("body").fadeIn("slow");

    /**
    *      NAV INITIALIZATION
    **/
    // Initialize sidenav button
     $(".button-collapse").sideNav({'closeOnClick': true});

    // Initialize modal
    $('.modal').modal();

    $('select').not('disabled').material_select();

    $('ul.tabs').tabs();

    $(".userAgreementLink").click(function(){
       $('#userAgreement').modal('open');
    });

}

/**
*   ALL RENDERS:
**/

// HOME
Template.home.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'CalEvents' );
});

Template.home.rendered = function(){
    pageInit();
    initCal('agendaDay');
};

// LOGIN
Template.login.rendered = function(){
    pageInit();
};

// CREATE ACCOUNT
Template.createAccount.rendered = function(){
    pageInit();
};

// CALENDAR ACCOUNT
Template.calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'CalEvents' );
});

Template.calendar.rendered = function(){
    pageInit();
    $('ul.tabs').tabs();
    initCal('agendaWeek, month');
};

// NEW COURSE
Template.newCourse.rendered = function(){
    pageInit();

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: false, // Creates a dropdown of 15 years to control year,
      today: 'Idag',
      clear: 'Ångra',
      close: 'Ok',
      formatSubmit: 'yyyy-mm-dd',
      closeOnSelect: true // Close upon selecting a date,
    });
};


Date.prototype.addMinutes = function(m) {
   this.setTime(this.getTime() + (m*60*1000));
   return this;
}

var timeinterval;
Template.studySession.rendered = function(){
  /**
  *   PRELOADER
  **/
  setTimeout(function(){  $("#preloader").fadeOut("slow");}, 700);
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
  }, 1000);

  /**
  *      NAV INITIALIZATION
  **/
  // Initialize sidenav button
   $(".button-collapse").sideNav({'closeOnClick': true});

  // Initialize modal
  $('.modal').modal();

  $('select').not('disabled').material_select();

  $('ul.tabs').tabs();

  $(".userAgreementLink").click(function(){
     $('#userAgreement').modal('open');
  });

  // Timer variables:
  Session.set("paused", false);
  Session.set("cyclesDone", 0);

};
