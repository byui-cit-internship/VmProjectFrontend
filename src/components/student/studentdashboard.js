import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Computer from "@mui/icons-material/Computer";
import CloudQueue from "@mui/icons-material/CloudQueue";
import { useNavigate } from "react-router-dom";
import Background from "../../background";
import studentdashboard from "./studentdashboard.module.css";
import Header from "../../header";
import React from "react";

const iconStyles = {
  color: "white",
  fontSize: "35px"
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
        <div className={studentdashboard.main}>
          <div className={studentdashboard.text}>
            <h1 id={studentdashboard.nameOfStudent}>
              Hello{" "}
              <span>
                {userFirst} {userLast}
              </span>
            </h1>
            <p id={studentdashboard.greeting}>How can we help you today?</p>
          </div>

          <div className={studentdashboard.buttons}>
            <div
              className={studentdashboard.createvm}
              id={studentdashboard.singleContainer}
              onClick={() => {
                navigate("/createvm");
              }}>
              <span className={studentdashboard.material}>
                <AddCircleOutlineIcon
                  studentdashboard={iconStyles}
                  className={studentdashboard.material}
                />
              </span>
              <button className={studentdashboard.button}>Create VM</button>
            </div>
            <div
              className={studentdashboard.vm_utilization}
              id={studentdashboard.singleContainer}
              onClick={() => {
                navigate("/myvm");
              }}>
              <span className={studentdashboard.material}>
                <Computer studentdashboard={iconStyles} className={studentdashboard.material} />
              </span>
              <button className={studentdashboard.button}>My VMS</button>
            </div>
            <div
              className={studentdashboard.mynetworks}
              id={studentdashboard.singleContainer}
              onClick={() => {
                navigate("/mynetworks");
              }}>
              <span className={studentdashboard.material}>
                <CloudQueue studentdashboard={iconStyles} className={studentdashboard.material} />
              </span>
              <button className={studentdashboard.button}>My Networks</button>
            </div>
          </div>
        </div>
      </div>
      <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
      <Background />
    </div>
  );
};
export default StudentDashboard;
