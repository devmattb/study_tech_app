

function generateID() {
  var randomeID = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    randomeID += possible.charAt(Math.floor(Math.random() * possible.length));

  return randomeID;
}

function hashRandomeID(randomeID){
  return CryptoJS.SHA256(randomeID).toString()
}

export function generateRandomeHashCode(){
  return hashRandomeID(generateID());
}
