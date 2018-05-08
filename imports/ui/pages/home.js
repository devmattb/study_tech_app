import "../components/header.js"
import "../components/navbar.js"
import "../components/preloader.js"

import "./home.html"

import {pageInit} from "../../api/functions/pageInit"
import {initCal} from "../../api/functions/initCal"
import {subscriptions} from "../../api/functions/subscriptions"



Template.home.onCreated( () => {
  let template = Template.instance();
  subscriptions(template);
});

Template.home.onRendered(function(){
  pageInit();
  initCal("agendaDay");
});
