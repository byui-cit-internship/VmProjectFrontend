
function verifyToken(){

let usertoken = ""; //initialize to empty string
let email = "";

//check if token is expired, if not display the email, if expired send to login
const validateToken = () => {
  let tokenEmail = "";
  $.ajax({
    type: "GET",
    url: "https://localhost:5001/api/token/",
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

