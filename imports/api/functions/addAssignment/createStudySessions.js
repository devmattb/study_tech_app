import {addDays} from '../dateFunctions';
import {getNextWorkDay} from '../dateFunctions'
import {getPrevWorkDay} from '../dateFunctions'
import {daysBetween} from '../dateFunctions'
import {checkDates} from "./checkDates"
import {formatDayOrMonth} from "./formatDayOrMonth"

/**
*
*   createStudySessions():
*   creates study sessions for the user!
*
*   TODO: Forced to schedule less than we want? Notify user...
*   TODO: Prioritize days furthest away from deadline.
*   TODO: Prioritize times between 18-22, ASK USER????
*   TODO: Last few days, deviate from original elements, use for preparation of examination.
*
*   This function will determine when the student will be
*   scheduled and how he/she will be instructed to study.
*
*   @param desc is the description string grabbed from our database. It is the general tip description for the exType.
*   @param numStudySessions is the measurement for the examination. Which could mean the amount of pages, exercises or words required for the examination.
*   @param numAvailableDays is the number of days until the deadline is reached.
*   @param deadline is the users deadline.
*   @param pagesPerSession The number of pages per session in this activity chain.
*
**/
export function createStudySessions(courseName, exType, descIdArray, numStudySessions, numAvailableDays, deadline, pagesPerSession) {

  /**
  *    Variables that are to be altered by the algorithm...
  **/
  var title, type, startDate, endDate;

  /**
  *    Set a random work day start date.
  **/
  var maxRandNum = Math.ceil(numAvailableDays/4);
  var randAddDayNum = Math.floor(Math.random()*(maxRandNum - 1 + 1)) + 1;
  var startFromDay = getNextWorkDay(addDays(new Date(), randAddDayNum));

  /**
  *   Some more calculations before creating events.
  **/
  var studySessionsPerDay = Math.round(numStudySessions/numAvailableDays);
  var distancePerStudySession = Math.floor(numAvailableDays/numStudySessions);
  if ( studySessionsPerDay < 1 ) {
    studySessionsPerDay = 1; // Make sure we have atleast one study session a day.
  }
  if (distancePerStudySession < 1) {
    distancePerStudySession = 1;  // Make sure we have atleast one days break between them.
  }

  /**
  *   Before creating all the studySessions, we need to
  *   create the connected StudyChain
  **/
  let studyChain = {
    // TODO/OPTIMIZE Make sure this field is only in the studyChain collection objects:
    'connectedUserId': Meteor.userId(), 
    'courseName': courseName,
    'examinationType':exType,
    'deadline': deadline,
    'unitsPerSession': pagesPerSession,
  };

  /**
  *   Insertion of the current doc. Report any and all errors.
  **/
  Meteor.call("StudyChain.insert", studyChain);

  for ( var i = 0; i < numStudySessions; i++ ) {

    if ( i > 0 ) { // Schedule with our desired distance between study sessions.
      // Have the maximum distance between study sessions.
      startFromDay = getNextWorkDay(addDays(startFromDay, distancePerStudySession));

      // Safeguard in case we for some reason wind up after the deadline.
      // if ( daysBetween(startFromDay, deadline) < 0 ) {
      //   console.log("PAST DEADLINE");
      //   startFromDay = getPrevWorkDay(startFromDay);
      // }
    }

    for ( var j = 1; j <= studySessionsPerDay; j++ ) {

      /**
      *     Set preliminary event. Check if it's alright afterwards.
      *     TODO: Start at 22 if they like to study late, 18 if they like to study early. Machine Learning/Data Analytics..?
      **/

      // Create a new DateTime Date object.
      var preliminaryDateObj = new Date(""+startFromDay.getFullYear()
      +"-"+formatDayOrMonth(startFromDay.getMonth()+1)
      +"-"+formatDayOrMonth(startFromDay.getDate())
      + " 16:00:00");

      // Fix this date if it is scheduled illegally: NOTE: We start at 16-18 statically.
      // NOTE: If the date is okay, we will return first Date object.
      var currentDateObj;
      currentDateObj = checkDates(preliminaryDateObj);

      var startHours = currentDateObj.getHours();
      var endHours = currentDateObj.getHours()+2;
      var startDay = formatDayOrMonth(parseInt(currentDateObj.getDate()));
      var startMonth = formatDayOrMonth(parseInt(currentDateObj.getMonth())+1); // Month indexing starts at 0.
      var startYear = currentDateObj.getFullYear();

      /**
      *   We now know the date is okay.
      **/
      title = courseName+' '+ startHours +':00-'+ endHours+':00';

      var start = startYear+"-"+startMonth+"-"+startDay; // start and end have the same date, but not the same time.
      var end = start;

      /**
      *   Creation of the JSON object that is to be inserted.
      **/
      let doc = {
        'connectedStudyChainId': "DUMMY_ID", // e.g: qHfJWYf4uSgQ7CuMD
        'connectedUserId': Meteor.userId(),
        'htmlDescriptionId': descIdArray[i],
        'title': title,
        'start': start+" "+startHours+":00:00",
        'end': end+" "+endHours+":00:00", // e.g 2017-02-01 22:00:00 which is feb 2nd 22:00, 2017
        'url': "DUMMY_URL" // Updated after insert.
      };

      /**
      *   Insertion of the current doc.
      *   Needs to be deferred for studyChainId to be set before insertion of studysessions.
      **/
      Meteor.setTimeout(function(){
        Meteor.call("StudySession.insert", doc);
      }, 0);

      // If we added more than one study session this day.
      if ( j > 1 ) {
        numStudySessions--;
        i++; // So we go to the next desc.
      }

    }

  } // End of event creation...

  // SUCCESS ACTIONS:
  Materialize.toast('Lyckades!', 6000, "green");
  FlowRouter.go("calendar");
}
