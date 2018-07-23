import "./keyword.html";

Template.keyword.onRendered(function(){
  Meteor.defer(function(){$(".keywordContainer").removeClass("scale-out");},500);
});
