import React from "react";
// import background from './background.module.css';
import addprofessor from "./addprofessor.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../header";


function AddProfessor() {
  let navigate = useNavigate();
  return (
    <div className={addprofessor.addprofessor}>
      <div className={addprofessor.container}>
        <div className={addprofessor.header}>
          <Header />
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
          <form action="#" id="professorSignup">
            {/* <!-- Course Name--> */}
            <div className={addprofessor.data}>
              <label for="name">First Name:</label>
              <input
                type="text"
                id="fname"
                name="firstName"
                placeholder="Enter professor first name"
                required
              />
              <label for="name">Last Name:</label>
              <input
                type="text"
                id="lname"
                name="lastName"
                placeholder="Enter professor last name"
                required
              />
              <label for="name">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter professor email"
                required
              />
            </div>
            <img alt="teacher" src="/images/teacherpic.jpg"></img>
            <button type="submit" id={addprofessor.submit} onClick={()=>{}}>
              Add Professor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddProfessor;






