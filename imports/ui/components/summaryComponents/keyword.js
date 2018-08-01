import "./keyword.html";
import {removeKeyword} from "../../../api/functions/summaryPage/removeKeyword";

Template.keyword.onRendered(function(){
  // Meteor.defer(function(){$(".keywordContainer").removeClass("scale-out");},500);
});


Template.keyword.events({

  "click .deleteKeywordContainer":function(event) {
    event.preventDefault();
    removeKeyword(event.target.getAttribute("data-hashCode"));
  },

  'click .fa-edit':function(event){
    event.preventDefault();
    // We're editing an existing keyword.
    $("#submit-keyword-btn").attr("data-editing", true);
   },

  'click #edit-keyword-content': function(event){
    event.preventDefault();
    var thisIndex = event.target.getAttribute("data-hashCode");
    Session.set("activeKeyword", thisIndex);
    console.log(Session.get("activeKeyword"));
  }
});
