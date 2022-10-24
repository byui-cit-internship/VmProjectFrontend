import { useState, useRef, useEffect } from "react";
import jwt_decode from "jwt-decode";
import Background from "./background";
import styles from "./verifyemail.module.css";
import { Navigate } from "react-router-dom";
import FacultyDashboard from "./components/faculty/facultydashboard";
import StudentDashboard from "./components/student/studentdashboard";
import { getApiRoot } from "./utils/getApiRoot";
import styled from "styled-components";
import ReactInputVerificationCode from "react-input-verification-code";

// V E R I F I C A T I O N   S T Y L E S
const StyledButton = styled.button`
  background: #36c6d9;
  border: none;
  outline: none;
  width: 112px;
  margin: 15px 0px 0px 50px !important;
  border-radius: 8px;
  color: white;
  text-align: unset !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
`;

// V E R I F I C A T I O N   C O N S T A N T S   &   S T Y L E S
export const StyledSeconds = styled.div`
  margin-top: 20px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.002em;
  color: lightgray;
  text-align: unset;
  margin-left: 50px;
`;

const StyledError = styled.div`
  margin-top: 13px;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.004em;
  color: #ef6c65;
`;

const StyledReactInputVerificationCode = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 5px 5px 5px 50px;
  --ReactInputVerificationCode-itemWidth: 40px;
  --ReactInputVerificationCode-itemHeight: 48px;
  --ReactInputVerificationCode-itemSpacing: 8px;

  .ReactInputVerificationCode__item {
    font-size: 16px;
    font-weight: 500;
    color: black;
    /* background: rgba(53, 67, 98, 1); */
    border: 1px solid
      ${({ isInvalid }) => (isInvalid ? "#EF6C65" : "rgba(28, 30, 60, 0.4)")};
    border-radius: 4px;
  }

  .ReactInputVerificationCode__item.is-active {
    box-shadow: none;
    color: black;
    border: 1px solid #36c6d9;
    box-shadow: 0px 0px 12px 0px rgba(35, 86, 214, 0.75);
    -webkit-box-shadow: 0px 0px 12px 0px rgba(35, 86, 214, 0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(35, 86, 214, 0.75);
  }
`;

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
                  {/* V A L I D A T I O N */}
                  <StyledReactInputVerificationCode
                    isInvalid={isInvalid}
                    className={styles.StyledReactInputVerificationCode}
                  >
                    <ReactInputVerificationCode
                      className={styles.ReactInputVerificationCode}
                      value={value}
                      placeholder={null}
                      length={5}
                      onChange={(newValue) => {
                        setValue(newValue);

                        if (newValue !== "") {
                          setError(null);
                        }
                      }}
                    />
                  </StyledReactInputVerificationCode>

                  {error && (
                    <StyledError className={styles.StyledError}>
                      {error}
                    </StyledError>
                  )}
                  {/* 
                  {seconds && (
                    <StyledSeconds
                      className={styles.StyledSeconds}
                    >{`Verification code has been re-sent (${seconds}s)`}</StyledSeconds>
                  )} */}

                  <StyledButton
                    className={styles.StyledButton}
                    onClick={() => {
                      setValue("");
                      setError("Incorrect code. Please try again");
                      setIsInvalid(true);
                      setSeconds(60);

                      let mySeconds = 60;

                      // TODO Clear previos interval

                      const intervalId = setInterval(() => {
                        mySeconds = mySeconds - 1;
                        setSeconds(mySeconds);

                        if (mySeconds === 0) {
                          clearInterval(intervalId);
                          setSeconds(null);
                        }
                      }, 1000);

                      setTimeout(() => {
                        setIsInvalid(false);
                      }, 1000);
                    }}
                  >
                    Send
                  </StyledButton>
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
