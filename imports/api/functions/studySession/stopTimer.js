import {timerVariables} from "./timerVariables"

export function stopTimer() {
  // Make the timer tick out, triggering the change to the page before Pause.
  Session.set("t",{
    'total': 0,
    'minutes': 0,
    'seconds': 0
  });
  // Stop the ticking:
  clearInterval(timeinterval);
}
