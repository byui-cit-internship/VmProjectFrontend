import React from "react";
import { FaSadTear, FaCheck } from "react-icons/fa";
import approveprofessorpop from "./approveprofessorpop.module.css";

import { Link } from "react-router-dom";

const ApproveProfessorPopup = (props) => {
  let userInfo = sessionStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  const isAdmin = userInfo.isAdmin;

  let goBackRoute;
  if (isAdmin) {
    goBackRoute = "/facultydashboard";
  } else {
    goBackRoute = "/studentdashboard";
  }

  return (
    <div className={approveprofessorpop.modal}>
      <div className={approveprofessorpop.modalBox}>
        <div className={approveprofessorpop.message}>
          <div className={approveprofessorpop.iconPlaceholder}>
            {props.success ? (
              <FaCheck className={approveprofessorpop.checkicon} />
            ) : (
              <FaSadTear className={approveprofessorpop.checkicon} />
            )}
          </div>
          <div className={approveprofessorpop.message}>{props.message}</div>
          <div className={approveprofessorpop.optionsContainer}>
            <Link to={goBackRoute}>
              <div className={approveprofessorpop.message}>Go back to dashboard</div>
            </Link>
            <a href="javascript:;">
              <div className={approveprofessorpop.message} onClick={() => props.closeHandler(false)}>
                {props.againOptionMessage}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveProfessorPopup;