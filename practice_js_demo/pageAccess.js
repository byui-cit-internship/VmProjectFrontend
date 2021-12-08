
/***********************************************

Code not needed 

This code is hashing the token from the url and then use it to verify the user 
and validate the token after redirecting to another page. This function is adding
more security to the website. We are not using this function anymore because we 
are using sessionStorage instead of URL storage.

***********************************************/
function verifyToken(){

let usertoken = ""; //initialize to empty string
let email = "";

let hash = location.hash; //will include the #
let hashparts = hash.split("#");
if (hashparts.length < 2) {
  window.location = "/"; //there is no login token on the url, so they must not have logged in yet, we will help redirect them here
} else {

usertoken = hashparts[1]; // the url should look like https://stedi.me/timer.html#4c2286a7-8fdc-47c5-b972-739769554c88
console.log("usertoken " + usertoken)
  //  validateToken(); 
  
}

//check if token is expired, if not display the email, if expired send to login
const validateToken = () => {
  let tokenEmail = "";
  $.ajax({
    type: "GET",
    url: "https://localhost:5001/api/Token/" + usertoken,
    success: function (data) {
      if (data == "") {
        window.location = "/";
      } else {
      }
    }, //token is no longer valid (1 hour expiration), they need to log in
    contentType: "application/text",
    dataType: "text",
    headers: {
      authorization: "bearer " + usertoken
    }
  });

  return tokenEmail;
};
$(document).ready(validateToken)

}

function savetoken(token){
  // whatever passes as token should save into local storage
      if (window.sessionStorage){
       sessionStorage.setItem("token", token);
      }
  }


