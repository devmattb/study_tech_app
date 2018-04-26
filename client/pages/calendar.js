import {pageInit} from "../lib/exports/pageInit"
import {initCal} from "../lib/exports/initCal"

Template.calendar.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'StudySession' );
});

Template.calendar.onRendered(function(){
      pageInit();
      // If we wish to include month: "agendaWeek, month"
      initCal("agendaWeek");
});
