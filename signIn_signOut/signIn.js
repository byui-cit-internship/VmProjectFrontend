
/**********************************************
 * This function triggers the google third party api to auth our user, it helps to create
 * our sign-in page so we don't have to create one.
 * ******************************** */
function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;

  var new_token = id_token.replaceAll(/\./g, "%2E")
  console.log(new_token)
  //Making a call to the back end to verify token and check wheather user exits in database 
  //they are a professor or student.
  const baseApiUrl = GetApiRoot()
  console.log(baseApiUrl)
  const postItem = () => {
    axios({
      method: "get",
      url: baseApiUrl + "/api/token/" + new_token,

    }).then((response) => {
      user = response.data;
      const user_id = user.userID

      const name = `${user.firstName} ${user.lastName}`
      console.log(user)
      savetoken(id_token, user_id, name, user.isAdmin);
      // we are filtering the  userType to verify if they are a student or professor
      if (user.userType == "Professor") {
        window.location.href = "/VMfaculty_dashboard/facultyview.html";
      }
      else if (user.userType == "Student") {
        window.location.href = "/VMstudent_dashboard/studentview.html";

      }
      else {
        window.location.href = "/";
      }
    });
  };
  postItem();

}
function savetoken(token, user_id, name, isAdmin) {

  // whatever passes as token should save into local storage
  // we are also saving the user_id and name for later use on different pages
  if (window.sessionStorage) {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user_id", user_id);
    sessionStorage.setItem("user_name", name);
    sessionStorage.setItem("isAdmin", isAdmin);
  }
}

const GetApiRoot = () => {
  const hashTag = window.location.hash;
  console.log('Hash tag ' + hashTag);
  let apiRoot = hashTag === '#local'
    ? 'http://localhost:5001'
    : 'http://dev-vm-api.citwdd.net';

  if (window.location.hostname.includes('dev-vm')) {
    apiRoot = 'http://dev-vm-api.citwdd.net';
  } else if (window.location.hostname.includes('test-vm')) {
    apiRoot = 'http://test-vm-api.citwdd.net';
  } else if (window.location.hostname.includes('prod-vm')) {
    apiRoot = 'http://prod-vm-api.citwdd.net';
  }
  return apiRoot
}