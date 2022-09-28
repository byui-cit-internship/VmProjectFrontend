import React from "react";
// import background from './background.module.css';
import addprofessor from "./addprofessor.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../header";
import {useState} from "react";
import { FaCheck } from "react-icons/fa";
import { getApiRoot } from '../../utils/getApiRoot'
import Image from '../../addprofessor.png'


function AddProfessor() {
  const validateForm = async ()=> {

    let allFieldsValid = true;
    if (firstName.length === 0 || lastName.length === 0 || email.length === 0){
      allFieldsValid = false;
    }
    if (allFieldsValid){
      try{
      const response = await fetch(
        getApiRoot() + '/api/user/admin/createuser', {
          method: 'POST',
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email
          }),
          credentials:'include',
          headers:{
            'content-type':'application/json'
          }
        }
      )
      const responseStatus = await response.status;
      console.log(JSON.stringify(responseStatus));
      console.log("Professor Added");
      if (responseStatus === 200) {
        setIsOpen(true);
        //This makes the modal window popup
      }
      else {
        console.log("Error", responseStatus);
      }
    } catch(error){
      console.log("Error calling fetch to create professor", error)
    }
  }
};

  let navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");


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
            <form action="#" className={addprofessor.professorSignup}>
              {/* <!-- Course Name--> */}
              <div className={addprofessor.data}>
                <label htmlFor="name">First Name:</label>
                <input
                  type="text"
                  id="fname"
                  name="firstName"
                  placeholder="Enter professor first name"
                  required
                  value= {firstName}
                  onChange={(event)=>setFirstName(event.target.value)}
                />
                <label htmlFor="name">Last Name:</label>
                <input
                  type="text"
                  id="lname"
                  name="lastName"
                  placeholder="Enter professor last name"
                  required
                  value = {lastName}
                  onChange={(event)=>setLastName(event.target.value)}
                />
                <label htmlFor="name">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter professor email"
                  required
                  value = {email}
                  onChange={(event)=>setEmail(event.target.value)}
                />
              </div>
              <img alt="teacher" src={Image}/>
              <button type="submit" className={addprofessor.primaryButton} onClick={async ()=> { await validateForm()}}>
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






