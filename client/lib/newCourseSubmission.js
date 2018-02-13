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

Template.newCourse.onCreated(function(){

  // Course variables. Regulates examinationType options.
  this.examinationTypeTemplate = new ReactiveVar("noCourseType");

  // examinationType variables. Regulates studyScope options.
  this.omfattningTypeTemplate = new ReactiveVar();


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

Date.daysBetween = function( date1, date2 ) {   //Get 1 day in milliseconds
  var one_day=1000*60*60*24;    // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();    // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;        // Convert back to days and return
  return Math.round(difference_ms/one_day);
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

   //var y2k  = new Date(2000, 0, 1);
   //var Jan1st2010 = new Date(y2k.getFullYear() + 10, y2k.getMonth(), y2k.getDate());

   var today= new Date(); //displays 726
   var tomorrow = today.addDays(1); // Don't start today.
   return Date.daysBetween(tomorrow, deadline);

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
*   @param forbDatesArr Is an array of forbidden dates, formatted as a ForbiddenDateString
*   @param startDay Start day, e.g "28"
*   @param startMonth Start month, e.g "02"
*   @param startYear Start year, e.g "2018"
*   @param currentEntireDate current scheduled date, in Date class format.
*   @return currentDateString, the correctly scheduled date, formatted as a ForbiddenDateString.
**/
function checkDates(forbDatesArr, startHour, endHour, startDay, startMonth, startYear, currentEntireDate) {
console.log("B4B4 "+startHour + " " +endHour);
  // Fix formatting...
  if (parseInt(startMonth) < 10 && startMonth.toString().substring(0,1) != "0") {
    startMonth = "0"+startMonth; // Make sure we have a zero before the numbers.
  }

  if (parseInt(startDay) < 10 && startDay.toString().substring(0,1) != "0") {
    startDay = "0"+startDay; // Make sure we have a zero before the numbers.
  }

  // Always try to schedule from 16-18, and fix the date if it's illegal. TODO: Optimize.
  var currentDateString = startHour+endHour+startDay+startMonth+startYear;

  if (parseInt(startHour)>16) {
    console.log("HM "+startHour + " " +endHour);
    console.log("HM "+currentDateString );
  }

  //console.log("ZZZ "+currentDateString + " " + forbDatesArr[i]);
  for ( var i = 0; i < forbDatesArr.length; i++ ) {
  //console.log("ZERO "+currentDateString + " " + forbDatesArr[i]); // BUG: Check CalEvent DB and Check currentDateString...
    if( currentDateString == forbDatesArr[i]) {
      //Reschedule the date. A Date Collision has occured.
    console.log("ONE "+currentDateString + " " + forbDatesArr[i]);
      // This whole day was completely booked.
      if ( endHour == "24" ) {

        startHour = "16";
        endHour = "18";

        // Reconstruct our currentDateString, with all updated parameters, in next function call:
        currentEntireDate.addDays(1); // BUG: Not sure if this changes outside this function too, for further use when scheduling other events... Create a pointer?
        startDay = currentEntireDate.getDate();
        startMonth = currentEntireDate.getMonth()+1; // Month starts at 0.
        startYear = currentEntireDate.getFullYear();

        checkDates(forbDatesArr, startHour, endHour, startDay, startMonth, startYear, currentEntireDate);
        return;
      } else { // This day is hopefully not entirely booked, yet.

        var incrementationStep = (Math.floor(Math.random() * 2) + 1)*2;
        console.log("B4 "+startHour + " " +endHour);
        startHour=(parseInt(startHour)+incrementationStep).toString();
        endHour=(parseInt(endHour)+incrementationStep).toString();
        console.log("AFTER "+startHour + " " +endHour);

        // TODO
        // return currentDateString;
        checkDates(forbDatesArr, startHour, endHour, startDay, startMonth, startYear, currentEntireDate);
        currentDateString = startHour+endHour+startDay+startMonth+startYear; //TODO...
        return currentDateString;
      }

    }
  }

  return currentDateString;

}

function checkDatesHelper(forbDates, currentDateString) {

  for ( var i = 0; i < forbDatesArr.length; i++ ) {


  }

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
*
**/
function createStudySessions(descArray, numStudySessions, numAvailableDays, deadline) {

  numAvailableDays -= 1; // Don't study the last day.

  /**
  *    Variables that are to be altered by the algorithm...
  **/
  var htmlDescFormat, title, type, startDate, endDate;
  const connectedUserId = Session.get("id").toString();

  /**
  *    Get the time of the events that are already scheduled, so we do not schedule
  *    over these. Also, get the forbidden schedule times.
  **/
  var startFromDay = new Date();

  //console.log("START FROM: "+ startFromDay.getYear());

  var justYMD;
  var forbiddenDateString;
  var forbiddenDatesArr = new Array();
  var forbiddenDatesCollection = CalEvents.find({connectedUserId, connectedUserId});
  forbiddenDatesCollection.forEach(function(data){
      /**
      *   To filter out forbidden dates easily, we construct a standard format of dates, using strings. The format looks like the following:
      *
      *   ForbiddenDateString Format:   START-TIME+END-TIME+DAY+MONTH+YEAR
      *
      *   Where we get these paramaters from the students current schedule in our database:
      *
      *   START-TIME:             data.start.substring(11,13)
      *   END-TIME:               data.end.substring(11,13)
      *   DAY:                    data.start.substring(8,10)
      *   MONTH:                  data.start.substring(5,7)
      *   YEAR:                   data.start.substring(0,4)
      **/
      forbiddenDateString =
      data.start.substring(11,13)+ // START-TIME
      data.end.substring(11,13)+   // END-TIME
      data.start.substring(8,10)+  // DAY
      data.start.substring(5,7)+   // MONTH
      data.start.substring(0,4);   // YEAR
      forbiddenDatesArr.push(forbiddenDateString); // Add to our forbiddenTimesArr.
  });

  /**
  *   Create all events!
  **/
  title = "TEST"; //TODO
  type = "Math"; // TODO

  var studySessionsPerDay = Math.round(numStudySessions/numAvailableDays);
  var distancePerStudySession = Math.floor(numAvailableDays/numStudySessions);
  if ( studySessionsPerDay < 1 ) {
    studySessionsPerDay = 1; // Make sure we have atleast one study session a day.
  }
  if (distancePerStudySession < 1) {
    distancePerStudySession = 1;  // Make sure we have atleast one days break between them.
  }
  //alert(numStudySessions+" "+ numAvailableDays +" " +studySessionsPerDay);

  for ( var i = 0; i < numStudySessions; i++ ) {

    if ( i > 0 ) { // Schedule with our desired distance between study sessions.
      startFromDay = startFromDay.addDays(distancePerStudySession);
    } else {
      startFromDay = startFromDay.addDays(1);
    }

    for ( var j = 1; j <= studySessionsPerDay; j++ ) {

      /**
      *     Set preliminary event. Check if it's alright afterwards.
      *     TODO: Start at 22 if they like to study late, 18 if they like to study early. Machine Learning/Data Analytics..?
      **/

      var startHours = "16";
      var endHours = "18";
      var startYear = startFromDay.getFullYear();
      var startMonth = startFromDay.getMonth()+1; // Month indexing starts at 0.
      var startDay = startFromDay.getDate();

      // Fix this date if it is scheduled illegally: NOTE: We start at 16-18 statically.
      // NOTE: If the date is okay, we will return first available string.
      var currentDateString = checkDates(forbiddenDatesArr,startHours,endHours,startDay,startMonth,startYear,startFromDay);

      console.log("currentDateString:   "+currentDateString)
      startHours = currentDateString.substring(0,2);
      endHours = currentDateString.substring(2,4);
      startDay = currentDateString.substring(4,6);
      startMonth = currentDateString.substring(6,8); // Month indexing starts at 0.
      startYear = currentDateString.substring(8,13);

      /**
      *   We now know the date is okay.
      **/

      var start = startYear+"-"+startMonth+"-"+startDay; // start and end have the same date, but not the same time.
      var end = start;

      forbiddenDateString = startHours+endHours+startDay+startMonth+startYear; // NOTE: Check format of this string where we create forbiddenDatesArr.
      forbiddenDatesArr.push(forbiddenDateString); // Add this session in to our forbiddenDatesArr for next loop.

      // TODO htmlDescFormat is NOT FINISHED! Add iteration of descriptions...
      // TODO Add logic to handle descArray and study-phases.
      htmlDescFormat = `
      <br><br>
      <h3 class="center">`+title+` `+ startHours +`-`+ endHours +`</h3>
      <div class="col s12">
        `+descArray[0]/*TODO*/+`
      </div>`;

      /**
      *   Creation of the JSON object that is to be inserted.
      **/
      var doc = {
        'connectedUserId': connectedUserId, //qHfJWYf4uSgQ7CuMD
        'htmlDescription': htmlDescFormat,
        'title': title,
        'start': start+" "+startHours+":00:00",
        'end': end+" "+endHours+":00:00", // e.g 2017-02-01 22:00:00        which is feb 2nd 22:00, 2017
        'type': type,
        'deadline': deadline,
        'editable':false
        // End of eventArray
      };

      /**
      *   Insertion of the current doc. Report any and all errors.
      **/
      CalEvents.insert(
        doc,
        function(error, result) {
          if ( error ) {
            console.log ( error ); //info about what went wrong
            Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
            return; // Stop exec
          } else {
            // Everything went smoothly...
            Materialize.toast('EVENT skapat!', 4000, "green");
          }
        }
      );

      // If we added more than one study session this day.
      if ( j > 1 ) {
        numStudySessions--;
      }

    }

  } // End of event creation...

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
*   @param descArray is the list of description strings grabbed from our database. It is the general tip description for the exType.
*   @param numStudySessions is the number of study sessions we want to schedule in.
*   numAvailableDays is also used here.
*
**/
function theMMRAlgorithm(deadline, examinationType, ambitionLevel, schoolGrade, studyScopeLevel, descArray, studyScope) {

    // Start by calculating the two most important variables to create study sess
    var numAvailableDays = calcNumAvailableDays(deadline);
    var numStudySessions = calcNumStudySessions(examinationType,ambitionLevel,schoolGrade,studyScopeLevel,numAvailableDays);

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
    createStudySessions(descArray, numStudySessions, numAvailableDays, deadlineFormatted);

}

/**
*   Depending on course and examination type, gets the connected description!
**/
function activityDesc(cType, exType) {

  //TODO: Add logic for handling examinationtype

  // Grab all activities with the selected course and examination type:s
  var allActivityObj = Activities.find({courseType: cType, examinationType: exType});
  var activityArray = new Array();
  var listActivityDesc = new Array();

  // Store all our objects from the object that holds all activity objects,
  // in to an array instead.
  allActivityObj.forEach(function(data){
      activityArray.push(data); // Add to our forbiddenTimesArr.
  });

  // Sorts all activities in Ascending order, in this array,
  // according to their phase. Chronological phases...
  activityArray.sort(function(dataA, dataB){
    return dataA.phase-dataB.phase
  });

  // Put only the description strings of these activities in a list.
  // Note that this list is still sorted.
  activityArray.forEach(function(data){
      listActivityDesc.push(data.desc); // Add to our forbiddenTimesArr.
  });

  if ( listActivityDesc[0] ) {
    // We found our description for this course and examination type combination. Algorithm time.
    return listActivityDesc; //Needed for the MMR algorithm
  } else {
    // ERROR: Could not find description?
    Materialize.toast('Något gick fel med att hämta examinationsbeskrivningen!', 4000, "red");
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

    $("#newCoursePartTwo").fadeOut(100);
    window.setTimeout(function(){
        $("#newCoursePartOne").fadeIn(100);
    },200);

},

"click #testMeBtn":function(event) {

    calcNumAvailableDays(" ");

},

/**
*   Handles the new course submission to the app.
**/
"submit #newCourseForm":function(event) {

  //Prevent default redirect.
  event.preventDefault();

  //$("#courseType").val().toString();
  const target = event.target;
  const courseType = target.courseType.value; // get course value
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

    if ( studyScope == "0-10" || studyScope == "10-20" || studyScope == "20-30" ) {
      studyScopeLevel = "Low"; // This is considered a low workload.
    } else if ( studyScope == "30-40" || studyScope == "40-50" || studyScope == "50-60" ) {
      studyScopeLevel = "Medium"; // This is considered a medium workload.
    } else {
      studyScopeLevel = "High"; // Anything else is considered a high workload.
    }

  } else {
    // The study scope level does not matter if we have Muntlig/Glosor.
    studyScopeLevel = "NOT_USED";
  }

  // It's time to fetch the correct descriptions from our db.
  var shortExType;
  var descArray = new Array();

  // Fetches the right description array, based on our course and examination type:
  descArray = activityDesc(courseType, examinationType);

  /**
  *   FINALLY. Apply the MMR Algorithm.
  **/
  theMMRAlgorithm(deadline, shortExType, ambitionLevel, schoolGrade, studyScopeLevel, descArray, studyScope);

},

  /**
  *   Change examinationType according to courseType
  **/
  "change #selectOne": function(){
    const val = $("#selectOne").val();
    if ( val == "Kvantitativ" ) {
      Template.instance().examinationTypeTemplate.set("KvantitativOptions");
    } else if ( val == "Språk" ) {
      Template.instance().examinationTypeTemplate.set("SpråkOptions");
    } else if ( val == "Samhällskunskap") {
      Template.instance().examinationTypeTemplate.set("SamhällskunskapOptions");
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
