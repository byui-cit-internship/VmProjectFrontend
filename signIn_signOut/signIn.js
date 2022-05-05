
/**********************************************
 * This function triggers the google third party api to auth our user, it helps to create
 * our sign-in page so we don't have to create one.
 * ******************************** */
async function onSignIn(googleUser) {
  let response = googleUser.getAuthResponse()
  let accessToken = response.access_token;
  //var new_token = id_token.replaceAll(/\./g, "%2E")
  //console.log(new_token)
  //Making a call to the back end to verify token and check wheather user exits in database 
  //they are a professor or student.
  let getApiRoot = await import('./getApiRoot.js')
  console.log(getApiRoot);
  const baseApiUrl = getApiRoot.getApiRoot()
  console.log(baseApiUrl)
  // await axios.get(baseApiUrl, {withCredentials: true})

  // await axios.get(`${baseApiUrl}`, {withCredentials : true})

  // await axios.get(baseApiUrl, { withCredentials: true })

  const postItem = () => {
    axios.post(`${baseApiUrl}/api/token`, {
      "accessTokenValue": accessToken
    }, { withCredentials: true })
      .then((response) => {
        console.log(response);

        user = response.data;
        console.log(user)
        savetoken(user);

        if (sessionStorage.getItem("isAdmin") == "true") {
          window.location.href = "/VMfaculty_dashboard/facultyview.html";
        }
        else {
          window.location.href = "/VMstudent_dashboard/studentview.html";
        }
        // we are filtering the  userType to verify if they are a student or professor 
      });
  };
  postItem();

}

function savetoken(user) {

  // whatever passes as token should save into local storage
  // we are also saving the user_id and name for later use on different pages
  if (window.sessionStorage) {
    //sessionStorage.setItem("token", token);
    sessionStorage.setItem("user_id", user.userId);
    sessionStorage.setItem("user_name", `${user.firstName} ${user.lastName}`);
    sessionStorage.setItem("isAdmin", user.isAdmin);
    sessionStorage.setItem("firstName", user.firstName);
    sessionStorage.setItem("lastName", user.lastName);
    sessionStorage.setItem("email", user.email)
  }
}

function loadPage() {

}
