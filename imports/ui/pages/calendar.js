import "../components/header.js"
import "../components/navbar.js"
import "../components/preloader.js"
import "./calendar.html";

import {pageInit} from "../../api/functions/pageInit"
import {initCal} from "../../api/functions/initCal"
import {subscriptions} from "../../api/functions/subscriptions"

Template.calendar.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.calendar.onRendered(function(){
      pageInit();
      // If we wish to include month: "agendaWeek, month"
      initCal("agendaWeek");
});
