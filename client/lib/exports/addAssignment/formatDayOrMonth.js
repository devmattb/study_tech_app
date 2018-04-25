/**
*   Formats a date or a month to a string correctly.
*   @param dateNum is a Day or Month number that needs to be formatted.
*   @return The formatted date number.
**/
export function formatDayOrMonth(dateNum){
  if (parseInt(dateNum) < 10 ) {
    dateNum = "0"+dateNum; // Make sure we have a zero before the numbers.
  }
  return dateNum;
}
