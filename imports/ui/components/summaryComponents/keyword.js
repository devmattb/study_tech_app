import "./keyword.html";
import {removeKeyword} from "../../../api/functions/summaryPage/removeKeyword";

Template.keyword.onRendered(function(){
  // Meteor.defer(function(){$(".keywordContainer").removeClass("scale-out");},500);
});


Template.keyword.events({

  "click .deleteKeywordContainer":function(event) {
    event.preventDefault();
    removeKeyword(event.target.getAttribute("data-index"));
  },

  'click .fa-edit':function(){
    // We're editing an existing keyword.
    $("#submit-keyword-btn").attr("data-editing", true);
   },

  'click #edit-keyword-content': function(event){
    event.preventDefault();
    var thisIndex = event.target.getAttribute("data-index");
    Session.set("activeKeyword", thisIndex);
    console.log(Session.get("activeKeyword"));
  }
});
