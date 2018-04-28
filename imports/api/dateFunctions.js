


Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

/**
*   Adds X days to a given date.
*   @param date the date that you want to add to.
*   @param days how many days you want to add.
**/
export function addDays(date, days) {
  var newDate = date.addDays(days);
  return newDate;
}

Date.prototype.addHours = function(h) {
   this.setTime(this.getTime() + (h*60*60*1000));
   return this;
}

/**
*   Adds X hours to a given date.
*   @param date the date that you want to add to.
*   @param hours how many hours you want to add.
**/
export function addHours(date, hours) {
  var newDate = date.addHours(hours);
  return newDate;
}

Date.prototype.addMinutes = function(m) {
   this.setTime(this.getTime() + (m*60*1000));
   return this;
}

/**
*   Adds X minutes to a given date.
*   @param date the date that you want to add to.
*   @param minutes how many minutes you want to add.
**/
export function addMinutes(date, minutes) {
  var newDate = date.addMinutes(minutes);
  return newDate;
}

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
