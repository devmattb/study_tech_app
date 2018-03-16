/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/

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

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/**
*   PRELOADER
**/
Tracker.afterFlush(function() {

    // Animate loader off screen
    $("#preloader").fadeOut("slow");
    $("body").fadeIn("slow");

});

/**
*   ALL RENDERS:
**/

// HOME
Template.home.rendered = function(){

    pageInit();
    let isPast = ( date ) => {
    let today = moment().format();
    return moment( today ).isAfter( date );
    };

    $('.schedule').fullCalendar({

        header: {
          // Buttons and header text:
          left: 'agendaDay, list',
          center: 'title',
          right: 'prev, today, next'

        },
        allDayText: 'Deadlines', // Appears on top of the calendar issues.
        // Specifying our time ranges.
        minTime: '16:00:00',
        maxTime: '22:00:00',
        editable: false, // Not editable
        weekends: true, // Include weekends.
        defaultView: 'agendaDay',
        eventStartEditable: false,
        // Enabling list-view.
        listDayFormat: true,
        height: 450,

        /**
        *   Get events from DB
        **/
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
           <h4 class="white-text center">${ event.title }<br>
           <small><i class="fa fa-pie-chart"></i></small>
           </h4>
          `
          // <p class="type-${ event.type } white-text">#${ event.type }</p>
        ).attr("htmlDesc", event.htmlDescription);
        }
    });

    Tracker.autorun( () => {
      var eventsId = Meteor.userId();
      CalEvents.find({connectedUserId: eventsId}).fetch();
      $( '.schedule' ).fullCalendar( 'refetchEvents' );
    });


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
Template.calendar.rendered = function(){

    pageInit();
    $('ul.tabs').tabs();
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

// STUDY SESSION
Template.studySession.rendered = function(){
  /**
  *   PRELOADER
  **/
  setTimeout(function(){  $("#preloader").fadeOut("slow");}, 700);
  setTimeout(function(){  $("body").fadeIn("slow");}, 1000);

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
};
