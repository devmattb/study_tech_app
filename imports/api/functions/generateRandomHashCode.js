export function generateID() {
  var randomID = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    randomID += possible.charAt(Math.floor(Math.random() * possible.length));

  return randomID;
}

export function hashRandomID(randomID){
  return CryptoJS.SHA256(randomID).toString()
}

export function generateRandomHashCode(){
  return hashRandomID(generateID());
}
