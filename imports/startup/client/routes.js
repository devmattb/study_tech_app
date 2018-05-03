/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/

import "../../ui/pages/home.js"
import "../../ui/pages/login.js"
import "../../ui/pages/addAssignment.js"
import "../../ui/pages/calendar.js"
import "../../ui/pages/studySession.js"
import "../../ui/pages/feedbackPage.js"

/**
*   checkLoggedIn() function:
*   If the user isn't logged in, redirect them to the login page.
**/
function checkLoggedIn(){
  if(!Meteor.userId()){
    FlowRouter.go("login");
  }
}

/**
*   ALL ROUTES: The link pipeline.
**/
FlowRouter.route('/', {
    name: 'home', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('home'); //Render our HomeLayout as soon as we route to /home
        checkLoggedIn();
    }
});

FlowRouter.route('/login', {
    name: 'login', //Reference name
    action() {
        // If the user is logged in, reroute the user to our home page.
        if(Meteor.userId()){
          FlowRouter.go("home");
        }
        BlazeLayout.render('login'); //Render
    }
});



FlowRouter.route('/addAssignment', {
    name: 'addAssignment', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('addAssignment'); //Render
        checkLoggedIn();
    }
});

FlowRouter.route('/calendar', {
    name: 'calendar', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('calendar'); //Render
        checkLoggedIn();
    }
});

FlowRouter.route('/studySession/:_id', {
    name: 'studySession', //Reference name
    action() {
      // Set our "back" button's href link to the previous page:
      if ( document.referrer === Meteor.absoluteUrl("calendar", {}) || document.referrer === Meteor.absoluteUrl()) {
        Session.set("backBtnHref", document.referrer);
      } else { // If the user for some reason has refreshed awkwardly, retreat to home page.
        Session.set("backBtnHref", Meteor.absoluteUrl());
      }

      BlazeLayout.render('studySession');
      checkLoggedIn();
    }
});

FlowRouter.route('/feedbackPage', {
    name: 'feedbackPage', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('feedbackPage'); //Render
        checkLoggedIn();
    }
});

// FlowRouter.route('/timer', {
//     name: 'timer', //Reference name
//     action() {  //What actually happens.
//       // Set our "back" button's href link:
//       BlazeLayout.render('timer'); //Render
//       checkLoggedIn();
//     }
// });

// FlowRouter.route('/createAccount', {
//     name: 'createAccount', //Reference name
//     action() {  //What actually happens.
//         BlazeLayout.render('createAccount'); //Render
//         checkLoggedIn();
//     }
// });

/*FlowRouter.route('/confetti', {
    name: 'confetti', //Reference name
    action() {  //What actually happens.
      BlazeLayout.render('confetti'); //Render
      checkLoggedIn();
    }
});*/

/*
FlowRouter.route('/devtools', {
    name: 'devtools', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('DevToolsLayout'); //Render
    }
}); */
