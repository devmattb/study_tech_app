/**
*   Gets the category of a course.
*   @param courseName is the name of the course that wishes to be categorized.
*   @return The category of the courseName.
**/
export function getCourseType(courseName) {

  if (courseName === "Matematik" || courseName === "Fysik") {
    return "Kvantitativ";
  } else if (courseName === "Svenska" || courseName === "Engelska" || courseName === "Andravalsspråk") {
    return "Språk";
  } else { // Annars borde det vara ett kunskapsämne.
    return "Kunskapsämne";
  }

}
