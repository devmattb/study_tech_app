/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
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

var collisionCount;
function checkDates(arr, startFromDay, endHours) {

  for ( var i = 1; i < arr.length; i+=2 ) {
    //console.log(arr);
    var endDate = arr[i].split("|");
    var endDateTime = endDate[1].substring(11,13);
    var yearMonthDay = endDate[1].substring(0,10).split("-");
    //console.log("TEST:"+ parseInt(yearMonthDay[0]) +","+parseInt(yearMonthDay[1]-1)+","+parseInt(yearMonthDay[2]));
    //console.log(yearMonthDay[0]+","+yearMonthDay[1]-1+","+yearMonthDay[2]);
    var thisDate = new Date(parseInt(yearMonthDay[0]),(parseInt(yearMonthDay[1])-1),parseInt(yearMonthDay[2]));
    var daysBetween = Date.daysBetween(startFromDay, thisDate);
    //console.log(daysBetween + " " + endDateTime);

    // Optimal case: This date is not colliding with the day nor the time of the current event we're searching through.
    // Not-so-optimal case: The date collides with the day, but not the time.
    // Worst case: We're trying to schedule the student on a day and time in which they're already scheduled.
    if ( !(daysBetween != 0 && endHours != endDateTime) || !(daysBetween != 0) ) {
      // daysBetween is zero. this endDateTime is equal to our set endHours.
      if ( !(endHours != endDateTime) ) {
        //OK for this date. recheck this for our previously collided dates.
        if ( collisionCount > 1 ) {
          // We've collided before. Try adding two hours, or skip to the next date.
          console.log("HERE5");
          if (endHours+2 <= 22) {
            endHours+=2;
            checkDates(arr, startFromDay,endHours); // Redo check with new hours.
          } else {
            startFromDay.addDays(1);
            checkDates(arr, startFromDay,endHours);
          }
        }
        console.log("HERE: " + startFromDay + endHours +" thisDate "+thisDate+ " daysBe "+ daysBetween);
        // NOTE: If we haven't collided, we leave the preliminary scheduled date & time as it is!
      } else {
        // Not OK for this date. Try adding two hours or skip to the next date.
          console.log("HERE4");
        collisionCount++; // Count this collision.
        if (endHours+2 <= 22) {
          endHours+=2;
          checkDates(arr, startFromDay,endHours); // Redo check with new hours.
        } else {
          startFromDay.addDays(1);
          checkDates(arr, startFromDay,endHours);
        }
      }

    }

  }
  //collisionCount = 0; // clear collisoinCount
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
function createStudySessions(desc, numStudySessions, numAvailableDays, deadline) {

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
  var forbiddenDatesArr = new Array();
  var forbiddenDatesCollection = CalEvents.find({connectedUserId, connectedUserId});
  forbiddenDatesCollection.forEach(function(data){
      forbiddenDatesArr.push(data.start + "|" + data.end); // Add to our forbiddenTimesArr.
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
      *     TODO: Start at 22 if they like to study late, 18 if they like to study early.
      **/
      var startHours, endHours;
      endHours = 18;

      // Is this preliminary date forbidden?
      checkDates(forbiddenDatesArr, startFromDay, endHours);

      /**
      *   We now know the date is okay. Let's do some formatting.
      *   TODO: Add zeroes before day value!!!
      **/
      startHours = endHours-2; // Set the start hours.
      var startYear = startFromDay.getFullYear();
      var startMonth = startFromDay.getMonth()+1; // Month indexing starts at 0.
      var startDay = startFromDay.getDate();

      if (startMonth < 10) {
        startMonth = "0"+startMonth; // Make sure we have a zero before the numbers.
      }

      if (startDay < 10) {
        startDay = "0"+startDay; // Make sure we have a zero before the numbers.
      }

      var start = startYear+"-"+startMonth+"-"+startDay; // start and end have the same date, but not the same time.
      var end = start;

      // Add this session in to our forbiddenDatesArr for next loop.
      forbiddenDatesArr.push(start+" "+startHours+":00:00" + "|" + end +" "+endHours+":00:00");

      // TODO htmlDescFormat is NOT FINISHED!
      htmlDescFormat = `
      <br><br>
      <h3 class="center">`+title+` `+ startHours +`-`+ endHours +`</h3>
      <div class="col s12">
        <ol>
          <li>Läs <b>X</b> sidor av kaptitel <b>Y</b></li>
          <li>Skriv en sammanfattning på dem <b>X</b> sidor av kapitel <b>Y</b> med <b>Z</b> punkter </li>
        </ol>

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
*   @param desc is the description string grabbed from our database. It is the general tip description for the exType.
*   @param numStudySessions is the number of study sessions we want to schedule in.
*   numAvailableDays is also used here.
*
**/
function theMMRAlgorithm(deadline, examinationType, ambitionLevel, schoolGrade, studyScopeLevel, desc, studyScope) {

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
    createStudySessions(desc, numStudySessions, numAvailableDays, deadlineFormatted);

}

/**
*   Depending on examinationtype, gets the connected description!
**/
function kvantitativDesc(examinationType) {

  if ( Kvantitativ.findOne({'examinationType': examinationType}) ) {
    const descObj = Kvantitativ.findOne({'examinationType': examinationType});
    if ( descObj.desc ) {
      // We found our description for this course and examination type combination. Algorithm time.
      return descObj.desc.toString(); // Needed for the MMR algorithm
    } else {
      // ERROR: Could not find description?
      Materialize.toast('Något gick fel med att hämta examinationsbeskrivningen!', 4000, "red");
      return;
    }
  }

}

/**
*   Depending on examinationtype, gets the connected description!
**/
function språkDesc(examinationType) {

  if ( Språk.findOne({'examinationType': examinationType}) ) {
    const descObj = Språk.findOne({'examinationType': examinationType});
    if ( descObj.desc ) {
      // We found our description for this course and examination type combination. Algorithm time.
      return descObj.desc.toString(); //Needed for the MMR algorithm
    } else {
      // ERROR: Could not find description?
      Materialize.toast('Något gick fel med att hämta examinationsbeskrivningen!', 4000, "red");
      return;
    }
  }

}

/**
*   Depending on examinationtype, gets the connected description!
**/
function samhällskunskapDesc(examinationType) {

  if ( Samhällskunskap.findOne({'examinationType': examinationType}) ) {
    const descObj = Samhällskunskap.findOne({'examinationType': examinationType});
    if ( descObj.desc ) {
      // We found our description for this course and examination type combination. Algorithm time.
      return descObj.desc.toString(); // Needed for the MMR algorithm
    } else {
      // ERROR: Could not find description?
      Materialize.toast('Något gick fel med att hämta examinationsbeskrivningen!', 4000, "red");
      return;
    }
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
  *   The Low/Medium/High studyScopeLevel Table:
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
  var shortExType, desc;
  /**
  *   SKRIFTLIGT PROV
  **/
  if ( examinationType == "Skriftligt Prov") {
    shortExType = "Other"; // Needed for the MMR algorithm
    /**
    *   SKRIFTLIGT PROV: KVANTITATIV
    **/
    if ( courseType == "Kvantitativ" ) {

      desc = kvantitativDesc(examinationType);

      /**
      *   SKRIFTLIGT PROV: SPRÅK
      **/
    } else if ( courseType == "Språk" ) {

      desc = språkDesc(examinationType);

    /**
    *   SKRIFTLIGT PROV: SAMHÄLLSKUNSKAP
    **/
    } else if ( courseType == "Samhällskunskap" ) {

      desc = samhällskunskapDesc(examinationType);

    } else {
      // ERROR: Invalid coursetype.
      Materialize.toast('Något gick fel med att identifiera kurstypen!', 4000, "red");
    }

  /**
  *   LITTERATURANALYS
  **/
  } else if ( examinationType == "Litteraturanalys" ) {
    shortExType = "Other"; // Needed for the MMR algorithm
    if ( courseType == "Kvantitativ" ) {

      desc = kvantitativDesc(examinationType);

    } else if ( courseType == "Språk" ) {

      desc = språkDesc(examinationType);

    } else if ( courseType == "Samhällskunskap" ) {

      desc = samhällskunskapDesc(examinationType);

    } else {
      // ERROR: Invalid coursetype.
      Materialize.toast('Något gick fel med att identifiera kurstypen!', 4000, "red");
    }

  /**
  *   MUNTLIG REDOVISNING
  **/
  } else if ( examinationType == "Muntlig Redovisning" ) {
    shortExType = examinationType; // Needed for the MMR algorithm
    if ( courseType == "Språk" ) {

      desc = språkDesc(examinationType);

    } else if ( courseType == "Samhällskunskap" ) {

      desc = samhällskunskapDesc(examinationType);

    } else {
      // ERROR: Invalid coursetype.
      Materialize.toast('Något gick fel med att identifiera kurstypen!', 4000, "red");
    }

  /**
  *  GLOSOR
  **/
  } else if ( examinationType == "Glosor" ) {
    shortExType = examinationType; // Needed for the MMR algorithm
    if ( courseType == "Kvantitativ" ) {

      desc = samhällskunskapDesc(examinationType);

    } else if ( courseType == "Språk" ) {

      desc = språkDesc(examinationType);

    } else if ( courseType == "Samhällskunskap" ) {

      desc = samhällskunskapDesc(examinationType);

    } else {
      // ERROR: Invalid coursetype.
      Materialize.toast('Något gick fel med att identifiera kurstypen!', 4000, "red");
    }

  /**
  *   UPPSATS
  **/
  } else if ( examinationType == "Uppsats" ) {
    shortExType = "Other"; // Needed for the MMR algorithm
    if ( courseType == "Språk" ) {

      desc = språkDesc(examinationType);

    } else if ( courseType == "Samhällskunskap" ) {

      desc = samhällskunskapDesc(examinationType);

    } else {
      // ERROR: Invalid coursetype.
      Materialize.toast('Något gick fel med att identifiera kurstypen!', 4000, "red");
    }

  } else {
    // ERROR: Invalid Examination Type.
    Materialize.toast('Något gick fel med att identifiera examinationstypen!', 4000, "red");
  }

  /**
  *   FINALLY. Apply the MMR Algorithm.
  **/
  theMMRAlgorithm(deadline, shortExType, ambitionLevel, schoolGrade, studyScopeLevel, desc, studyScope);

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
