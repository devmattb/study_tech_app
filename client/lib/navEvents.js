Template.navbar.events({

  'click .logout': function(event){
    event.preventDefault();
    AccountsTemplates.logout();
    FlowRouter.go("DUMMY_URL"); // Refreshes page.
  },

});
