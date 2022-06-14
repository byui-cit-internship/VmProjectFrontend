const FacultyDashboard = ()=>{
return(
    // window.location.href="VMfaculty_dashboard/facultyview.html";
<div>
    <div class="container">
        <img class="logo" src="/images/LOGO-VIMA.png" alt="logo"/>
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
      {/* <div onclick="location='/VMregistration_course_form/addclass.html'" class="add_class"> */}
        <span class="material-icons">
          add_circle_outline
          </span>
        <button class="submitBt">Add Class</button>
    </div>
      <div onclick="location='/VMAdmin_dash/addprofessor.html'" class="add_professor">
        <span class="material-icons">
          person_add_alt_1
        </span>
        <button class="submit_professor">Add Professors</button>
      </div>
      <div onclick="location='/vmutilization/utilization.html'" class="vm_utilization">
        <span class="material-icons">
          dns
        </span>
        <button class="vm_utilization_text">VM Utilization</button>
      </div>
    </div>
        {/* <!-- <a href="/fetch.html" class="submitBt btn-primary">Courses</a> --> */}

    {/* <!-- <div id="admin_portal"> --> */}
    {/* </div> */}


    <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>


  <div class="area" >
    <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
    </ul>
</div>
</div>
)
}

export default FacultyDashboard;