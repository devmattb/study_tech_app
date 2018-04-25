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
