/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
*   TODO: IMPORTANT - Rewrite so we use 1 database instead of 3.
***/

var connectedUserId;
Template.newCourse.onCreated(function(){

  // Course variables. Regulates examinationType options.
  this.examinationTypeTemplate = new ReactiveVar("noCourseType");

  // examinationType variables. Regulates studyScope options.
  this.omfattningTypeTemplate = new ReactiveVar();

  // Get the user ID:
  connectedUserId = Meteor.userId();
});

/**
*   HIDES SECOND PART OF THE NEW COURSE FORM.
**/
Template.newCourse.onRendered(function(){
    // Hiding second part of the form.
    $("#newCoursePartTwo").hide();

});

/**
*   DATE FUNCTIONS:
**/
Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

Date.prototype.addHours = function(h) {
   this.setTime(this.getTime() + (h*60*60*1000));
   return this;
}

Date.daysBetween = function( date1, date2 ) {   //Get 1 day in milliseconds
  var one_day=1000*60*60*24;    // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();    // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;        // Convert back to days and return
  return Math.round(difference_ms/one_day);
}

function formatDayOrMonth(dateNum){
  if (parseInt(dateNum) < 10 ) {
    dateNum = "0"+dateNum; // Make sure we have a zero before the numbers.
  }
  return dateNum;
}

function getCourseType(courseName) {

  if (courseName === "Matematik" || courseName === "Fysik") {
    return "Kvantitativ";
  } else if (courseName === "Svenska" || courseName === "Engelska" || courseName === "Andravalsspråk") {
    return "Språk";
  } else { // Annars borde det vara ett kunskapsämne.
    return "Kunskapsämne";
  }

}

/**
*
*   calcNumAvailableDays():
*   Calculates the number of study dayse available to the student, with consideration to
*   todays date, and the deadline date.
*
*   @param deadline is a time of submission/examination. Formatted: YYYY-MM-DD hh:mm:ss, e.g: '2018-01-01 18:00:00'
*   @return numAvailableDays variable, determines the number of available days we can study on.
*
**/
function calcNumAvailableDays(deadline) {

   var today= new Date();
   var tomorrow = today.addDays(1); // Don't start today.
   return Date.daysBetween(tomorrow, deadline);

}

/**
*
*   returnExTypeResult():
*   Checks what examinationType we have, and returns a given result.
*   This function was made to shorten code.
*   @param exType is the Examination Type.
*   @param mun is the return value for exType === "Muntlig Redovisning"
*   @param skr is the return value for exType === "Skriftligt Prov"
*   @param lit is the return value for exType === "Litteraturanalys"
*   @param glo is the return value for exType === "Glosor"
*   @param upp is the return value for exType === "Uppsats"
*
**/
function returnExTypeResult (exType, mun, skr, lit, glo, upp) {

  if ( exType === "Muntlig Redovisning" ) {
    return mun;
  } else if ( exType === "Skriftligt Prov" ) {
    return skr;
  } else if ( exType === "Litteraturanalys" ) {
    return lit;
  } else if ( exType === "Glosor" ) {
    return glo;
  } else if ( exType === "Uppsats" ) {
    return upp;
  }

}


/**
*
*   getMinimumNumSesh():
*   Gets the minumum amount of sessions for a specific
*   course+examination-type combination
*   @param cType is the Course Type.
*   @param exType is the Examination Type.
*
**/
function getMinimumNumSesh(cType, exType) {

  var minSessions;
  if ( cType === "Språk" ) {
    minSessions = returnExTypeResult(exType, 4,3,3,1,4);
  } else if ( cType === "Kunskapsämne" ) {
    minSessions = returnExTypeResult(exType, 4,3,null,null,4);
  } else if ( cType === "Kvantitativ" ) {
    minSessions = returnExTypeResult(exType, null,3,null,null,null);
  }
  return minSessions;

}

/**
*
*   calcNumStudySessions():
*   Calculates the number of study sessions we need to schedule this student for.
*
*   Use static table for Muntligt/Glosor, defined below:
*         Muntligt = 5/3/3/2 sessions max, both. MaxGym/NormGym/Max9-6/Norm9-6
*         Glosor = 3/2/2/2 sessions max, both. MaxGym/NormGym/Max9-6/Norm9-6
*
*   For any Other examinationType, use our tables defined in docs, with a dynamic study scope adjustment.
*
*   TODO: Ta hänsyn till omfattning på muntlig redovisning?
*   TODO: Ta hänsyn till kurstyp?
*   @param examinationType Muntlig Redovisning, Glosor or Other
*   @param ambitionLevel is Normal or Ambitiös.
*   @param schoolGrade is true if 6-9, false if "Gymnasiet"
*   @param studyScopeLevel is Low, Medium or High.
*   @param numAvailableDays is the number of days until the deadline is reached.
*   @return numStudySessions variable, determing the number of study sessions we need.
*
**/
function calcNumStudySessions( examinationType, ambitionLevel, schoolGrade, studyScopeLevel, numAvailableDays ) {

  var numStudySessions;
  // numStudySessions needs to be calculated
  if ( examinationType !=  "Muntlig Redovisning" && examinationType != "Glosor" ) {

      if ( schoolGrade == "Gymnasiet" && ambitionLevel == "Ambitiös" ) {
      // Gymnasiet, Ambitiös, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 18;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 14;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 5  ) {
          numStudySessions = 12;
        } else if ( numAvailableDays < 5 ) {
          numStudySessions = numAvailableDays * 2;
        }

      } else if ( schoolGrade == "Gymnasiet" && ambitionLevel == "Normal" ) {
      // Gymnasiet, Normal, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 14;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 10;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 5  ) {
          numStudySessions = 9;
        } else if ( numAvailableDays < 5 ) {
          numStudySessions = numAvailableDays * 2;
        }

      } else if ( schoolGrade == "8or9" && ambitionLevel == "Ambitiös" ) {
      // 9-8, Ambitiös, Other

      // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
      if ( numAvailableDays > 14 ) {
        numStudySessions = 14;
      } else if ( numAvailableDays > 9 ) {
        numStudySessions = 10;
      } else if ( numAvailableDays <= 9 && numAvailableDays >= 5  ) {
        numStudySessions = 9;
      } else if ( numAvailableDays < 5 ) {
        numStudySessions = numAvailableDays * 2;
      }

    } else if ( schoolGrade == "8or9" && ambitionLevel == "Normal" ) {
      // 9-8, Normal, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 10;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 7;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 3  ) {
          numStudySessions = 5;
        } else if ( numAvailableDays < 3 ) {
          numStudySessions = numAvailableDays * 2;
        }

      } else if ( schoolGrade == "6or7" && ambitionLevel == "Ambitiös" ) {
      // 7-6, Ambitiös, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 10;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 7;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 3  ) {
          numStudySessions = 5;
        } else if ( numAvailableDays < 3 ) {
          numStudySessions = numAvailableDays * 2;
        }

      } else if ( schoolGrade == "6or7" && ambitionLevel == "Normal" ) {
      // 7-6, Normal, Other

        // Go through our "High" studyScopeLevel table. if lower studyScopeLevel, fix in the end of function.
        if ( numAvailableDays > 14 ) {
          numStudySessions = 8;
        } else if ( numAvailableDays > 9 ) {
          numStudySessions = 6;
        } else if ( numAvailableDays <= 9 && numAvailableDays >= 3  ) {
          numStudySessions = 5;
        } else if ( numAvailableDays < 3 ) {
          numStudySessions = numAvailableDays * 2;
        }

      }

      // STUDY SCOPE ADJUSTER. If the studyScopeLevel is not high, lower the amount of study sessions.
      if ( studyScopeLevel == "Medium" ) {
        numStudySessions = Math.round(numStudySessions * 0.7);
      } else if ( studyScopeLevel == "Low" ) {
        numStudySessions = Math.round(numStudySessions * 0.5);
      }

  // numStudySessions needs to be picked out from our static table of numbers.
  } else {

      if ( schoolGrade == "Gymnasiet") {
        // School grade is Gymnasiet.
        if ( ambitionLevel == "Ambitiös" ) {
          if ( examinationType == "Muntlig Redovisning" ) {
            // Gymnasiet, Ambitiös, Muntlig
            numStudySessions = 5;
          } else {
            // Gymnasiet, Ambitiös, Glosor
            numStudySessions = 3;
          }
        } else {
          // Ambition level is Normal
          if ( examinationType == "Muntlig Redovisning" ) {
            // Gymnasiet, Normal, Muntlig
            numStudySessions = 3;
          } else {
            // Gymnasiet, Normal, Glosor
            numStudySessions = 2;
          }
        }

      } else {
        // School grade is not gymnasiet.
        if ( ambitionLevel == "Ambitiös" ) {
          if ( examinationType == "Muntlig Redovisning" ) {
            // NOT-Gymnasiet, Ambitiös, Muntlig
            numStudySessions = 3;
          } else {
            // NOT-Gymnasiet, Ambitiös, Glosor
            numStudySessions = 2;
          }

        } else {
          // Ambition level is Normal
          if ( examinationType == "Muntlig Redovisning" ) {
            // NOT-Gymnasiet, Normal, Muntlig
            numStudySessions = 2;
          } else {
            // NOT-Gymnasiet, Normal, Glosor
            numStudySessions = 2;
          }
        }

      }
  }
  // RETURN OUR CALCULATED numStudySessions !
  return numStudySessions;
}

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
function checkDates(preliminaryDateObj) {

  /**
  *   Refetch our alredy existing events from our database.
  **/
  var forbiddenDatesArr = new Array();
  var forbiddenDatesCollection = CalEvents.find({connectedUserId, connectedUserId});
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
          newDateObj = preliminaryDateObj.addHours(2);
        } else {
          // We've exceeded 20.00. Go to the next day. Start at 16.00
          newDateObj = preliminaryDateObj.addDays(2);
          newDateObj = newDateObj.addHours(-4);
        }

        // Recursive call
        return checkDates(newDateObj);
      }

    }
    // The entire forbidden Date array was okay. Add this date to our forbiddenDatesArr.
    //forbiddenDatesArr.push(preliminaryDateObj);
    return preliminaryDateObj; // Return this date
}


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
function createStudySessions(courseName, exType, descIdArray, numStudySessions, numAvailableDays, deadline, pagesPerSession) {

  numAvailableDays -= 1; // Don't study the last day.

  /**
  *    Variables that are to be altered by the algorithm...
  **/
  var title, type, startDate, endDate;

  /**
  *    Get the time of the events that are already scheduled, so we do not schedule
  *    over these. Also, get the forbidden schedule times.
  **/
  var startFromDay = new Date();

  /**
  *   Create all events!
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
  *   create the connected studyChain
  **/
  /**
  *   Creation of the JSON object that is to be inserted.
  **/
  let studychain = {
    'courseName': courseName,
    'examinationType':exType,
    'deadline': deadline,
    'unitsPerSession': pagesPerSession,
  };

  var studyChainId;

  /**
  *   Insertion of the current doc. Report any and all errors.
  **/
  StudyChains.insert(
    studychain,
    function(error, studychain_id) {
      if ( error ) {
        console.log ( error ); //info about what went wrong
        Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
        return; // Stop exec
      } else {
        // Everything went smoothly...
        // Make note of the studychain id, that is to be inserted
        // in all the studysessions.
        studyChainId = studychain_id;
      }
    }
  );

  for ( var i = 0; i < numStudySessions; i++ ) {

    if ( i > 0 ) { // Schedule with our desired distance between study sessions.
      // Have the maximum distance between study sessions.
      startFromDay = startFromDay.addDays(distancePerStudySession);
    } else {
      // Don't start today.
      startFromDay = startFromDay.addDays(1);
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
        'connectedStudyChainId': studyChainId, // e.g: qHfJWYf4uSgQ7CuMD
        'connectedUserId': connectedUserId,
        'htmlDescriptionId': descIdArray[i],
        'title': title,
        'start': start+" "+startHours+":00:00",
        'end': end+" "+endHours+":00:00", // e.g 2017-02-01 22:00:00 which is feb 2nd 22:00, 2017
        'url': "DUMMY_URL" // Updated after insert.
      };

      /**
      *   Insertion of the current doc. Report any and all errors.
      **/
      CalEvents.insert(
        doc,
        function(error, doc_id) {
          if ( error ) {
            console.log(descIdArray[i]);
            console.log ( error ); //info about what went wrong
            Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
            return; // Stop exec
          } else {
            // Everything went smoothly...
            /**
            *   UPDATE meetings url to its id.
            *   This makes each study session uniquely clickable.
            **/
            var uniqueUrl = Meteor.absoluteUrl("studySession/"+doc_id, {});
            doc.url = uniqueUrl; // Update doc with new url
            doc.connectedStudyChainId = studyChainId;
            Meteor.call("eventUpsert", doc_id, doc);
          }
        }
      );


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
/**
*   theMMRAlgorithm():
*   Takes all the calculations and puts them together to schedule the student.
*
*   calcNumAvailableDays param:
*   @param deadline is a time of submission/examination. Formatted: YYYY-MM-DD hh:mm:ss, e.g: '2018-01-01 18:00:00'
*
*   calcNumStudySessions params:
*   @param examinationType Muntlig Redovisning, Glosor or Other
*   @param ambitionLevel is Normal or Ambitiös.
*   @param schoolGrade is true if 6-9, false if "Gymnasiet"
*   @param studyScopeLevel is Low, Medium or High.
*   numAvailableDays is also used here.
*
*   createStudySessions params:
*   @param descIdArray is the list of description strings grabbed from our database. It is the general tip description for the exType.
*   @param numStudySessions is the number of study sessions we want to schedule in.
*   numAvailableDays is also used here.
*
**/
function theMMRAlgorithm(deadline, courseName, courseType, examinationType, ambitionLevel, schoolGrade, studyScopeLevel, studyScope) {

    // Start by calculating the two most important variables to create study sess
    var numAvailableDays = calcNumAvailableDays(deadline);
    var numStudySessions = calcNumStudySessions(examinationType,ambitionLevel,schoolGrade,studyScopeLevel,numAvailableDays);

    /**
    *   Calculate the recommended pages per session interval:
    **/
    var pagesPerSession, pagesInterval;
    pagesInterval = studyScope.split("-");
    // We round up because the student might not always do the maximum amount of pages.
    pagesPerSession = Math.ceil(parseInt(pagesInterval[0])/numStudySessions)+"-"+Math.ceil(parseInt(pagesInterval[1])/numStudySessions);

    /**
    *   Variables that help us fetch the correct description sequence:
    *   cycles: The number of cycles we can manage before the deadline is upon us.
    *   numOptional: The number of optional activities we can squeeze in.
    **/
    var minNumSesh = getMinimumNumSesh(courseType, examinationType);
    // Calculate number of cycles:
    var cycles = Math.floor(numStudySessions/minNumSesh);
    // Get the number of optional activities we have time for:
    var numOptional = numStudySessions - cycles*minNumSesh;
    // IMPORTANT: Changing numStudySessions so that it matches our cycles+numOptional
    numStudySessions = cycles+numOptional;

    // Fetches the right description array, based on our course and examination type:
    var descIdArray = new Array();
    descIdArray = activityDesc(courseType, examinationType, numOptional, cycles);

    // NOTE: Uncomment to test the first two functions.
    //console.log("numAvailableDays: " + numAvailableDays + " numStudySessions: " + numStudySessions);

    // Fix the deadline format.
    var deadlineYear = deadline.getFullYear();
    var deadlineMonth = deadline.getMonth()+1;// Month starts at 0.
    var deadlineDay = deadline.getDate();

    if ( deadlineMonth < 10 ) {
      deadlineMonth = "0"+deadlineMonth;
    }

    if ( deadlineDay < 10 ) {
      deadlineDay = "0"+deadlineDay;
    }

    var deadlineFormatted = deadlineYear+"-"+deadlineMonth+"-"+deadlineDay+" 23:00:00"
    createStudySessions(courseName, examinationType, descIdArray, numStudySessions, numAvailableDays, deadlineFormatted, pagesPerSession);

}

/**
*   Depending on course and examination type, gets the connected description!
**/
function activityDesc(cType, exType, numOptional, cycles) {

  var allActivityObj = Activities.find();
  var activityArray = new Array();
  var listActivityIds = new Array();

  // Get the entire description sequence, for all cycles:
  for (var k = 0; k < cycles; k++) {

      /**
      *   Get all activities that match our course-and-examination type from
      *   our DB in to an Array, called activityArray.
      **/
      allActivityObj.forEach(function(data){

        // Loop: Go through the coursetypes of each activity object.
        for (var i = 0; i < data.courseType.length; i++) {

          if (data.courseType[i] === cType && data.examinationType[i] === exType)  {

            if ( k > 0 ) {
              // Make sure we get the activities in the right order.
              // This is not the first cycle so when we sort later we
              // need to know that this will NOT be in the first phase for example.
              data.phase[i] = data.phase[i] * 5*k;
            }

            // Add this particular index to our JSON object,
            // So we know exactly what spot to look in the
            // phase, phaseOrder and examinationType array.
            if (data.optional[i] === true && numOptional > 0) {
              // This is an optional Activity. But we still have room for some.
              data.relevantIndex = i;
              activityArray.push(data); // Add to our activityArray.
              numOptional--;            // Decrement the number of optionals we have space for.
              i++;                      // Do not count this cycle iteration, since its an optional activity.
              break;                    // Break out of loop. Go to next activity.
            } else if (data.optional[i] === false) {
              // This is a mandatory activity. Add it.
              data.relevantIndex = i;
              activityArray.push(data); // Add to our forbiddenTimesArr.
              break;                    // Break out of loop. Go to next activity.
            }
          }

        }

      });
    } // Now we have the entire activity sequence, for all cycles, ready for sorting!


  // Sorts all activities in Ascending order, in this array,
  // according to their phase and phaseOrder. Chronological phases...
  activityArray.sort(function(dataA, dataB){

    if ( dataA.phase[dataA.relevantIndex] == dataB.phase[dataB.relevantIndex] ) { // Same phase.
      return dataA.phaseOrder[dataA.relevantIndex]-dataB.phaseOrder[dataB.relevantIndex]; // Sort by internal phaseOrder instead...
    } else { // Not same phase
      return dataA.phase[dataA.relevantIndex]-dataB.phase[dataB.relevantIndex]; // Sort by phase.
    }

  });

  // Put only the description strings of these activities in a list.
  // Note that this list is still sorted.
  activityArray.forEach(function(data){
      listActivityIds.push(data._id); // Add to our forbiddenTimesArr.
  });

  console.log(listActivityIds.toString());

  if ( listActivityIds[0] ) {
    // We found our description for this course and examination type combination. Algorithm time.
    return listActivityIds; //Needed for the MMR algorithm
  } else {
    // ERROR: Could not find description?
    Materialize.toast('Något gick fel med att hämta studiesessions-beskrivningen!', 4000, "red");
    return;
  }

}


/**
*   HANDLES ALL EVENTS ON THIS TEMPLATE.
**/
Template.newCourse.events({

/**
*   Handles the hiding and showing of forms.
**/
"click #nextPartBtn":function(event) {
  event.preventDefault();
  // Make sure all options have been selected.
  if (
    $("#selectOne").val() != null && $("#selectOne").val() != undefined &&
    $("#selectTwo").val() != null && $("#selectTwo").val() != undefined &&
    $("#selectThree").val() != null && $("#selectThree").val() != undefined
  ) {

    $("#newCoursePartOne").fadeOut(100);
    window.setTimeout(function(){
        $("#newCoursePartTwo").fadeIn(100);
    },200);

  } else {
    // User did not fill all three fields.
    Materialize.toast('Du har glömt att fylla i några detaljer!', 4000, "red");
  }

},

"click #backFormBtn":function(event) {
    event.preventDefault();
    $("#newCoursePartTwo").fadeOut(100);
    window.setTimeout(function(){
        $("#newCoursePartOne").fadeIn(100);
    },200);

},

/**
*   Handles the new course submission to the app.
**/
"submit #newCourseForm ":function(event) {

  //Prevent default redirect.
  event.preventDefault();

  //$("#courseType").val().toString();
  const target = event.target;
  const courseName = target.courseName.value; // get course value
  const courseType = getCourseType(courseName); // get course value
  const schoolGrade = target.schoolGrade.value;
  const ambitionLevel = target.ambitionLevel.value;
  const examinationType = target.examinationType.value;
  const studyScope = target.studyScope.value;

  // Get the deadline...
  let year = $('.datepicker').pickadate('picker').get('highlight', 'yyyy');
  let day = $('.datepicker').pickadate('picker').get('highlight', 'dd');
  let month = $('.datepicker').pickadate('picker').get('highlight', 'mm');
  const deadline = new Date(year,month-1,day); //NOTE: When we calculate the numAvailableDays month index starts at 0.

  // NOTE: Test fetcher:
  // alert("Kurstyp: " + courseType + "\nÅrskurs: " + schoolGrade
  // + "\nExaminationstyp: " +  examinationType + "\nAmbitionsnivå: " + ambitionLevel);

  if (!examinationType || !studyScope || !deadline || !courseType || !ambitionLevel || !studyScope) {
    Materialize.toast('Du har glömt att fylla i några detaljer!', 4000, "red");
    return;
  }

  FlowRouter.route("/newCourse");

  /**
  *   The Low/Medium/High studyScopeLevel Table/Matrix:
  **/
  var studyScopeLevel;
  if ( examinationType != "Glosor" && examinationType != "Muntlig Redovisning" ) {
    // Our measurement for study scope is "course book pages".

    if ( studyScope === "0-10" || studyScope === "10-20" || studyScope === "20-30" ) {
      studyScopeLevel = "Low"; // This is considered a low workload.
    } else if ( studyScope === "30-40" || studyScope === "40-50" || studyScope === "50-60" ) {
      studyScopeLevel = "Medium"; // This is considered a medium workload.
    } else {
      studyScopeLevel = "High"; // Anything else is considered a high workload.
    }

  } else {
    // The study scope level does not matter if we have Muntlig/Glosor.
    studyScopeLevel = "NOT_USED";
  }

  /**
  *   FINALLY. Apply the MMR Algorithm.
  **/
  theMMRAlgorithm(deadline, courseName, courseType, examinationType, ambitionLevel, schoolGrade, studyScopeLevel, studyScope);

},

  /**
  *   Change examinationType according to courseType
  **/
  "change #selectOne": function(){
    // Get the course TYPE for this specific course NAME.
    const val = getCourseType($("#selectOne").val());
    if ( val == "Kvantitativ" ) {
      Template.instance().examinationTypeTemplate.set("KvantitativOptions");
    } else if ( val == "Språk" ) {
      Template.instance().examinationTypeTemplate.set("SpråkOptions");
    } else if ( val == "Kunskapsämne") {
      Template.instance().examinationTypeTemplate.set("KunskapsämneOptions");
    }
    // Update select.
    window.setTimeout(function(){
      $('select').material_select();
    },10);
  },

  "change #selectThree": function(){
    const val = $("#selectThree").val();
    if ( val == "Skriftligt Prov" ) {
      Template.instance().omfattningTypeTemplate.set("SkriftligtOptions");
    } else if ( val == "Litteraturanalys" ) {
      Template.instance().omfattningTypeTemplate.set("LitteraturOptions");
    } else if ( val == "Muntlig Redovisning") {
      Template.instance().omfattningTypeTemplate.set("MuntligOptions");
    } else if ( val == "Glosor") {
      Template.instance().omfattningTypeTemplate.set("GlosorOptions");
    } else if ( val == "Uppsats") {
      Template.instance().omfattningTypeTemplate.set("UppsatsOptions");
    }

    // Update select.
    window.setTimeout(function(){
      $('select').material_select();
    },10);
  },

});


Template.newCourse.helpers({

  // Course variables. Regulates examinationType options.
  exTypeOptions: function(){
    return Template.instance().examinationTypeTemplate.get();
  },

  // examinationType variables. Regulates studyScope options.
  omfattningTypeOptions: function(){
    return Template.instance().omfattningTypeTemplate.get();
  },


});
