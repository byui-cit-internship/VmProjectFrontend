import { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Background from "./background";
import styles from "./app.module.css";
import { Navigate } from "react-router-dom";
import FacultyDashboard from "./components/faculty/facultydashboard";
import StudentDashboard from "./components/student/studentdashboard";
import { BFF } from "./utils/bff";
import React from "react";

const handleFailure = (result) => {
  console.log("There was a problem logging in.", result);
};

function App() {
  // - Verified Email Code
  const [authorization, setAuthorization] = useState();
  const [googleJwt, setGoogleJwt] = useState("");

  console.log(authorization);
  // let userIsAdministrator = useRef(false);//this is similar to state but won't re-render
  const googleCredentials = useRef({});
  useEffect(() => {
    const verifyJwt = async () => {
      let postBody = { accessTokenValue: googleJwt };
      const authorizationObject = await BFF.Post("/api/token", postBody);
      sessionStorage.setItem("userInfo", JSON.stringify(authorizationObject));
      console.log(authorizationObject);
      setAuthorization(authorizationObject);
    };

    if (googleJwt.length > 0) {
      //be sure the google JWT is already assigned (they have authenticated with Google)
      verifyJwt();
    }
  }, [googleJwt]); //only verify the token if the logged in state has changed

  const handleLogin = (googleData) => {
    googleCredentials.current = jwt_decode(googleData.credential);
    const email = googleCredentials.current.email;
    setGoogleJwt(googleData.credential);
    // userIsAdministrator=true;//we will need to change this to look up the user from the backend
    //this is dummy information on where the page should load next. We would just need to enter a link that we want to go to here!
    console.log(`Welcome ${email} You successfully logged in.`, googleData);
  };

  if (!authorization) {
    return (
      <div className={styles.app}>
        <div className={styles.appheader}>
          {/* <h1>React Google Login App</h1> */}
          {/* <div id="back_mobile" >
      
    </div> */}
          <div className={styles.container}>
            <div className={styles.text}>
              <img className={styles.logo} src="images/LOGO-VIMA.png" alt="logo" />
              <div className={styles.main}>
                <h2 className={styles.h2}>
                  Welcome to{" "}
                  <span className={styles.vima} id="vima">
                    vima
                  </span>
                  <br />
                  the VM self-service app
                </h2>
                {/* <!-- <div class="image"><img src='/images/hero.png' width="300px"/></div> --> */}

                <div className={styles.image_and_button}>
                  <div className={styles.imagehero}>
                    <img src="/images/mobile-hero.png" alt="heroimg" />
                  </div>
                  
                  {/* <div class="g-signin2" data-onsuccess="onSignIn" onclick="loadPage()" data-theme="dark"></div> */}
                  <div className={styles.google_button}>
                    {/* Login */}
                    <GoogleOAuthProvider
                      clientId="36675469793-5u18bmm9gjjnmfcsdj9l502lo5k3glei.apps.googleusercontent.com"
                      id={styles.googleAuth}>
                      <GoogleLogin
                        id={styles.googleLogin}
                        onSuccess={handleLogin}
                        onError={handleFailure}
                        className={styles.button}></GoogleLogin>
                    </GoogleOAuthProvider>
                    {/* <GoogleLoginComponent /> */}
                  </div>
                  <p className={styles.p}>Login with your BYUI account</p>
                </div>
              </div>
            </div>
          </div>
          <Background />
        </div>
      </div>
    );
  } else {
    if (authorization.isAdmin) {
      return <Navigate to="/facultydashboard" element={<FacultyDashboard />} />;
    } else if (!authorization.isAdmin) {
      return <Navigate to="/studentdashboard" element={<StudentDashboard />} />;
    }
  }
}

export default App;
