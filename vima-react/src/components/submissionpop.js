import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import submissionpop from "./submissionpop.module.css";
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
    <div className={submissionpop.modal}>
      <div className={submissionpop.modalBox}>
        <div className={submissionpop.message}>
          <div className={submissionpop.iconPlaceholder}>
            <FaCheck className={submissionpop.checkicon} />
          </div>
          <div className={submissionpop.message}>{props.message}</div>
          <div className={submissionpop.optionsContainer}>
            <Link to={goBackRoute}>
              <div className={submissionpop.message}>Goo back to dashboard</div>
            </Link>
            <a href="javascript:;">
              <div
                className={submissionpop.message}
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
