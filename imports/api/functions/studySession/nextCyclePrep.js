export function nextCyclePrep() {
  // Change intro text TODO:
  $("#gui #introText").addClass("hidden"); // Nu är det dags för rond "+ Session.get("cyclesDone")+"!".
  $("#gui #continueText").removeClass("hidden");
  // Make sure we add to our cycle count:
  Session.set("cyclesDone", Session.get("cyclesDone")+1);
}
