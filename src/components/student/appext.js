import React, { useEffect, useState } from "react";
import styles from "../faculty/addprofessor.module.css";
import Header from "../../header";
import { getApiRoot } from "../../utils/getApiRoot";
import SubmissionPopup from "../submissionpop";

function AddProfessor() {
  const body = document.querySelector("body");
  const urlParams = window.location.href.split("/")[3];

  const [isOpen, setIsOpen] = useState();
  const [token, setToken] = useState("");
  const [isSuccess, setIsSuccess] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState();
  const [againOptionMessage, setAgainOptionMessage] = useState();

  useEffect(() => {
    if (urlParams === "addprofessor") {
      body.style.height = "100vh";
      body.style.display = "flex";
      body.style.justifyContent = "center";
      body.style.alignItems = "center";
    }
  });

  const validateForm = async () => {
    console.log("validateform here.");
    if (token) {
      const response = await fetch(getApiRoot() + "/api/user/requestAccess", {
        method: "PUT",
        body: JSON.stringify({
          CanvasToken: token
        }),
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      if (response.ok) {
        setConfirmationMessage("Access Requested!");
        setAgainOptionMessage("Close Pop-up");
        setIsSuccess(true);
      } else {
        setConfirmationMessage("Error Requesting Access");
        setAgainOptionMessage("Please Try Again");
        setIsSuccess(false);
      }
      setIsOpen(true);
    }
  };

  const closePopup = (closeBool) => {
    setToken("");
    setIsOpen(closeBool);
  };

  return (
    <div className={styles.addprofessor}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Header userType="studentdashboard" />
        </div>
        <div className={styles.main_token}>
          <h2 className={styles.h2_token}>Are you a professor? </h2>
          <p className={styles.description_token}>
            To request access and be able to add classes, please put in your <strong>Canvas Token</strong>
          </p>
          {/* <!-- Course Name--> */}
          <div className={styles.flexContainer_token}>
            <div className={styles.data}>
              <div className={styles.singleContainer_token}>
                <label htmlFor="name">Token:</label>
                <input
                  value={token}
                  type="text"
                  id="fname"
                  name="token"
                  className={styles.input}
                  required
                  onChange={(event) => setToken(event.target.value)}
                />
              </div>
            </div>
            <button type="submit" className={styles.requestButton} onClick={validateForm}>
              Request Access
            </button>
          </div>
          {/* <img src="/images/mobile-hero.png" alt="heroimg"> */}
          {isOpen && (
            <SubmissionPopup
              closeHandler={closePopup}
              message={confirmationMessage}
              againOptionMessage={againOptionMessage}
              success={isSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default AddProfessor;
