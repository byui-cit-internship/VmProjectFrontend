import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  let navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar">
        <a href="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </a>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu "}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <a href="#" className="menu-bars">
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </a>
          </li>

          <li className="nav-text">
            <a
              onClick={() => {
                navigate("/addclass");
              }}>
              Add Class
            </a>
          </li>
          <li className="nav-text">
            <a
              onClick={() => {
                navigate("/addprofessor");
              }}>
              Add Professor
            </a>
          </li>
          <li className="nav-text">
            <a
              onClick={() => {
                navigate("/myclasses");
              }}>
              My Classes
            </a>
          </li>
          <li className="nav-text">
            <a
              onClick={() => {
                navigate("/utilization");
              }}>
              VM Utilization
            </a>
          </li>
          <li className="nav-text">
            <a
              onClick={() => {
                navigate("/professorlist");
              }}>
              View Professors
            </a>
          </li>
          <li className="nav-text">
            <a
              onClick={() => {
                navigate("/");
                window.sessionStorage.removeItem('userInfo')
              }}>
              Sign Out
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
