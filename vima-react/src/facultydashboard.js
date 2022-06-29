// import './facultydashboard.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DnsIcon from '@mui/icons-material/Dns';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
// import AddClass from './components/faculty/addclass';
import Background from './background';
import facultydashboard from './facultydashboard.module.css';

const iconStyles = {
    color: 'white', fontSize: '35px'
}

const FacultyDashboard = () => {

let navigate = useNavigate();

return(
    // window.location.href="VMfaculty_dashboard/facultyview.html";
  <div className={facultydashboard.facultydashboard}>
    <div className={facultydashboard.container}>
        <img className={facultydashboard.logo} src="/images/LOGO-VIMA.png" alt="logo"/>
        <div className={facultydashboard.professorgrid}>
        <span className={facultydashboard.materialicons}>
            <PersonIcon sx={{fontSize: '50px', paddingLeft: "10px"}} />
        </span>
        <p id={facultydashboard.welcome}>Welcome Professor |</p>

        <button className={facultydashboard.signOut}>Sign out</button>
    </div>
    <h1 id={facultydashboard.nameOfProfessor}>Hello <span>Professor</span></h1>
    <p id={facultydashboard.greeting}>How can we help you today?</p>
    {/* <div class="addgrid"> */}
      <div className={facultydashboard.add_class}>
        <span className={facultydashboard.materialicons}>
          <AddCircleOutlineIcon style={iconStyles}/>
        </span>
        <button onClick={() => {navigate("/addclass")}}  >Add Class</button>
    </div>
      <div className={facultydashboard.add_professor}>
        <span className={facultydashboard.materialicons}>
          <PersonAddIcon style={iconStyles}/>
        </span>
        <button onClick={() => {navigate("/addprofessor")}}>Add Professors</button>
      </div>
      <div className={facultydashboard.vm_utilization}>
        <span className={facultydashboard.materialicons}>
          <DnsIcon style={iconStyles}/>
        </span>
        <button onClick={() => {navigate("/utilization")}}>VM Utilization</button>
      </div>
    </div>
    {/* <button onClick={() => {navigate("/addvm")}}>Add VM</button> */}

        {/* <!-- <a href="/fetch.html" class="submitBt btn-primary">Courses</a> --> */}

    {/* <!-- <div id="admin_portal"> --> */}
    {/* </div> */}


    <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>

  <Background/>
 
</div>
)
}

export default FacultyDashboard;
