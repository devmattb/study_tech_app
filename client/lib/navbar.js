Template.navbar.events({

  /**
  *   Contact Modal
  **/
  'click .openContact': function(event){
    $('#contactModal').modal('open');
  },

  /**
  *   User Agreement Modal
  **/
  'click .openTerms': function(event){
    $('#termsModal').modal('open');
  },

  /**
  *   Integrity Modal
  **/
  'click .TODO': function(event){
    $('#integrityModal').modal('open');
  },

  /**
  *   Logout function:
  **/
  'click .logout': function(event){
    event.preventDefault();
    AccountsTemplates.logout();
    FlowRouter.go("DUMMY_URL"); // Refreshes page.
  },

});
