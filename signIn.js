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
            .then(response => console.log("this is backend response",response))
    }
    postItem()

    if (response = teacher)
  {
    window.location = 'http://127.0.0.1:5500/facultyview.html';
  }

  else if (response = student)
  {
    window.location = 'http://127.0.0.1:5500/studentview.html';
  }
    
   else {
    response = 'not allow user';
  }
  return response;
      } 

// this function sign out of the website
// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         console.log('User signed out.')
//     });
// }

//this function is a if statement that decides if the user is student/teacher
// function output()
// {

//   if (response = teacher)
//   {
//     response = window.location = 'linkhttp://127.0.0.1:5500/facultyview.html';
//   }

//   else if (response = student)
//   {
//     response = window.location = 'linkhttp://127.0.0.1:5500/studentview.html';
//   }
    
//    else {
//     response = 'not allow user';
//   }
//   return response;

// }
  



