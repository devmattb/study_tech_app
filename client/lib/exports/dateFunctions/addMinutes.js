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
