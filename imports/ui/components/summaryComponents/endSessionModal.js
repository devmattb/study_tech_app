import "./endSessionModal.html";

Template.endSessionModal.events({
  "click #submitKeywordsToDatabase": function(){
    var keywords = Session.get("keywords");
  },
});
