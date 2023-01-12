import React, { useState } from "react";
import header from "./header.module.css";
import { FaHamburger } from "react-icons/fa";
// import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
// import Navbar from "./navbarStudentD";
import Navbar from "./navbar";
import PropTypes from "prop-types";

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
          {/* <a id={header.welcome}>Welcome {userFirstName} |</a> */}
          <div className={header.dropdown}>
            <button className={header.dropbtn}>Classes</button>
            <div className={header.dropdown_content}>
              <a
                onClick={() => {
                  navigate("/myclasses");
                }}>
                My Classes
              </a>
              <a
                onClick={() => {
                  navigate("/addclass");
                }}>
                Add Class
              </a>
            </div>
          </div>
          <div className={header.dropdown}>
            <button className={header.dropbtn}>Professors</button>
            <div className={header.dropdown_content}>
              <a
                onClick={() => {
                  navigate("/professorlist");
                }}>
                Professor List
              </a>
              <a
                onClick={() => {
                  navigate("/addprofessor");
                }}>
                Add Professor
              </a>
            </div>
          </div>
          <div className={header.dropdown}>
            <button
              className={header.dropbtn}
              onClick={() => {
                navigate("/utilization");
              }}>
              Utilization
            </button>
            <div className={header.dropdown_content}></div>
          </div>
          <div className={header.dropdown}>
            <button
              className={header.signOut}
              id={header.dropbtn}
              onClick={() => {
                navigate("/");
                window.sessionStorage.removeItem('userInfo')
              }}>
              Sign out
            </button>
            <div className={header.dropdown_content}></div>
          </div>
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

Header.propTypes = {
  userType: PropTypes.string.isRequired
};

export default Header;
