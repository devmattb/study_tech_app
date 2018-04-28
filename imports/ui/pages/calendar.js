import "../components/header.js"
import "../components/navbar.js"
import "../components/preloader.js"
import "./calendar.html";

import {pageInit} from "../../api/pageInit"
import {initCal} from "../../api/initCal"

Template.calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'StudySession' );
});

Template.calendar.onRendered(function(){
      pageInit();
      // If we wish to include month: "agendaWeek, month"
      initCal("agendaWeek");
});
