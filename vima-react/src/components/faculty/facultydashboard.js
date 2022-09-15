// import './facultydashboard.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DnsIcon from '@mui/icons-material/Dns';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
// import AddClass from './components/faculty/addclass';
import Background from '../../background';
import facultydashboard from './facultydashboard.module.css';
import Header from '../../header';

const iconStyles = {
    color: 'white', fontSize: '35px'
}

const FacultyDashboard = () => {

let navigate = useNavigate();

//userInfo gets user info from token put in session storage to display the users first and last name
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
var userFirst = "";
var userLast = "";
if (userInfo == null) {
  userFirst = "Professor";
} else {
  userFirst = userInfo.firstName;
  userLast = userInfo.lastName;
};

return(
    // window.location.href="VMfaculty_dashboard/facultyview.html";
  <div className={facultydashboard.facultydashboard}>
    <div className={facultydashboard.container}>
    <div className={facultydashboard.header} >
      <Header />
    </div>
    <h1 id={facultydashboard.nameOfProfessor}>Hello <span>{userFirst} {userLast}</span></h1>
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