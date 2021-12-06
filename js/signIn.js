/**********************************************
 * This function triggers the google third party api to auth our user, it helps to create
 * our sign-in page so we don't have to create one.
 * ******************************** */
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  console.log(id_token);

  // Making a call to the back end to verify token and check wheather user exits in database 
  //they are a professor or student.

  const postItem = () => {
    axios({
      method: "get",
      url: "https://localhost:5001/api/token/"+ id_token,

    }).then((response) => {
      user = response.data;

      console.log("this is user", user)

      //we are filtering the  userType to verify if they are a student or professor
      if (user == "Professor") {
        window.location.href = "/facultyview.html";
      } else if (user == "Student") {
        window.location.href = "/studentview.html";
     
      } else {
        window.location.href = "/";
      }
    });
  };
  postItem();
  savetoken(id_token);
}

function savetoken(token) {
  // whatever passes as token should save into local storage
  if (window.sessionStorage) {
    sessionStorage.setItem("token", token);
  }
}

