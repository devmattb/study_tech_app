import "../../collections/activityDescription/activityDescription.js"; // TODO: Make server call instead.
/**
*   Depending on course and examination type, gets the connected description!
**/
export function getActivityDescList(cType, exType, numOptional, cycles) {

  var allActivityObj = ActivityDescription.find();
  var activityArray = new Array();
  var listActivityIds = new Array();

  // Get the entire description sequence, for all cycles:
  for (var k = 0; k < cycles; k++) {

      /**
      *   Get all activities that match our course-and-examination type from
      *   our DB in to an Array, called activityArray.
      **/
      allActivityObj.forEach(function(data){

        // Loop: Go through the coursetypes of each activity object.
        for (var i = 0; i < data.courseType.length; i++) {

          if (data.courseType[i] === cType && data.examinationType[i] === exType)  {

            if ( k > 0 ) {
              // Make sure we get the activities in the right order.
              // This is not the first cycle so when we sort later we
              // need to know that this will NOT be in the first phase for example.
              data.phase[i] = data.phase[i] * 5*k;
            }

            // Add this particular index to our JSON object,
            // So we know exactly what spot to look in the
            // phase, phaseOrder and examinationType array.
            if (data.optional[i] === true && numOptional > 0) {
              // This is an optional Activity. But we still have room for some.
              data.relevantIndex = i;
              activityArray.push(data); // Add to our activityArray.
              numOptional--;            // Decrement the number of optionals we have space for.
              i++;                      // Do not count this cycle iteration, since its an optional activity.
              break;                    // Break out of loop. Go to next activity.
            } else if (data.optional[i] === false) {
              // This is a mandatory activity. Add it.
              data.relevantIndex = i;
              activityArray.push(data); // Add to our forbiddenTimesArr.
              break;                    // Break out of loop. Go to next activity.
            }
          }

        }

      });
    } // Now we have the entire activity sequence, for all cycles, ready for sorting!


  // Sorts all activities in Ascending order, in this array,
  // according to their phase and phaseOrder. Chronological phases...
  activityArray.sort(function(dataA, dataB){

    if ( dataA.phase[dataA.relevantIndex] == dataB.phase[dataB.relevantIndex] ) { // Same phase.
      return dataA.phaseOrder[dataA.relevantIndex]-dataB.phaseOrder[dataB.relevantIndex]; // Sort by internal phaseOrder instead...
    } else { // Not same phase
      return dataA.phase[dataA.relevantIndex]-dataB.phase[dataB.relevantIndex]; // Sort by phase.
    }

  });

  // Put only the description strings of these activities in a list.
  // Note that this list is still sorted.
  activityArray.forEach(function(data){
      listActivityIds.push(data._id); // Add to our forbiddenTimesArr.
  });

  console.log(listActivityIds.toString());

  if ( listActivityIds[0] ) {
    // We found our description for this course and examination type combination. Algorithm time.
    return listActivityIds; //Needed for the MMR algorithm
  } else {
    // ERROR: Could not find description?
    Materialize.toast('Något gick fel med att hämta studiesessions-beskrivningen!', 4000, "red");
    return;
  }

}
