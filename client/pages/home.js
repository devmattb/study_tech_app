import {pageInit} from "../lib/exports/pageInit"
import {initCal} from "../lib/exports/initCal"

Template.home.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'StudySession' );
});

Template.home.onRendered(function(){
  pageInit();
  initCal("agendaDay");
});
