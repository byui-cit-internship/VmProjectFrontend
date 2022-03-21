
/**********************************************
 * This function triggers the google third party api to auth our user, it helps to create
 * our sign-in page so we don't have to create one.
 * ******************************** */
function onSignIn(googleUser) {
  let response = googleUser.getAuthResponse()
  let accessToken = response.access_token;
  //var new_token = id_token.replaceAll(/\./g, "%2E")
  //console.log(new_token)
  //Making a call to the back end to verify token and check wheather user exits in database 
  //they are a professor or student.
  const baseApiUrl = GetApiRoot()
  console.log(baseApiUrl)

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
  }
}

function loadPage() {

}

const GetApiRoot = () => {
  const hashTag = window.location.hostname;
  console.log('Hash tag ' + hashTag);
  let apiRoot = 'http://localhost:5000';
  // ? 'https://localhost:5001'
  // : 'http://dev-vm-api.citwdd.net';

  if (window.location.hostname.includes('vmfrontend-dev')) {
    apiRoot = 'https://dev-vm-api.citwdd.net';
  } else if (window.location.hostname.includes('vmfrontend-test')) {
    apiRoot = 'https://test-vm-api.citwdd.net';
  } else if (window.location.hostname.includes('vmfrontend-prod')) {
    apiRoot = 'https://prod-vm-api.citwdd.net';
  }
  return apiRoot
}