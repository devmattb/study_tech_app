/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/

Template.createAccount.events({

  /**
  *   Creates an account and puts details in to the Accounts collection.
  **/
  "submit #createAccountForm":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    //Get values from form:
    const target = event.target;
    const user =  target.user.value;
    const email =  target.email.value;
    const pass = CryptoJS.SHA256(target.pass.value).toString();
    const pass2 = CryptoJS.SHA256(target.pass2.value).toString();
    const agreedEmailList = $('#agreedEmailList').prop('checked');

    if ( user && email && pass && pass2 ) {  // Successful registration regardless of Alpha Key.

      if ( agreedEmailList ) { // If they agreed to join our email list:

        if (!(EmailList.findOne({email: email}))) {
          try {
            EmailList.insert({email: email});
          } catch(e) {
            console.log("ERROR in EMAILLIST: " + e);
          }
        }

      }

      if (  pass != pass2 ) {

        Materialize.toast("Dina lösenord överensstämmer ej!", 4000, "red");
        return; // Cancel exec.

      } else if ( Accounts.findOne({email: email}) ) { // If the user already exists.

        Materialize.toast('Den mail du angav är redan kopplat till ett konto!', 4000, "red");
        return; // Cancel exec.

      } else if( Accounts.findOne({user: user}) ) {

        Materialize.toast('Användarnamnet du angav är taget!', 4000, "red");
        return; // Cancel exec.

      } else { // The user does not exist. Put the user in our DB/Accounts collection.

        Accounts.insert(
          {email: email, user: user, pass: pass, agreedEmailList: agreedEmailList, agreedTermsOfUse: true, themes: [],},
          function(error, result) {
            if ( error ) {
              console.log ( error ); //info about what went wrong
              Materialize.toast('Något gick fel... Försök igen!', 4000, "red");
              return; // Stop exec
            } else {
              // Everything went smoothly...
              Materialize.toast('Konto skapat!', 4000, "green");
              FlowRouter.go('/login');
              console.log("Ett konto med mail: " + email + " skapades.");
            }
          }
        );

      }

    } else {  // They forgot to fill in mandatory details.

      Materialize.toast('Du har glömt att fylla i obligatoriska fält...', 4000, "red");

    }

  },

});
