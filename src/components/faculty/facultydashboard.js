import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DnsIcon from "@mui/icons-material/Dns";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";
import Background from "../../background";
import facultydashboard from "./facultydashboard.module.css";
import Header from "../../header";
import { React, useEffect, useState } from "react";
import { getApiRoot } from "../../utils/getApiRoot";

const iconStyles = {
  color: "white",
  fontSize: "35px"
};

const FacultyDashboard = () => {
  const [userInfo, setUserInfo] = useState("");
  const [userLast, setUserLast] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [userFirst, setUserFirst] = useState("");
  let navigate = useNavigate();

  const body = document.querySelector("body");
  const urlParams = window.location.href.split("/")[3];

  const getSessionStorageUserInfo = () => {
    //userInfo gets user info from token put in session storage to display the users first and last name
    const sessionStorageInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    setUserInfo(sessionStorageInfo);
    setUserFirst(sessionStorageInfo.firstName);
    setUserLast(sessionStorageInfo.lastName);
  };

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

  useEffect(() => {
    const getUserInfo = async () => {
      const options = {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      };
      const response = await fetch(getApiRoot() + "/api/user/self", options);
      if (response.ok) {
        sessionStorage.setItem("userInfo", JSON.stringify(await response.json()));
        getSessionStorageUserInfo();
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo.approveStatus == "pending") {
      setRequestMessage("Waiting for professor access request approval");
    } else if (userInfo.approveStatus == "approved" && userInfo.canvasToken) {
      setRequestMessage("Professor access approved");
    } else if (userInfo.approveStatus == "approved" && !userInfo.canvasToken) {
      setRequestMessage("Please enter your canvas token.");
    } else if (userInfo.approveStatus == "n/a") {
      setRequestMessage("Are you a professor?");
    }
  }, [userInfo]);

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
              <button
                className={facultydashboard.permissionsbutton}
                disabled={
                  userInfo.approveStatus == "pending" ||
                  (userInfo.approveStatus == "approved" && userInfo.canvasToken)
                }>
                {requestMessage}
              </button>
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
                <p>My Classes</p>
              </span>
            </div>
            <div
              className={facultydashboard.add_professor}
              id={facultydashboard.singleContainer}
              onClick={() => {
                navigate("/professorlist");
              }}>
              <span className={facultydashboard.material}>
                <PersonAddIcon style={iconStyles} />
                <p>View Professors</p>
              </span>
            </div>
            <div
              className={facultydashboard.vm_utilization}
              id={facultydashboard.singleContainer}
              onClick={() => {
                navigate("/utilization");
              }}>
              <span className={facultydashboard.material}>
                <DnsIcon style={iconStyles} />
                <p>VM Utilization</p>
              </span>
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
