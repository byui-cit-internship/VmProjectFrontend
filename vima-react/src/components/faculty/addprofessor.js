import React from "react";
import '../../background.css';
import "./addprofessor.css";
// import Header from "../../pages/header";

function AddProfessor() {
    return (
        <div>        
            <div class="container">
                {/* <Header /> */}
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

                        <button type="submit"  id="submit" class="save submitBt btn-primary">Save</button>
                        <a href="/VMfaculty_dashboard/facultyview.html" class="submitBt btn-primary">Back</a>
                    </form>
                </div>
        </div>
    )
}
export default AddProfessor;