import {pageInit} from "../lib/exports/pageInit"

Template.login.onRendered(function(){
    pageInit();
});

/**
*   Login Handling
**/
// Facebook
Meteor.loginWithFacebook({
  requestPermissions: ['user_friends', 'public_profile', 'email']
}, (err) => {
  if (err) {
    // handle error
  } else {
    // successful login!
  }
});

// Google
Meteor.loginWithGoogle({
  requestPermissions: ['user_friends', 'public_profile', 'email']
}, (err) => {
  if (err) {
    // handle error
  } else {
    // successful login!
  }
});
