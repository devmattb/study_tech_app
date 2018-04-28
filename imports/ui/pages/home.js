import "../components/header.js"
import "../components/navbar.js"
import "../components/preloader.js"

import "./home.html"

import {pageInit} from "../../api/pageInit"
import {initCal} from "../../api/initCal"

Template.home.onCreated( () => {
  let template = Template.instance();
  template.subscribe( 'StudySession' );
});

Template.home.onRendered(function(){
  pageInit();
  initCal("agendaDay");
});
