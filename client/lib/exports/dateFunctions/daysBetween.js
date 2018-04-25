Date.daysBetween = function( date1, date2 ) {   //Get 1 day in milliseconds
  var one_day=1000*60*60*24;    // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();    // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;        // Convert back to days and return
  return Math.round(difference_ms/one_day);
}

/**
*   Calculates the amount of milliseconds between dates.
*   @param date1
*   @param date2
**/
export function daysBetween(date1, date2) {
  var diff = Date.daysBetween(date1, date2);
  return diff;
}
