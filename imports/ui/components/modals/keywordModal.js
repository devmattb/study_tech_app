import "./keywordModal.html";
import {pageInit} from "../../../api/functions/pageInit";

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

    console.log(keywordValue+" "+keywordDescription);

    // Insert a task into the collection
    // Tasks.insert({
    //   text,
    //   createdAt: new Date(), // current time
    // });

    // Clear form
    target.keywordValue.value = '';
    target.keywordDescription.value = '';
  },
});
