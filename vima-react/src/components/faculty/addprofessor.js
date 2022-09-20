import React from "react";
// import background from './background.module.css';
import addprofessor from "./addprofessor.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../header";


function AddProfessor() {
  let navigate = useNavigate();









  const addProfessor = async ()=>{
    return (
          console.log('THE BUTTON WORKED')
    );
  };
// const addProfessor = async ()=>{
//   const addProfessorResponse = await fetch(
//     getApiRoot() + "/api/user/admin/createuser", {
//     method:'POST',
//     credentials:'include',
//     withCredentials:true,
//     body: JSON.stringify({
//     --  "canvas_token": canvasToken,
//     --  "canvas_course_id": canvasCourseId
//     }
//     ),

//     headers:{
//       'content-type':'application/json'
//     }
//   }
// );

//  const addProfessorValidationObject = await addProfessorResponse.json();
//  if (addProfessorResponse.status!=200){
//   alert("Add Professor Validation failed with the error: "+JSON.stringify(addProfessorValidationObject.errors))
//  }
//  else{
//   console.log('Professor validation worked')
//  }
// }







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
          <button type="submit" id={addprofessor.submit} onClick={addProfessor}>
            Add Professor
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddProfessor;






