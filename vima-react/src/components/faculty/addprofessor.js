import React from "react";
// import background from './background.module.css';
import addprofessor from "./addprofessor.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../header";
import {useState} from "react";
import { FaCheck } from "react-icons/fa";


function AddProfessor() {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={addprofessor.addprofessor}>
      <div className={addprofessor.container}>
        <div className={addprofessor.header}>
          <Header />
        </div>
        <button
          className={addprofessor.backbtn}
          onClick={() => {
            navigate("/faculty");
          }}
        >
          Back
        </button>
        <h1>Add a Professor</h1>
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
          <button type="submit" className={addprofessor.primaryButton} onClick={()=> setIsOpen(true)}>
            Add Professor
          </button>
         {isOpen && <div className={addprofessor.modal}>
         <div className={addprofessor.modalBox}>

          <button className={addprofessor.closeBtn} onClick={()=> setIsOpen(false)}>X</button>
          <div className={addprofessor.message}>
          <div className={addprofessor.iconPlaceholder}>
            <FaCheck className={addprofessor.checkicon}/>
          </div>
          <div className={addprofessor.message}>Added Successfully!</div>
          </div>
         </div>
         </div>}
        </form>
      </div>
    </div>
  );
}
export default AddProfessor;






