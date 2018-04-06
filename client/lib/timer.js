if (Meteor.isClient) {

  Date.prototype.addMinutes = function(m) {
     this.setTime(this.getTime() + (m*60*1000));
     return this;
  }

  var timeinterval;

  Template.timer.onRendered(function () {
    var endtime = new Date();
    endtime.addMinutes(1);
    timeinterval = setInterval(function () {
      Session.set("time", new Date());
      var t = getTimeRemaining(endtime);
      Session.set("t", t);
    }, 1000);
  });

  /**
  *   Get the remaining time:
  *   @param endtime is the Date object with the final time.
  **/
  function getTimeRemaining(endtime){

    var t = Date.parse(endtime) - Session.get('time');
    var seconds = ("0" + Math.floor( (t/1000) % 60 )).slice(-2);
    var minutes = ("0" + Math.floor( (t/1000/60) % 60 )).slice(-2);

    console.log(t)
    if(t <= 0)
      clearInterval(timeinterval);

    return {
      'total': t,
      'minutes': minutes,
      'seconds': seconds
    };

  }
  Template.timer.helpers({
    ended:function () {
      console.log(Session.get("t").total <= 0);
      return Session.get("t").total <= 0;
    },
    t: function () {
      return Session.get("t");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

  Meteor.methods({
    'getCurrentTime': function (){
      return Date.parse(new Date());
    }
  });
}
