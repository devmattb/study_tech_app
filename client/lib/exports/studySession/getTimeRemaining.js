import {timerVariables} from "./timerVariables"

/**
*   TIMER: Get the remaining time:
*   @param endtime is the Date object with the final time.
**/
export function getTimeRemaining(endtime){

  var t = Date.parse(endtime) - Session.get('time');
  var seconds = ("0" + Math.floor( (t/1000) % 60 )).slice(-2);
  var minutes = ("0" + Math.floor( (t/1000/60) % 60 )).slice(-2);

  console.log(t)
  if(t <= 0) {
    clearInterval(timeinterval);
  }

  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };

}
