import React, { useEffect } from "react";
// import background from './background.module.css';
import addprofessor from "./addprofessor.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../header";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { getApiRoot } from "../../utils/getApiRoot";

function AddProfessor() {
  const body = document.querySelector("body");
  const urlParams = window.location.href.split("/")[3];

  useEffect(() => {
    if (urlParams === "addprofessor") {
      body.style.height = "100vh";
      body.style.display = "flex";
      body.style.justifyContent = "center";
      body.style.alignItems = "center";
    }
  });

  const validateForm = async () => {
    console.log("validateform here.")
    let allFieldsValid = true;
    if (firstName.length === 0 || lastName.length === 0 || email.length === 0) {
      allFieldsValid = false;
    }
    if (allFieldsValid) {
      const response = await fetch(
        getApiRoot() + "/api/user/admin/createuser",
        {
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
            "content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        setIsOpen(true);
        //This makes the modal window popup
      } else {
        console.log("Error", responseStatus);
      }
    }
  };

  let navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // document.body.classList.add("bg-salmon");
  // document.body.style.backgroundColor = "green";
  // return () => {
  // optionally remove styles when component unmounts
  // document.body.style.backgroundColor = null;
  // document.body.classList.remove("bg-salmon");

  return (
    <div className={addprofessor.addprofessor}>
      <div className={addprofessor.container}>
        <div className={addprofessor.header}>
          <Header userType="faculty" />
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
          <form action="#" className={addprofessor.form} onSubmit={(e)=>(e.preventDefault())}> 
            {/* <!-- Course Name--> */}
            <div className={addprofessor.flexContainer}>
              <div className={addprofessor.data}>
                <div className={addprofessor.singleContainer}>
                  <label htmlFor="name">First Name:</label>
                  <input
                    type="text"
                    id="fname"
                    name="firstName"
                    className={addprofessor.input}
                    placeholder="Enter professor first name"
                    required
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </div>
                <div className={addprofessor.singleContainer}>
                  <label htmlFor="name">Last Name:</label>
                  <input
                    type="text"
                    id="lname"
                    name="lastName"
                    className={addprofessor.input}
                    placeholder="Enter professor last name"
                    required
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </div>
                <div className={addprofessor.singleContainer}>
                  <label htmlFor="name">Email:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className={addprofessor.input}
                    placeholder="Enter professor email"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
              <img
                className={addprofessor.image}
                alt="teacher"
                src="/images/teacherpic.jpg"
              ></img>
            </div>
            <button
              type="submit"
              className={addprofessor.primaryButton}
              onClick={validateForm}
            >
              Add Professor
            </button>
            {isOpen && (
              <div className={addprofessor.modal}>
                <div className={addprofessor.modalBox}>
                  <button
                    className={addprofessor.closeBtn}
                    onClick={() => setIsOpen(false)}
                  >
                    X
                  </button>
                  <div className={addprofessor.message}>
                    <div className={addprofessor.iconPlaceholder}>
                      <FaCheck className={addprofessor.checkicon} />
                    </div>
                    <div className={addprofessor.message}>
                      Added Successfully!
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
// }
export default AddProfessor;
