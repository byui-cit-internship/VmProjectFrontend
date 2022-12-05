import React, { useState } from "react";
import header from "./header.module.css";
import { FaHamburger } from "react-icons/fa";
// import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

function Header(props) {
  const [showLinks, setShowLinks] = useState(false);
  let navigate = useNavigate();

  // userInfo gets user info from token then puts it in session storage to display the users first name
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  var userFirstName = "";
  if (userInfo == null) {
    userFirstName = "";
  } else {
    userFirstName = userInfo.firstName;
  }
  return (
    <div className={header.header}>
      <div className={header.leftSide}>
        <img
          className={header.logo}
          src="/images/LOGO-VIMA.png"
          alt="logo"
          onClick={() => {
            navigate("/" + props.userType);
          }}
        />
      </div>
      <div className={header.rightSide}>
        <div className={header.links} id={showLinks ? "hidden" : ""}>
          <div className={header.dropdown}>
            <button class={header.dropbtn}>
              Professors
              <i class="fa fa-caret-down"></i>
            </button>
            <div className={header.dropdown_content}>
              <a
                onClick={() => {
                  navigate("/addprofessor");
                }}>
                Add Professor
              </a>
              <a
                onClick={() => {
                  navigate("/professorlist");
                }}>
                View Professors
              </a>
            </div>
          </div>
          <div className={header.dropdown}>
            <button class={header.dropbtn}>
              Classes
              <i class="fa fa-caret-down"></i>
            </button>
            <div className={header.dropdown_content}>
              <a
                onClick={() => {
                  navigate("/addclass");
                }}>
                Add Class
              </a>
              <a
                onClick={() => {
                  navigate("/myclasses");
                }}>
                My Classes
              </a>
            </div>
          </div>
          <a id={header.dropdown}>Utilization</a>
          {/* <a id={header.welcome}>Welcome {userFirstName} |</a> */}
          <button
            className={header.signOut}
            onClick={() => {
              navigate("/");
            }}>
            Sign out
          </button>
        </div>

        <div className={header.hamWrapper}>
          {/* <button className={header.outHam} onClick={() => setShowLinks(!showLinks)}>
            <FaHamburger />
          </button> */}
          <Navbar />
        </div>
      </div>
    </div>
  );
}

export default Header;
