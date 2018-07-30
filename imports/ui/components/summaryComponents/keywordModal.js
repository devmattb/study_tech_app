import "./keywordModal.html";
import {pageInit} from "../../../api/functions/pageInit";

import {addKeyword} from "../../../api/functions/summaryPage/addKeyword";

Template.keywordModal.onRendered(function(){
  pageInit();
});

Template.body.events({

  // Close the modal through gray overlay:
  // 'click .modal-overlay':function(){
  //   // TODO: Only create a new keyword if the form details aren't set.
  //   if (true) {
  //     // Create empty keyword:
  //     addKeyword(Session.get("currentIndex"), "", "");
  //     // Scale in the new keyword.
  //     Meteor.defer(function(){$(".keywordContainer").removeClass("scale-out");},500);
  //   }
  //
  // },

  'click .edit-keyword-content':function(){
    // We're editing an existing keyword.
    $(".new-keyword").setAttribute("data-editing", true);
   },


  'submit .new-keyword'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const keywordValue = target.keywordValue.value;
    const keywordDescription = target.keywordDescription.value;

    var indexVal = Session.get("activeKeyword");
    var editing = event.target.getAttribute("data-editing");
    console.log(editing);
    if (editing) {
      editKeyword(indexVal, keywordValue, keywordDescription);
    } else {
      addKeyword(indexVal, keywordValue, keywordDescription);
    }

    // NOTE: Old/Unusable? Did I miss something?
    // var keywords = Session.get("keywords");
    // var selectedKeywordIndex = Session.get("numKeywords");
    // keywords["keys"][activeKeyword] = {
    //   index: activeKeyword,
    //   keywordValue: keywordValue,
    //   keywordDescription: keywordDescription,
    // }
    // Session.set("keywords", keywords);
    //
    // console.log(keywordValue+" "+keywordDescription);

    // TODO: Insert a task into the collection


    // Clear form
    target.keywordValue.value = '';
    target.keywordDescription.value = '';

    // test code
    console.log(this);

    // Scale in all hidden keywords.
    Meteor.defer(function(){$(".keywordContainer").removeClass("scale-out");},500);

  },
});
