import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import addprofessor from "./submissionPop.module.css";
import { Link } from "react-router-dom";

const SubmissionPopup = (props) => {
  let userInfo = sessionStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  const isAdmin = userInfo.isAdmin;

  let goBackRoute;
  if (isAdmin) {
    console.log(isAdmin);
    goBackRoute = "/faculty";
  } else {
    goBackRoute = "/student";
  }

  return (
    <div className={addprofessor.modal}>
      <div className={addprofessor.modalBox}>
        <div className={addprofessor.message}>
          <div className={addprofessor.iconPlaceholder}>
            <FaCheck className={addprofessor.checkicon} />
          </div>
          <div className={addprofessor.message}>{props.message}</div>
          <div className={addprofessor.optionsContainer}>
            <Link to={goBackRoute}>
              <div className={addprofessor.message}>Go back to dashboard</div>
            </Link>
            <a href="javascript:;">
              <div
                className={addprofessor.message}
                onClick={() => props.closeHandler(false)}
              >
                {props.againOptionMessage}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPopup;
