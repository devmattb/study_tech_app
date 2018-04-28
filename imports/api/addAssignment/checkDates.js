import {addHours} from '../dateFunctions.js';
import {addDays} from '../dateFunctions.js';

/**
*   TODO: Optimize when and correct time collision handling...
*   TODO: Don't compare start-time, only end time of existing and start-time of current try of scheduling?
*
*   checkDates()
*   Checks our already chosen date to schedule this, and sees if it's set at a forbidden date and time.
*   If we have scheduled at a forbidden time, reschedule this date.
*
*   @param preliminaryDateObj The preliminary START DateTime Date object for our study session.
*   @return currentDateString, the correctly scheduled date, formatted as a ForbiddenDateString.
**/
export function checkDates(preliminaryDateObj) {

  /**
  *   Refetch our alredy existing events from our database.
  **/
  var connectedUserId = Meteor.userId();
  var forbiddenDatesArr = new Array();
  var forbiddenDatesCollection = StudySession.find({connectedUserId, connectedUserId});
  forbiddenDatesCollection.forEach(function(data){
      forbiddenDatesArr.push(new Date(data.start)); // Add a Date Objects to our forbiddenTimesArr.
  });

  /**
  *   Look for DateTime collisions.
  **/
  for ( var i = 0; i < forbiddenDatesArr.length; i++ ) {
    // Compare the date differences and make sure they don't collide.
    var dateDiffMillisec = preliminaryDateObj-forbiddenDatesArr[i];
    if( dateDiffMillisec == 0 ) { // No date difference. Reschedule.
        var newDateObj;
        if ( preliminaryDateObj.getHours() <= 20 ) {
          // As long as we don't go past 20.00 as start time, add 2 hours to our interval.
          newDateObj = addHours(preliminaryDateObj,2);
        } else {
          // We've exceeded 20.00. Go to the next day. Start at 16.00
          newDateObj = addDays(preliminaryDateObj,2);
          newDateObj = addHours(preliminaryDateObj, -4);
        }

        // Recursive call
        return checkDates(newDateObj);
      }

    }
    // The entire forbidden Date array was okay. Add this date to our forbiddenDatesArr.
    //forbiddenDatesArr.push(preliminaryDateObj);
    return preliminaryDateObj; // Return this date
}
