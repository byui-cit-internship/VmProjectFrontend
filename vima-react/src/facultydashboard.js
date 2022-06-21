import './facultydashboard.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DnsIcon from '@mui/icons-material/Dns';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import AddClass from './components/faculty/AddClass';
import Background from './background';

const iconStyles = {
    color: 'white', fontSize: '35px'
}

const FacultyDashboard = ()=>{

let navigate = useNavigate();

return(
    // window.location.href="VMfaculty_dashboard/facultyview.html";
<div>
    <div className="container">
        <img className="logo" src="/images/LOGO-VIMA.png" alt="logo"/>
        <div className="professorgrid">
        <span className="material-icons">
            <PersonIcon sx={{fontSize: '2rem'}} />
        </span>
        <p id="welcome">Welcome Professor |</p>

        <button className="signOut">Sign out</button>
    </div>
    <h1 id="name0fProfessor">Hello <span>Professor</span></h1>
    <p id="greeting">How can we help you today?</p>
    {/* <div class="addgrid"> */}
      <div className="add_class">
        <span className="material-icons">
          <AddCircleOutlineIcon style={iconStyles}/>
        </span>
        <button onClick={() => {navigate("/addclass")}}  >Add Class</button>
    </div>
      <div onclick="location='/VMAdmin_dash/addprofessor.html'" className="add_professor">
        <span className="material-icons">
          <PersonAddIcon style={iconStyles}/>
        </span>
        <button>Add Professors</button>
      </div>
      <div onClick="location='/vmutilization/utilization.html'" className="vm_utilization">
        <span className="material-icons">
          <DnsIcon style={iconStyles}/>
        </span>
        <button>VM Utilization</button>
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

export default FacultyDashboard;
