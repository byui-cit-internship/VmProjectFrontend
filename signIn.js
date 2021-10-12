var userType = "";

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // window.location = 'http://127.0.0.1:5500/studentview.html'// redirect to another link
    var email = profile.getEmail()
    var id = profile.getId()

    var id_token = googleUser.getAuthResponse().id_token;

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
                
        
if (userType == "Professor")
{
  window.location.href = "http://127.0.0.1:5500/facultyview.html";
}

else if (userType == "Student")
{
  window.location.href = "http://127.0.0.1:5500/studentview.html";
}
  
 else {
  userType = 'not allow user';
}

            } )
    }
    postItem()
}

window.onGoogleSuccess = function (googleUser) {
  var profile = googleUser.getBasicProfile();

  if (!profile) return false;

  // Store information on variables
  var name    =   profile.getName(),
      email   =   profile.getEmail();

  // Use the data declared above, like making an ajax request

  // Load Google Auth2 lib, and log the user out
  gapi.load('auth2', function() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut();
      console.log('Logged out.');
  });
};

window.onGoogleFailure = function (error) {
  console.log(error);
};

// This method is called by Google JSONP
window.googleRenderButton = function () {
  gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 255,
      'height': 40,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onGoogleSuccess,
      'onfailure': onGoogleFailure
  });
};
