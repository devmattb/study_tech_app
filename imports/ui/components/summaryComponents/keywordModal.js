import "./keywordModal.html";
import {pageInit} from "../../../api/functions/pageInit";

import {addKeyword} from "../../../api/functions/summaryPage/addKeyword";
import {editKeyword} from "../../../api/functions/summaryPage/editKeyword";

Template.keywordModal.onRendered(function(){
  pageInit();
});

Template.body.events({

  'submit .new-keyword'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const keywordValue = target.keywordValue.value;
    const keywordDescription = target.keywordDescription.value;

    var indexVal = Session.get("activeKeyword");
    var editing = event.target.submit.getAttribute("data-editing") === "true";
    console.log(editing);

    // Edit a keyword or create a new keyword?
    if (editing) {
      console.log(editing, "is editing");
      editKeyword(indexVal, keywordValue, keywordDescription);
    } else{
      Session.set("currentIndex", Session.get("currentIndex")+1);
      addKeyword(Session.get("currentIndex"), keywordValue, keywordDescription);
    }

    // TODO: Insert a task into the collection


    // Clear form
    target.keywordValue.value = '';
    target.keywordDescription.value = '';

    // Scale in all hidden keywords.
    Meteor.defer(function(){$(".keywordContainer").removeClass("scale-out");},500);

  },
});
