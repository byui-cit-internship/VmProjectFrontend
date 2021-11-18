//© 2021 Sean Murdock

let usertoken = ""; //initialize to empty string
let email = "";

let hash = location.hash; //will include the #
let hashparts = hash.split("#");
if (hashparts.length < 2) {
  window.location = "/"; //there is no login token on the url, so they must not have logged in yet, we will help redirect them here
} else {
  usertoken = hashparts[1]; // the url should look like https://stedi.me/timer.html#4c2286a7-8fdc-47c5-b972-739769554c88
  validateToken(); //check if token is expired, if not display the email, if expired send to login
}

const validateToken = () => {
  let tokenEmail = "";
  $.ajax({
    type: "GET",
    url: "/validate/" + usertoken,
    success: function (data) {
      if (data == "") {
        window.location = "/";
      } else {
        $("#email").html(data);
      }
    }, //token is no longer valid (1 hour expiration), they need to log in
    contentType: "application/text",
    dataType: "text",
  });

  return tokenEmail;
};
