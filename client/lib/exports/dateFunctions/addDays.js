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
