import "./fixtures.js";

/**
*   Initiate Server
**/
Meteor.startup(() => {

  /**
  *   Setting up Social Media Service Configurations for logins.
  **/

  // Facebook
  ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
      $set: {
        loginStyle: "popup",
        appId: "184449002332303", // Located in facebook dev on navbar.
        secret: "3b759eb0ddb439bd0bd4357a9d474d0a" // Located in facebook dev in advanced settings.
      }
    }
  );

  // Google
  ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
      $set: {
        loginStyle: "popup",
        // Both below are found under "Credentials in google dev."
        clientId: "120105098168-qg427giabikgi591p2bh688b5pmk155d.apps.googleusercontent.com",
        secret: "0fa9HyaJU5DbHAdiO4lUuneA"
      }
    }
  );


});
