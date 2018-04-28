import {daysBetween} from '../dateFunctions';
import {calcNumStudySessions} from "./calcNumStudySessions"
import {getMinimumNumSesh} from "./getMinimumNumSesh"
import {getActivityDescList} from "./getActivityDescList"
import {createStudySessions} from "./createStudySessions"

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
export function theMMRAlgorithm(deadline, courseName, courseType, examinationType, ambitionLevel, schoolGrade, studyScopeLevel, studyScope) {

    // Start by calculating the two most important variables to create study sess
    var numAvailableDays = daysBetween(new Date(), deadline);
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
    descIdArray = getActivityDescList(courseType, examinationType, numOptional, cycles);

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
