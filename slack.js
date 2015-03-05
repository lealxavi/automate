(function () {

  // on that url https://ironhack.slack.com/admin/invites#accepted

  var emailsString = "email1@gmail.com,email2@gmail.com,email3@gmail.com",
      emailsArray  = emailsString.split(","),
      index = 0;

  (function getSlackUser() {

    var inputElement = document.querySelector("input[name='team_filter']"),  
        keyUpEvent   = document.createEvent("KeyboardEvent");

    keyUpEvent.initKeyboardEvent("keyup");
    inputElement.value = emailsArray[index];
    inputElement.dispatchEvent(keyUpEvent);

    setTimeout(function() {
      console.log(document.querySelector("#accepted_invites .active .indifferent_grey").innerHTML);
      index++;
      if (index < emailsArray.length)
        getSlackUser();  
    },1000);

  })();

})();