import { useState, useRef, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Background from "./background";
import styles from "./appext.module.css";
import { Navigate } from "react-router-dom";
import FacultyDashboard from "./components/faculty/facultydashboard";
import StudentDashboard from "./components/student/studentdashboard";
import { getApiRoot } from "./utils/getApiRoot";
import ReactInputVerificationCode from "react-input-verification-code";
import { useNavigate } from "react-router-dom";

function App() {
  // THIS IS JUST THE VERIFICATION CODE STUFF
  const [value, setValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [error, setError] = useState(null);
  const [seconds, setSeconds] = useState(null);
  //
  const [userIsLoggedIn, setUserLoggedIn] = useState(false); //this creates a placeholder for the user logged in state
  const [authorization, setAuthorization] = useState({});
  const [googleJwt, setGoogleJwt] = useState("");
  const [isCodeResent, setIsCodeResent] = useState();
  // let userIsAdministrator = useRef(false);//this is similar to state but won't re-render
  const googleCredentials = useRef({});

  useEffect(() => {
    const verifyUserLink = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const confirmationCode = urlParams.get("code");

      if (!confirmationCode) {
        return;
      }

      const options = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "PUT"
      };

      const response = await fetch(
        getApiRoot() + `/api/user/verifyUser/${confirmationCode}`,
        options
      );

      if (response.ok) {
        //TO-DO
      }
    };

    verifyUserLink();
  }, []);

  useEffect(() => {
    const verifyJwt = async () => {
      const jwtResponse = await fetch(getApiRoot() + "/api/token", {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ accessTokenValue: googleJwt })
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

  let navigate = useNavigate();

  const resendConfirmationCode = async () => {
    const options = {
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      method: "PUT"
    };
    const response = await fetch(getApiRoot() + "/api/user/sendCode", options);
    if (response.ok) {
      setIsCodeResent("success");
    } else {
      setIsCodeResent("false");
    }
  };

  if (googleJwt === "") {
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
                <h2 className={styles.h2}>Please, read the following instructions</h2>
                {/* <!-- <div class="image"><img src='/images/hero.png' width="300px"/></div> --> */}

                <div className={styles.image_and_button}>
                  <div className={styles.imagehero}>
                    <img src="/images/mobile-hero.png" alt="heroimg" />
                  </div>
                  <p className={styles.description}>
                    Are you a professor? Request access by clicking here
                  </p>
                  <p className={styles.description}>Are you a student? </p>
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

//
// https://codesandbox.io/s/code-verification-forked-3gtjg7?file=/src/App.js:0-3425
//
