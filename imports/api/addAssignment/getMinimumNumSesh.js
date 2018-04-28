import {getExTypeResult} from "./getExTypeResult"

/**
*
*   getMinimumNumSesh():
*   Gets the minumum amount of sessions for a specific
*   course+examination-type combination
*   @param cType is the Course Type.
*   @param exType is the Examination Type.
*
**/
export function getMinimumNumSesh(cType, exType) {

  var minSessions;
  if ( cType === "Språk" ) {
    minSessions = getExTypeResult(exType, 4,3,3,1,4);
  } else if ( cType === "Kunskapsämne" ) {
    minSessions = getExTypeResult(exType, 4,3,null,null,4);
  } else if ( cType === "Kvantitativ" ) {
    minSessions = getExTypeResult(exType, null,3,null,null,null);
  }
  return minSessions;

}
