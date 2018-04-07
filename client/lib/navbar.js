Template.navbar.events({

  /**
  *   Logout function:
  **/
  'click .logout': function(event){
    event.preventDefault();
    AccountsTemplates.logout();
    FlowRouter.go("DUMMY_URL"); // Refreshes page.
  },

});
