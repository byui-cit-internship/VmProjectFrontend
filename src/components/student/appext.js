import { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Background from "../../background";
import styles from "./appext.module.css";
import { Navigate } from "react-router-dom";
import FacultyDashboard from "../faculty/facultydashboard";
import StudentDashboard from "./studentdashboard";
import VerifiedEmail from "../../verifyemail";
import { BFF } from "../../utils/bff";
// import Header from "../header";

const handleFailure = (result) => {
  console.log("There was a problem logging in.", result);
};

function App() {
  // - Verified Email Code
  const verifiedEmail = useRef(false); //
  const [userIsLoggedIn, setUserLoggedIn] = useState(false); //this creates a placeholder for the user logged in state
  const [authorization, setAuthorization] = useState({});
  const [googleJwt, setGoogleJwt] = useState("");
  // let userIsAdministrator = useRef(false);//this is similar to state but won't re-render
  const googleCredentials = useRef({});
  useEffect(() => {
    const verifyJwt = async () => {
      let postBody = { accessTokenValue: googleJwt };
      const authorizationObject = await BFF.Post("/api/token", postBody);
      verifiedEmail.current = authorizationObject.isVerified; //
      console.log(verifiedEmail.current);
      sessionStorage.setItem("userInfo", JSON.stringify(authorizationObject));
      setAuthorization(authorizationObject);
    };

    // - Verified Email Code
    // const verifyEm = async () => {
    //   //
    //   const emResponse = await fetch(getApiRoot() + "/api/token", {
    //     //
    //     credentials: "include", //
    //     headers: {
    //       //
    //       "content-type": "application/json", //
    //     }, //
    //     method: "POST", //
    //     body: JSON.stringify({ accessTokenValue: verifiedEmail }), //
    //   }); //
    //   const emailIsVerifiedObject = await emResponse.json();
    //   sessionStorage.setItem("userInfo", JSON.stringify(emailIsVerifiedObject)); //

    // };

    // verifyEm();

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
      <div className={styles.app}>
        <div className={styles.appheader}>
          {/* <h1>React Google Login App</h1> */}
          {/* <div id="back_mobile" >
      
    </div> */}
          <div className={styles.container}>
            {/* <Header userType="studentdashboard" /> */}
            <div className={styles.text}>
              <img className={styles.logo} src="images/LOGO-VIMA.png" alt="logo" />
              <div className={styles.main}>
                <h2 className={styles.h2}>Are you a professor? </h2>
                {/* <!-- <div class="image"><img src='/images/hero.png' width="300px"/></div> --> */}

                <div className={styles.image_and_button}>
                  <div className={styles.imagehero}>
                    <img src="/images/mobile-hero.png" alt="heroimg" />
                  </div>
                  <p className={styles.description}>
                    Request access by clicking here
                    <button className={styles.requestButton}>Request Access</button>
                  </p>
                  {/* <p className={styles.description}>
                    Are you a student? Please, use your byui account
                    <div className={styles.example}>ex. abc12345@byui.edu</div>
                    <div className={styles.google_button}>
                      
                      <GoogleOAuthProvider
                        clientId="705504613323-8lejrhq0knt36ltf4fkbth2l8aosrhrb.apps.googleusercontent.com"
                        id={styles.googleAuth}>
                        <GoogleLogin
                          id={styles.googleLogin}
                          onSuccess={handleLogin}
                          onError={handleFailure}
                          className={styles.button}></GoogleLogin>
                      </GoogleOAuthProvider>
                      
                    </div>
                  </p> */}
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
    if (authorization.isAdmin === true && verifiedEmail.current === false) {
      console.log("Admin not verified");
      return <Navigate to="/verifyemail" element={<VerifiedEmail />} />;
    } else if (authorization.isAdmin === true && verifiedEmail.current === true) {
      console.log("Admin verified");
      return (
        // console.log("Admin verified");
        <Navigate to="/facultydashboard" element={<FacultyDashboard />} />
      );
    } else if (authorization.isAdmin === false && verifiedEmail.current === true) {
      console.log("Student verified");
      return (
        // window.location.href="VMstudent_dashboard/studentview.html"
        <Navigate to="/studentdashboard" element={<StudentDashboard />} />
      );
    } else if (authorization.isAdmin === false && verifiedEmail.current === false) {
      console.log("Student not verified");
      return (
        // window.location.href="VMstudent_dashboard/studentview.html"
        <Navigate to="/verifyemail" element={<VerifiedEmail />} />
      );
    } else {
      console.log("One re-render too soon to verify Google JWT");
    }
  }
}

export default App;
