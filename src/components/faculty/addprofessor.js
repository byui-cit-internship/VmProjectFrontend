import React, { useEffect, useState } from "react";
import addprofessor from "./addprofessor.module.css";
import Header from "../../header";
import { getApiRoot } from "../../utils/getApiRoot";
import SubmissionPopup from "../submissionpop";

function AddProfessor() {
  const body = document.querySelector("body");
  const urlParams = window.location.href.split("/")[3];

  const [isOpen, setIsOpen] = useState();
  const [firstName, setFirstName] = useState("");
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
    console.log("validate form here.");
    let allFieldsValid = true;
    if (firstName.length === 0 || lastName.length === 0 || email.length === 0) {
      allFieldsValid = false;
    }
    if (allFieldsValid) {
      const response = await fetch(getApiRoot() + "/api/user/admin/createuser", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
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
        setConfirmationMessage("Professor added succesfully");
        setAgainOptionMessage("Add another professor");
        setIsSuccess(true);
      } else {
        setConfirmationMessage("Error adding professor");
        setAgainOptionMessage("Try again");
        setIsSuccess(false);
      }
      setIsOpen(true);
    }
  };
  const closePopup = (closeBool) => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setIsOpen(closeBool);
  };

  return (
    <div className={addprofessor.addprofessor}>
      <div className={addprofessor.container}>
        <Header userType="facultydashboard" />

        <div className={addprofessor.main}>
          <h1 className={addprofessor.h1}>Add a Professor</h1>
          <form action="#" className={addprofessor.form} onSubmit={(e) => e.preventDefault()}>
            {/* <!-- Course Name--> */}
            <div className={addprofessor.flexContainer}>
              <div className={addprofessor.data}>
                <div className={addprofessor.singleContainer}>
                  <label htmlFor="name">First Name:</label>
                  <input
                    value={firstName}
                    type="text"
                    id="fname"
                    name="firstName"
                    className={addprofessor.input}
                    required
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className={addprofessor.singleContainer}>
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
                </div>
                <div className={addprofessor.singleContainer}>
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
                </div>
              </div>
              <img className={addprofessor.image} alt="teacher" src="/images/teacherpic.jpg"></img>
            </div>
            <button type="submit" className={addprofessor.primaryButton} onClick={validateForm}>
              Add
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
