/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/


Template.login.events({

/**
*   Logs you in to the Service.
**/
"submit #loginForm":function(event) {

  //Prevent default redirect.
  event.preventDefault();

  const target = event.target;
  const user = target.user.value;
  const pass = CryptoJS.SHA256(target.pass.value).toString();

  if ( Accounts.findOne({user: user, pass: pass}) ) { // If we find a user with this username and password.

      const acc = Accounts.findOne({user: user, pass: pass});

      // Set account info in a session variable.
      Session.set({
        id: acc._id,
      });

      FlowRouter.go("/");

  } else {

    Materialize.toast('Wrong username or password.', 4000, "red");

  }

},

});
