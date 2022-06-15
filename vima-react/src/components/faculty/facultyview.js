import React from "react";
import Squares from "../../pages/squares";


function FacultyView() {
    return (
        <div>
            <div class="container">
                <img class="logo" src="/images/LOGO-VIMA.png" alt="" />
                <div class="professorgrid">
                <span class="material-icons">
                person
                </span>
                <p id="welcome">Welcome Professor |</p>

                <button class="signOut">Sign out</button>
            </div>
            <h1 id="name0fProfessor">Hello <span>Professor</span></h1>
            <p id="greeting">How can we help you today?</p>
        <div class="addgrid">
            <div onclick="location='/VMregistration_course_form/addclass.html'" class="add_class">
                <span class="material-icons">
                add_circle_outline
                </span>
                <a class="submitBt">Add Class</a>
            </div>
        <div onclick="location='/VMAdmin_dash/addprofessor.html'" class="add_professor">
                <span class="material-icons">
                person_add_alt_1
                </span>
                <a  class="submit_professor">Add Professors</a>
        </div>
        <div onclick="location='/vmutilization/utilization.html'" class="vm_utilization">
            <span class="material-icons">
            dns
            </span>
            <a class="vm_utilization_text">VM Utilization</a>
      </div>
    </div>
        {/* <!-- <a href="/fetch.html" class="submitBt btn-primary">Courses</a> -->

    <!-- <div id="admin_portal"> --> */}
    </div>


    <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>

       <Squares />
  </div>
    
    );
}
export default FacultyView;