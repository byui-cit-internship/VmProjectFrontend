// import './app.css';
// import './background.css';
import { useState, useRef, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import Background from "./background";
import styles from "./verifyemail.module.css";
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
  //
  //
  //
  // THIS IS JUST THE VERIFICATION CODE STUFF
  //
  //
  // const form = document.querySelector("form");
  // const inputs = form.querySelectorAll("input");
  // const KEYBOARDS = {
  //   backspace: 8,
  //   arrowLeft: 37,
  //   arrowRight: 39,
  // };

  // function handleInput(e) {
  //   const input = e.target;
  //   const nextInput = input.nextElementSibling;
  //   if (nextInput && input.value) {
  //     nextInput.focus();
  //     if (nextInput.value) {
  //       nextInput.select();
  //     }
  //   }
  // }

  // function handlePaste(e) {
  //   e.preventDefault();
  //   const paste = e.clipboardData.getData("text");
  //   inputs.forEach((input, i) => {
  //     input.value = paste[i] || "";
  //   });
  // }

  // function handleBackspace(e) {
  //   const input = e.target;
  //   if (input.value) {
  //     input.value = "";
  //     return;
  //   }

  //   input.previousElementSibling.focus();
  // }

  // function handleArrowLeft(e) {
  //   const previousInput = e.target.previousElementSibling;
  //   if (!previousInput) return;
  //   previousInput.focus();
  // }

  // function handleArrowRight(e) {
  //   const nextInput = e.target.nextElementSibling;
  //   if (!nextInput) return;
  //   nextInput.focus();
  // }

  // form.addEventListener("input", handleInput);
  // inputs[0].addEventListener("paste", handlePaste);

  // inputs.forEach((input) => {
  //   input.addEventListener("focus", (e) => {
  //     setTimeout(() => {
  //       e.target.select();
  //     }, 0);
  //   });

  //   input.addEventListener("keydown", (e) => {
  //     switch (e.keyCode) {
  //       case KEYBOARDS.backspace:
  //         handleBackspace(e);
  //         break;
  //       case KEYBOARDS.arrowLeft:
  //         handleArrowLeft(e);
  //         break;
  //       case KEYBOARDS.arrowRight:
  //         handleArrowRight(e);
  //         break;
  //       default:
  //     }
  //   });
  // });

  //
  //
  //
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
      <div className={styles.app}>
        <div className={styles.appheader}>
          {/* <h1>React Google Login App</h1> */}
          {/* <div id="back_mobile" >
      
    </div> */}
          <div className={styles.container}>
            <div className={styles.text}>
              <img
                className={styles.logo}
                src="images/LOGO-VIMA.png"
                alt="logo"
              />
              <div className={styles.main}>
                <h2 className={styles.h2}>Please, confirm your email</h2>
                {/* <!-- <div class="image"><img src='/images/hero.png' width="300px"/></div> --> */}

                <div className={styles.image_and_button}>
                  <div className={styles.imagehero}>
                    <img src="/images/mobile-hero.png" alt="heroimg" />
                  </div>
                  <p className={styles.description}>
                    Hi, (name). We're happy you signed up for VIMA. To start
                    using the app, please confirm your email address with the
                    code that we sent to your email.
                  </p>
                  <form action="#" className={styles.form}>
                    <h4 class="text-center mb-4">Enter your code</h4>
                    <div className={styles.dflex}>
                      <input
                        required
                        type="tel"
                        maxlength="1"
                        pattern="[0-9]"
                        className={styles.formControl}
                      />
                      <input
                        type="tel"
                        maxlength="1"
                        pattern="[0-9]"
                        className={styles.formControl}
                      />
                      <input
                        type="tel"
                        maxlength="1"
                        pattern="[0-9]"
                        className={styles.formControl}
                      />
                      <input
                        type="tel"
                        maxlength="1"
                        pattern="[0-9]"
                        className={styles.formControl}
                      />
                      <input
                        type="tel"
                        maxlength="1"
                        pattern="[0-9]"
                        className={styles.formControl}
                      />
                    </div>

                    <button type="submit" className={styles.btn}>
                      Verify account
                    </button>
                  </form>
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
