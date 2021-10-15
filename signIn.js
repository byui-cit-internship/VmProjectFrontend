// This is the variable that is being call from the backend
var userType = "";

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var email = profile.getEmail()
    var id = profile.getId()
    var id_token = googleUser.getAuthResponse().id_token;

// we are using axios to get the data from the backend to the frontend
    const postItem = () => {
        axios({
            method: "post",
            url: "https://localhost:5001/api/token",
            data: {
                ID: "7987987989789",
                token: id_token
            }
        })
            .then(response => {
                console.log(response.data)
                userType = response.data
                
// we are filtering the  userType to verify if they are a student or professor
if (userType == "Professor")
{
  window.location.href = "http://127.0.0.1:5500/facultyview.html";
}


        if (userType == "Professor") {
          window.location.href = "https://www.google.com/";
        }

        else if (userType == "Student") {
          window.location.href = "http://127.0.0.1:5500/studentview.html";
        }

        else {
          userType = 'not allow user';
        }

      })
  }
  postItem()
}
