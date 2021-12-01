// This is the variable that is being call from the backend
var userType = "";

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  // console.log("Basic profile: " + JSON.stringify(profile))
  // console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log("Name: " + profile.getName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  var email = profile.getEmail();
  var id = profile.getId();
  var id_token = googleUser.getAuthResponse().id_token;
//  console.log(id_token);
  // we are using axios to get the data from the backend to the frontend
  const postItem = () => {
    axios({
      method: "get",
      url: "https://localhost:5001/api/token/" + id_token,
      
    }).then((response) => {
      console.log("whatever", response.data);
      user = response.data;

      // // we are filtering the  userType to verify if they are a student or professor
      if (user.userType == "Professor") {
        window.location.href = "/facultyview.html#"+ id_token;
      } else if (user.userType == "Student") {
        window.location.href = "/studentview.html#"+ id_token;
        // +user.userID;
      } else {
        //  window.location.href = "/";
      }
    });
  };
  postItem();
}
// export {id_token}
