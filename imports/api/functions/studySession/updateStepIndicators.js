/**
*   Updates step indicators in a study session.
**/
export function updateStepIndicators(s){
  $(".activeStep").removeClass("activeStep");
  $(".stepIndicator:nth-child("+s+")").addClass("activeStep");
}
