// import './facultydashboard.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DnsIcon from '@mui/icons-material/Dns';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
// import AddClass from './components/faculty/addclass';
import Background from './background';
import styles from './facultydashboard.module.css';

const iconStyles = {
    color: 'white', fontSize: '35px'
}

const FacultyDashboard = () => {

let navigate = useNavigate();

return(
    // window.location.href="VMfaculty_dashboard/facultyview.html";
<div>
    <div className={styles.container}>
        <img className={styles.logo} src="/images/LOGO-VIMA.png" alt="logo"/>
        <div className={styles.professorgrid}>
        <span className={styles.materialicons}>
            <PersonIcon sx={{fontSize: '2rem', paddingLeft: "10px"}} />
        </span>
        <p id={styles.welcome}>Welcome Professor |</p>

        <button className={styles.signOut}>Sign out</button>
    </div>
    <h1 id={styles.nameOfProfessor}>Hello <span>Professor</span></h1>
    <p id={styles.greeting}>How can we help you today?</p>
    {/* <div class="addgrid"> */}
      <div className={styles.add_class}>
        <span className={styles.materialicons}>
          <AddCircleOutlineIcon style={iconStyles}/>
        </span>
        <button onClick={() => {navigate("/addclass")}}  >Add Class</button>
    </div>
      <div className={styles.add_professor}>
        <span className={styles.materialicons}>
          <PersonAddIcon style={iconStyles}/>
        </span>
        <button onClick={() => {navigate("/addprofessor")}}>Add Professors</button>
      </div>
      <div className={styles.vm_utilization}>
        <span className={styles.materialicons}>
          <DnsIcon style={iconStyles}/>
        </span>
        <button onClick={() => {navigate("/utilization")}}>VM Utilization</button>
      </div>
    </div>
    <button onClick={() => {navigate("/addvm")}}>Add VM</button>

        {/* <!-- <a href="/fetch.html" class="submitBt btn-primary">Courses</a> --> */}

    {/* <!-- <div id="admin_portal"> --> */}
    {/* </div> */}


    <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>

  <Background/>
 
</div>
)
}

export default FacultyDashboard;
