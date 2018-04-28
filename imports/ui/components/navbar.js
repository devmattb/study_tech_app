import "./navbar.html"
import "./modals/contactModal.js"
import "./modals/termsModal.js"
import "./modals/integrityModal.js"

Template.navbar.events({

  /**
  *   Contact Modal
  **/
  'click .openContact': function(event){
    $('#contact').modal('open');
  },

  /**
  *   User Agreement Modal
  **/
  'click .openTerms': function(event){
    $('#terms').modal('open');
  },

  /**
  *   Integrity Modal
  **/
  'click .TODO': function(event){
    $('#integrity').modal('open');
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
