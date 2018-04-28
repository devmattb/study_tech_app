import '../dateFunctions';
import {timerVariables} from "./timerVariables"
import {getTimeRemaining} from "./getTimeRemaining"
import {stopTimer} from "./stopTimer"
import {nextCyclePrep} from "./nextCyclePrep"


/**
*   Initiates the timer with
*   @param m minutes countdown.
**/
export function initTimer(m){
  /***
  *   Timer init
  ***/
  var endtime = new Date();
  endtime = addMinutes(endtime, m);
  timeinterval = setInterval(function () {

    /***
    *   End pause appropriately
    **/

    // Keep ticking...
    Session.set("time", new Date());
    var t = getTimeRemaining(endtime);
    if (Session.get("paused")) {
      if (t.total <= 0) {
        Session.set("paused", false);
        stopTimer();
        nextCyclePrep();
      }
    } else if (t.total <= 0) {
      Session.set("ended", true);
    }
    Session.set("t", t);
  }, 1000);
}
