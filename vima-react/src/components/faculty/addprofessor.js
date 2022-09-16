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
        <button
          className={addprofessor.backbtn}
          onClick={() => {
            navigate("/faculty");
          }}
        >
          Back
        </button>

        <div>
          <h1>Add a Professor</h1>
          <form action="#" id="professorSignup">

            {/* <!-- Course Name--> */}
            <div className={addprofessor.main}>
              <div className={addprofessor.data}>

                <div className={addprofessor.inputbox}>
                  <label for="name">First Name:</label>
                  <input
                    type="text"
                    id="fname"
                    name="firstName"
                    placeholder="Enter professor first name"
                    required
                  />
                </div>

                <div className={addprofessor.inputbox}>
                  <label for="name">Last Name:</label>
                  <input
                    type="text"
                    id="fname"
                    name="firstName"
                    placeholder="Enter professor last name"
                    required
                  />
                </div>

                <div className={addprofessor.inputbox}>
                  <label for="name">Email:</label>
                  <input
                    type="text"
                    id="fname"
                    name="firstName"
                    placeholder="Enter professor email"
                    required
                  />
                </div>

              </div>
            

              <div className={addprofessor.imagecontainer}>
                <img alt="teacher" className={addprofessor.image} src="/images/teacherpic.jpg"></img>
              </div>
            </div>

            <div className={addprofessor.buttondiv}>
              <button type="submit" id={addprofessor.submit}>
                Add Professor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AddProfessor;
