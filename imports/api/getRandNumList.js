/**
*   Returns an array of uniquely generated numbers between the max and min number.
*   @param max is the max number.
*   @param min is the min number.
*   @param size is the size of the list of unique random numbers.
*   @returns a list of uniquely generated numbers between the max and min number.
**/
export function getRandNumList(min,max,size){
  var arr = []
  while(arr.length < size){
      var randomnumber = Math.floor(Math.random()*(max - min + 1)) + min;
      // If this number already exists in the array, skip to next loop, we don't want to add a non-unique number.
      if(arr.indexOf(randomnumber) > -1) continue;
      arr[arr.length] = randomnumber;
  }
  return arr;
}
