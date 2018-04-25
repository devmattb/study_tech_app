String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/**
*   replaceAll() Function:
*
*   Replaces all occurences of the search 'string', with the 'replacement' string.
*   @param string Is the string that should be searched.
*   @param search Is the string you wish to search all occurences of.
*   @param replacement Is the string you wish to replace said occurences with.
*
**/
export function replaceAll(string, search, replacement){
  var newString = string.replaceAll(search,replacement);
  return newString;
}
