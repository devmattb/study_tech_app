import "./keywordModal.html";
import {pageInit} from "../../../api/functions/pageInit";

Template.keywordModal.onRendered(function(){
  pageInit();
});

Template.body.events({

  // Close the modal through gray overlay:
  'click .modal-overlay':function(){
    // Scale in all hidden keywords.
    Meteor.defer(function(){$(".keywordContainer").removeClass("scale-out");},500);
  },

  'submit .new-keyword'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const keywordValue = target.keywordValue.value;
    const keywordDescription = target.keywordDescription.value;

    var activeKeyword = Session.get("activeKeyword");
    var keywords = Session.get("keywords");
    // var selectedKeywordIndex = Session.get("numKeywords");
    keywords["keys"][activeKeyword] = {
      index: activeKeyword,
      keywordValue: keywordValue,
      keywordDescription: keywordDescription,
    }
    Session.set("keywords", keywords);

    console.log(keywordValue+" "+keywordDescription);

    // Insert a task into the collection


    // Clear form
    target.keywordValue.value = '';
    target.keywordDescription.value = '';

    // test code
    console.log(this);

    // Scale in all hidden keywords.
    Meteor.defer(function(){$(".keywordContainer").removeClass("scale-out");},500);

  },
});
