/**
*
*   getExTypeResult():
*   Checks what examinationType we have, and returns a given result.
*   This function was made to shorten code.
*   @param exType is the Examination Type.
*   @param mun is the return value for exType === "Muntlig Redovisning"
*   @param skr is the return value for exType === "Skriftligt Prov"
*   @param lit is the return value for exType === "Litteraturanalys"
*   @param glo is the return value for exType === "Glosor"
*   @param upp is the return value for exType === "Uppsats"
*
**/
export function getExTypeResult(exType, mun, skr, lit, glo, upp) {

  if ( exType === "Muntlig Redovisning" ) {
    return mun;
  } else if ( exType === "Skriftligt Prov" ) {
    return skr;
  } else if ( exType === "Litteraturanalys" ) {
    return lit;
  } else if ( exType === "Glosor" ) {
    return glo;
  } else if ( exType === "Uppsats" ) {
    return upp;
  }

}
