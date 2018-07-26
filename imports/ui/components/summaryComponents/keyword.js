import "./keyword.html";

Template.keyword.onRendered(function(){
  Meteor.defer(function(){$(".keywordContainer").removeClass("scale-out");},500);
});


Template.keyword.events({
  'click #edit-keyword-content': function(event){
    thisIndex = event.target.getAttribute("data-index");
    Session.set("activeKeyword", thisIndex);
    console.log(Session.get("activeKeyword"));
  },
});
