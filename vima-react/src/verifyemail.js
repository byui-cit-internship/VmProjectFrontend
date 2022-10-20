// import './app.css';
// import './background.css';
import { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Background from "./background";
import VerifyEmail from "./verifyemail.module.css";
import { Navigate } from "react-router-dom";
import FacultyDashboard from "./components/faculty/facultydashboard";
import StudentDashboard from "./components/student/studentdashboard";
import { getApiRoot } from "./utils/getApiRoot";
// import { useGoogleLogin } from "@react-oauth/google";
// import background from './background.module.css';
// import { Component } from "react";
// import "./App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import GoogleLoginComponent from "./appextension.js";

// class AppExt extends Component {
//   render() {
//     return (
//       <div className="App container">
//         <h2>React Google Login Example</h2>
//         <GoogleLoginComponent />
//       </div>
//     );
//   }
// }
// export default AppExt;

const handleFailure = (result) => {
  console.log("There was a problem logging in.", result);
};

function App() {
  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => console.log(codeResponse),
  //   flow: "auth-code",
  // });
  const [userIsLoggedIn, setUserLoggedIn] = useState(false); //this creates a placeholder for the user logged in state
  const [authorization, setAuthorization] = useState({});
  const [googleJwt, setGoogleJwt] = useState("");
  // let userIsAdministrator = useRef(false);//this is similar to state but won't re-render
  const googleCredentials = useRef({});
  useEffect(() => {
    const verifyJwt = async () => {
      const jwtResponse = await fetch(getApiRoot() + "/api/token", {
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ accessTokenValue: googleJwt }),
      });

      const authorizationObject = await jwtResponse.json();
      sessionStorage.setItem("userInfo", JSON.stringify(authorizationObject));
      setAuthorization(authorizationObject);
    };

    if (googleJwt.length > 0) {
      //be sure the google JWT is already assigned (they have authenticated with Google)
      verifyJwt();
    }
  }, [userIsLoggedIn, googleJwt]); //only verify the token if the logged in state has changed

  const handleLogin = (googleData) => {
    googleCredentials.current = jwt_decode(googleData.credential);
    setGoogleJwt(googleData.credential);
    const email = googleCredentials.current.email;

    setUserLoggedIn(true);
    // userIsAdministrator=true;//we will need to change this to look up the user from the backend
    //this is dummy information on where the page should load next. We would just need to enter a link that we want to go to here!
    console.log(`Welcome ${email} You successfully logged in.`, googleData);
  };

  if (googleJwt === "") {
    return (
      <div className={VerifyEmail.app}>
        <div className={VerifyEmail.appheader}>
          {/* <h1>React Google Login App</h1> */}
          {/* <div id="back_mobile" >
      
    </div> */}
          <div className={VerifyEmail.container}>
            <div className={VerifyEmail.text}>
              <img
                className={VerifyEmail.logo}
                src="images/LOGO-VIMA.png"
                alt="logo"
              />
              <div className={VerifyEmail.main}>
                <h2 className={VerifyEmail.h2}>Please, verify your email</h2>
                {/* <!-- <div class="image"><img src='/images/hero.png' width="300px"/></div> --> */}

                <div className={VerifyEmail.image_and_button}>
                  <div className={VerifyEmail.imagehero}>
                    <img src="/images/mobile-hero.png" alt="heroimg" />
                  </div>
                  <p className={VerifyEmail.p}>
                    Hi, (name). We're happy you signed up for VIMA. To start
                    using the app, please confirm your email address with the
                    code that we sent to your email.
                  </p>
                  {/* <div class="g-signin2" data-onsuccess="onSignIn" onclick="loadPage()" data-theme="dark"></div> */}
                </div>
              </div>
            </div>
          </div>
          <Background />
        </div>
      </div>
    );
  } else {
    console.log(googleCredentials.current.email);
    if (authorization.isAdmin === true) {
      return (
        //View could work instead of div here, but not sure
        <Navigate to="/faculty" element={<FacultyDashboard />} />
        // window.location.href="VMfaculty_dashboard/facultyview.html"
      );
    } else if (authorization.isAdmin === false) {
      return (
        // window.location.href="VMstudent_dashboard/studentview.html"
        <Navigate to="/student" element={<StudentDashboard />} />
      );
    } else {
      console.log("One re-render too soon to verify Google JWT");
    }
  }
}

export default App;
