import React from "react";
// import background from './background.module.css';
import addprofessor from './addprofessor.module.css';
import { useNavigate } from 'react-router-dom';
import Header from "../../header";

function AddProfessor() {
    let navigate = useNavigate();

    return (
        <div className={addprofessor.addprofessor}>        
            <div className= {addprofessor.container}>
                {/* <Header /> */}
                <div className={addprofessor.header}>
                    <Header />
                </div>
                <h1>Add a Professor</h1>
                    <form action="#" id="professorSignup">
                        {/* <!-- Course Name--> */}
                        <div class="data">
                            <label for="name">First Name:</label>
                            <input type="text" id="fname" name="firstName" placeholder="Enter template name" required />
                            <label for="name">Last Name:</label>
                            <input type="text" id="lname" name="lastName" placeholder="Enter template name" required />
                            <label for="name">Email:</label>
                            <input type="text" id="email" name="email" placeholder="Enter template name" required />
                        </div>

                        <button type="submit"  id="submit">Save</button>
                        <button onClick={() => {navigate('/faculty')}}>Back</button>
                    </form>
                </div>
        </div>
    )
}
export default AddProfessor;