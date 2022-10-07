import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Computer from "@mui/icons-material/Computer";
import CloudQueue from "@mui/icons-material/CloudQueue";
import { useNavigate } from "react-router-dom";
import Background from "../../background";
import studentdashboard from "./studentdashboard.module.css";
import Header from "../../header";

const iconStyles = {
  color: "white",
  fontSize: "35px",
};

const StudentDashboard = () => {
  let navigate = useNavigate();

  //userInfo gets user info from token put in session storage to display the users first and last name
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var userFirst = "";
  var userLast = "";
  if (userInfo == null) {
    userFirst = "Student";
  } else {
    userFirst = userInfo.firstName;
    userLast = userInfo.lastName;
  }

  return (
    <div className={studentdashboard.studentdashboard}>
      <div className={studentdashboard.container}>
        <div className={studentdashboard.header}>
          <Header userType="student" />
        </div>
        <h1 id={studentdashboard.nameOfStudent}>
          Hello{" "}
          <span>
            {userFirst} {userLast}
          </span>
        </h1>
        <p id={studentdashboard.greeting}>How can we help you today?</p>
        <div
          className={studentdashboard.createvm}
          onClick={() => {
            navigate("/createvm");
          }}
        >
          <span className={studentdashboard.material}>
            <AddCircleOutlineIcon
              studentdashboard={iconStyles}
              className={studentdashboard.material}
            />
          </span>
          <button>Create VM</button>
        </div>
        <div
          className={studentdashboard.vm_utilization}
          onClick={() => {
            navigate("/myvm");
          }}
        >
          <span className={studentdashboard.material}>
            <Computer
              studentdashboard={iconStyles}
              className={studentdashboard.material}
            />
          </span>
          <button>My VMS</button>
        </div>
        <div
          className={studentdashboard.mynetworks}
          onClick={() => {
            navigate("/mynetworks");
          }}
        >
          <span className={studentdashboard.material}>
            <CloudQueue
              studentdashboard={iconStyles}
              className={studentdashboard.material}
            />
          </span>
          <button>My Networks</button>
        </div>
      </div>
      <script
        src="https://apis.google.com/js/platform.js?onload=onLoad"
        async
        defer
      ></script>
      <Background />
    </div>
  );
};
export default StudentDashboard;
