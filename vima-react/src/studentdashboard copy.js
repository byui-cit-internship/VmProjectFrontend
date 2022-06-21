import react from "react";
import "../App.css";
import Background from "../../background";
import style from "./studentdashboard.module.css";

class StudentDashboard extends react.Component{
    render() {
        return (
            
          

<body>

  {/* <!-- <a href="#" onclick="signOut();">Sign out</a> --> */}
  <div class={style.container}>
    <img class="logo" src="/images/LOGO-VIMA.png"/>
    <div class="professorgrid">
    <span class="material-icons">
      person
      </span>
      <p id="welcome">Welcome Student |</p>

      <button class="signOut">Sign out</button>
    </div>
    <h1 id="name0fProfessor">Hello <span>Student</span></h1>
    <p id="greeting">How can we help you today?</p>
    <div class="addgrid">
      <div onclick="location='/VMstudent_dashboard/studentview.html'" class="add_class">
        <span class="material-icons">
          add_circle_outline
          </span>
        <a class="submitBt">Create VM</a>
      </div>
      <div onclick="location='/VMstudent_dashboard/studentview.html'" class="add_professor">
        <span class="material-icons">
          computer
          </span>
        <a  class="submit_professor">My VMs</a>
      </div>
     
    </div>
        {/* <!-- <a href="/fetch.html" class="submitBt btn-primary">Courses</a> --> */}

    {/* <!-- <div id="admin_portal"> -->
    </div> */}


    <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
  </div>

 <Background />

</body>
          
        );
    }
}

export default StudentDashboard; 