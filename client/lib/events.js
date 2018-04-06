/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/

Template.calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'CalEvents' );
});

Template.calendar.onRendered( () => {
  let isPast = ( date ) => {
  let today = moment().format();
  return moment( today ).isAfter( date );
  };

  $('.schedule').fullCalendar({

      header: {
        // Buttons and header text:
        left: 'agendaWeek, month, list',
        center: 'title',
        right: 'prev, today, next'

      },
      allDayText: 'Deadlines', // Appears on top of the calendar issues.
      // Specifying our time ranges.
      minTime: '16:00:00',
      maxTime: '22:00:00',
      editable: false, // Not editable
      weekends: true, // Include weekends.
      defaultView: 'agendaWeek',
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

});
