import {Mongo} from "meteor/mongo"
import "../collections/studySession/studySession.js"
import "../collections/studyChain/studyChain.js"
// TODO: Remove imports and convert collection calls in to Meteor.methods.

/**
*   Initiates the calendar and enables it to fetch events realtime.
*   @param timeSpan The time span is used to give us all available timespan buttons.
***/
export function initCal(timeSpan) {
  // NOTE: We use the first given timeSpan from the input as the defaultView of the calendar.
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
        var userId = Meteor.userId();
        // OPTIMIZE: Put connectedUserId in a StudyChain object, and fetch from there...
        let data = StudySession.find({connectedUserId: userId}).fetch().map( ( event ) => {
          event.editable = !isPast( event.start );
          return event;
        });

        if ( data ) {
          callback( data );
        }
      },
      // Render events
      eventRender( event, element ) {
        // Find the icon to the event:
        const studyChain = StudyChain.findOne({_id: event.connectedStudyChainId});
        // Create the content of the event:
        element.find( '.fc-content' ).html(
          `
           <h4 class="white-text center">${ event.title }<br><br>
           <small style="font-size: 18px;" ><i class="${studyChain.icon}"></i></small>
           </h4>
          `
        );
        // Set the class that controls the events color based on what course name it has!
        element.addClass(studyChain.courseName.toLowerCase())
      }
  });

  Tracker.autorun( () => {
    // OPTIMIZE: Put connectedUserId in a StudyChain object, and fetch from there...
    var userId =  Meteor.userId();
    StudySession.find({connectedUserId: userId}).fetch();
    $( '.schedule' ).fullCalendar( 'refetchEvents' );
  });
}
