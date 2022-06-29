// import react from "react";
// import Background from "../../background";
// import studentDashboard from "./studentdashboard.module.css";

// import './facultydashboard.css';




import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Computer from '@mui/icons-material/Computer';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
// import AddClass from './components/faculty/addclass';
import Background from '../../background';
import studentDashboard from "./studentdashboard.module.css";



const iconStyles = {
    color: 'white', fontSize: '35px'
}

const StudentDashboard = () => {

let navigate = useNavigate();

return(
    // window.location.href="VMfaculty_dashboard/facultyview.html";
<div>
    <div className={studentDashboard.container}>
        <img className={studentDashboard.logo} src="/images/LOGO-VIMA.png" alt="logo" />
        <div className={studentDashboard.professorgrid}>
        <span className={studentDashboard.materialicons}>
            <PersonIcon sx={{fontSize: '2.5rem', paddingLeft: "10px"}} className={ studentDashboard.material } />
        </span>
        <p id={studentDashboard.welcome}>Welcome Student |</p>

        <button onClick className={studentDashboard.signOut}>Sign out</button>
    </div>
    <h1 id={studentDashboard.nameOfStudent}>Hello <span>Student</span></h1>
    <p id={studentDashboard.greeting}>How can we help you today?</p>
    {/* <div class="addgrid"> */}
      {/* <div className={studentDashboard.add_class}>
        <span className={studentDashboard.materialicons}>
          <AddCircleOutlineIcon style={iconStyles}/>
        </span>
        <button onClick={() => {navigate("/addclass")}}  >Add Class</button>
    </div> */}
      <div className={studentDashboard.add_professor}>
        <span className={studentDashboard.material}>
          <AddCircleOutlineIcon studentDashboard={iconStyles} className={ studentDashboard.material }/>
        </span>
        <button onClick={() => {navigate("./createvm")}}>Create VM</button>
      </div>
      <div className={studentDashboard.vm_utilization}>
        <span className={studentDashboard.material}>
          <Computer studentDashboard={iconStyles} className={ studentDashboard.material }/>
        </span>
        <button onClick={() => {navigate("/vmhistory")}}>My VMS</button>
      </div>
    </div>
        {/* <!-- <a href="/fetch.html" class="submitBt btn-primary">Courses</a> --> */}

    {/* <!-- <div id="admin_portal"> --> */}
    {/* </div> */}


    <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>

  <Background/>
 
</div>
)
}

export default StudentDashboard;







// class StudentDashboard extends react.Component{
//     render() {
//         return (
            
          

// <body>

//   {/* <!-- <a href="#" onclick="signOut();">Sign out</a> --> */}
//   <div className={studentDashboard.container}>
//     <img className="logo" src="/images/LOGO-VIMA.png"/>
//     <div className="professorgrid">
//     <span className="material-icons">
//       person
//       </span>
//       <p id="welcome">Welcome Student |</p>

//       <button className="signOut">Sign out</button>
//     </div>
//     <h1 id="name0fStudent">Hello <span>Student</span></h1>
//     <p id="greeting">How can we help you today?</p>
//     <div className="addgrid">
//       <div onclick="location='/VMstudent_dashboard/studentview.html'" class="add_class">
//         <span className="material-icons">
//           add_circle_outline
//           </span>
//         <a className="submitBt">Create VM</a>
//       </div>
//       <div onclick="location='/VMstudent_dashboard/studentview.html'" class="add_professor">
//         <span className="material-icons">
//           computer
//           </span>
//         <a  className="submit_professor">My VMs</a>
//       </div>
     
//     </div>
//         {/* <!-- <a href="/fetch.html" class="submitBt btn-primary">Courses</a> --> */}

//     {/* <!-- <div id="admin_portal"> -->
//     </div> */}


//     <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
//   </div>

//  <Background />

// </body>
          
//         );
//     }
// }

// export default StudentDashboard; 