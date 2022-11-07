import React, { useEffect, useState } from "react";
import addprofessor from "./addprofessor.module.css";
import Header from "../../header";
import { getApiRoot } from "../../utils/getApiRoot";
import SubmissionPopup from "../submissionpop";

function AddProfessor() {
  const body = document.querySelector("body");
  const urlParams = window.location.href.split("/")[3];

  const [isOpen, setIsOpen] = useState();
  const [token, setToken] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
    let allFieldsValid = true;
    if (token.length === 0) {
      allFieldsValid = false;
    }
    if (allFieldsValid) {
      const response = await fetch(getApiRoot() + "/api/user/admin/createuser", {
        method: "POST",
        body: JSON.stringify({
          token: token,
          usertype: "Professor",
          userAccess: true,
          isAdmin: false
        }),
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      console.log(response);
      if (response.ok) {
        setConfirmationMessage("Access Requested Succesfully");
        setAgainOptionMessage("Go back to the Studend Dashboard");
        setIsSuccess(true);
      } else {
        setConfirmationMessage("Error Requesting Access");
        setAgainOptionMessage("Try again");
        setIsSuccess(false);
      }
      setIsOpen(true);
    }
  };

  // document.body.classList.add("bg-salmon");
  // document.body.style.backgroundColor = "green";
  // return () => {
  // optionally remove styles when component unmounts
  // document.body.style.backgroundColor = null;
  // document.body.classList.remove("bg-salmon");

  const closePopup = (closeBool) => {
    setToken("");
    setLastName("");
    setEmail("");
    setIsOpen(closeBool);
  };

  return (
    <div className={addprofessor.addprofessor}>
      <div className={addprofessor.container}>
        <div className={addprofessor.header}>
          <Header userType="facultydashboard" />
        </div>
        {/* <button
          className={addprofessor.backbtn}
          onClick={() => {
            navigate("/faculty");
          }}
        >
          Back
        </button> */}
        <div className={addprofessor.main}>
          <h1 className={addprofessor.h1}>Add a Professor</h1>
          <form action="#" className={addprofessor.form} onSubmit={(e) => e.preventDefault()}>
            {/* <!-- Course Name--> */}
            <div className={addprofessor.flexContainer}>
              <div className={addprofessor.data}>
                <div className={addprofessor.singleContainer}>
                  <label htmlFor="name">Token:</label>
                  <input
                    value={token}
                    type="text"
                    id="fname"
                    name="token"
                    className={addprofessor.input}
                    required
                    onChange={(event) => setToken(event.target.value)}
                  />
                </div>
                {/* <div className={addprofessor.singleContainer}>
                  <label htmlFor="name">Last Name:</label>
                  <input
                    value={lastName}
                    type="text"
                    id="lname"
                    name="lastName"
                    className={addprofessor.input}
                    required
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div> */}
                {/* <div className={addprofessor.singleContainer}>
                  <label htmlFor="name">Email:</label>
                  <input
                    value={email}
                    type="text"
                    id="email"
                    name="email"
                    className={addprofessor.input}
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div> */}
              </div>
              <img className={addprofessor.image} alt="teacher" src="/images/teacherpic.jpg"></img>
            </div>
            <button type="submit" className={addprofessor.primaryButton} onClick={validateForm}>
              Request Access
            </button>
            {isOpen && (
              <SubmissionPopup
                closeHandler={closePopup}
                message={confirmationMessage}
                againOptionMessage={againOptionMessage}
                success={isSuccess}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
// }
export default AddProfessor;
