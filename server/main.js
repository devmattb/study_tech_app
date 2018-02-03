import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  Meteor.methods({

      accountUpsert: function( id, doc ) {
       Accounts.upsert( id, doc,
        function(err, res) { // Handle errors
          if(err) {
            console.log("ERROR in UPSERT: " + err);
            Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
          }
        }
       );
     },

 });

 Meteor.publish( 'CalEvents', function() { return Events.find(); } );

});
