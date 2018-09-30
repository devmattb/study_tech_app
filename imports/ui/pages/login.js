
import "../components/header.js"
import "../components/preloader.js"
import "./login.html";
import '../components/overrides/overrides.js';

import {pageInit} from "../../api/functions/pageInit"
import {subscriptions} from "../../api/subscriptions"

Template.login.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

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
