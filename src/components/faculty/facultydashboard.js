import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DnsIcon from "@mui/icons-material/Dns";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import Background from "../../background";
import facultydashboard from "./facultydashboard.module.css";
import Header from "../../header";
import { React, useEffect, useState } from "react";

const iconStyles = {
  color: "white",
  fontSize: "35px"
};

const FacultyDashboard = () => {
  const [requestMessage, setRequestMessage] = useState();

  const body = document.querySelector("body");
  const urlParams = window.location.href.split("/")[3];

  // Removes styles from the body tag
  // Apply this useEffect on any page you go from this page
  useEffect(() => {
    if (urlParams !== "addprofessor") {
      body.style.height = "unset";
      body.style.display = "unset";
      body.style.justifyContent = "unset";
      body.style.alignItems = "unset";
    }
  });

  let navigate = useNavigate();

  //userInfo gets user info from token put in session storage to display the users first and last name
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var userFirst = "";
  var userLast = "";
  if (userInfo == null) {
    userFirst = "Professor";
  } else {
    userFirst = userInfo.firstName;
    userLast = userInfo.lastName;
  }

  return (
    // window.location.href="VMfaculty_dashboard/facultyview.html";
    <div className={facultydashboard.facultydashboard}>
      <div className={facultydashboard.container}>
        <div className={facultydashboard.header}>
          <Header userType="facultydashboard" />
        </div>
        <div className={facultydashboard.main}>
          <div className={facultydashboard.left}>
            <div className={facultydashboard.text}>
              <h1 id={facultydashboard.nameOfProfessor}>
                Hello{" "}
                <span>
                  {userFirst} {userLast}
                </span>
              </h1>
              <p id={facultydashboard.greeting}>How can we help you today?</p>
            </div>
            <div
              className={facultydashboard.professorpermissions}
              onClick={() => {
                navigate("/appext");
              }}>
              <button className={facultydashboard.permissionsbutton}>Send your Canvas Token</button>
            </div>
          </div>
          <div className={facultydashboard.buttons}>
            <div
              className={facultydashboard.add_class}
              id={facultydashboard.singleContainer}
              onClick={() => {
                navigate("/myclasses");
              }}>
              <span className={facultydashboard.material}>
                <AddCircleOutlineIcon style={iconStyles} />
              </span>
              <button className={facultydashboard.button}>My Classes</button>
            </div>
            <div
              className={facultydashboard.add_professor}
              id={facultydashboard.singleContainer}
              onClick={() => {
                navigate("/professorlist");
              }}>
              <span className={facultydashboard.material}>
                <PersonAddIcon style={iconStyles} />
              </span>
              <button className={facultydashboard.button}>View Professors</button>
            </div>
            <div
              className={facultydashboard.vm_utilization}
              id={facultydashboard.singleContainer}
              onClick={() => {
                navigate("/utilization");
              }}>
              <span className={facultydashboard.material}>
                <DnsIcon style={iconStyles} />
              </span>
              <button className={facultydashboard.button}>VM Utilization</button>
            </div>
          </div>
        </div>
      </div>

      <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>

      <Background />
    </div>
  );
};

export default FacultyDashboard;
