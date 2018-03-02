/***
*
*   Created: 03 December 2017
*   @author Matt Bergstrom, A.K.A devmattb or Mattias Bergström.
*   Copyright 2017 Matt Bergstrom
*   Statement:
*   None of this code is to be copied or used without my (Matt Bergstrom's) permission.
*
***/

/**
*   Redirects to 401 if not logged in...
**/
/*function checkAccess(layoutName) {

  if ( Session.get("id") ) {
    BlazeLayout.render(layoutName); //Render
  } else {
    FlowRouter.go("401");
  }

} */

/**
*   ALL ROUTES: The link pipeline.
**/
FlowRouter.route('/', {
    name: 'home', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('home'); //Render our HomeLayout as soon as we route to /home
    }
});

FlowRouter.route('/login', {
    name: 'login', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('login'); //Render
    }
});

FlowRouter.route('/createAccount', {
    name: 'createAccount', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('createAccount'); //Render
    }
});

FlowRouter.route('/newCourse', {
    name: 'newCourse', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('newCourse'); //Render
    }
});

FlowRouter.route('/calendar', {
    name: 'calendar', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('calendar'); //Render
    }
});

FlowRouter.route('/studySession/:_id', {
    name: 'studySession', //Reference name
    action() {  //What actually happens.
      // Set our "back" button's href link:
      Template.studySession.backBtnHref = window.location.href;
      BlazeLayout.render('studySession'); //Render
      // TODO: Write security that throws out any accounts
      // that should not to see this information.
    }
});


/* FlowRouter.route('/401', {
    name: '401', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('NoAccessLayout'); //Render
    }
});
FlowRouter.route('/devtools', {
    name: 'devtools', //Reference name
    action() {  //What actually happens.
        BlazeLayout.render('DevToolsLayout'); //Render
    }
}); */
