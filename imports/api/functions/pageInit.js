/**
*   Initiates standard modules for each page.
***/
export function pageInit() {

    /**
    *   PRELOADER
    **/
    $("#preloader").fadeOut("slow");
    $("body").fadeIn("slow");

    // Page height init:
    $("#coverPageDiv").css("height",  $( window ).height());


    /**
    *      NAV INITIALIZATION
    **/
    $(".button-collapse").sideNav({'closeOnClick': true}); // Initialize sidenav button
    $('.modal').modal(); // Initialize modal.
    $('select').material_select(); // Initialize select in materialize forms.
    $('ul.tabs').tabs(); // Initialize tabs component.

    // Initiate datepicker:
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: false, // Creates a dropdown of 15 years to control year,
      today: 'Idag',
      clear: 'Ångra',
      close: 'Ok',
      formatSubmit: 'yyyy-mm-dd',
      closeOnSelect: true // Close upon selecting a date,
    });

}
