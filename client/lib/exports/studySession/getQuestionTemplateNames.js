/**
*   Translates an array of numbers to a group of template strings
*   from our feedbackForms folder.
**/
export function getQuestionTemplateNames(randNumArr){
  /**
  *   NOTE: You could make this more scalable by
  *   searching through the file tree and counting
  *   the numer of files in the partials/feedbackForms folder.
  **/
  var namesArr = [];
  for (var i = 0; i < randNumArr.length; i++) {
    // TODO: If last study session, return "amountOfSessions"
    if (randNumArr[i] == 0) {
      namesArr.push("funniness");
    } else if (randNumArr[i] == 1) {
      namesArr.push("learningQuality");
    } else if (randNumArr[i] == 2) {
      namesArr.push("tooLong");
    } else if (randNumArr[i] == 3) {
      namesArr.push("pauses");
    }
  }
  return namesArr;
}
