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

     eventUpsert: function( id, doc ) {
      CalEvents.upsert({_id: id}, {$set:doc},
       function(err, res) { // Handle errors
         if(err) {
           console.log("ERROR in UPSERT: " + err);
           Materialize.toast('Something went wrong.', 4000, "red");
         }
       }
      );
    },

 });

 /**
 *    Database Security, Allows and denies clients to doe certain operations to the database:
 **/
 CalEvents.allow({
   insert() { return true; },
   update() { return true; },
 });


 //Meteor.publish( 'CalEvents', function() { return CalEvents.find(); } );

});
