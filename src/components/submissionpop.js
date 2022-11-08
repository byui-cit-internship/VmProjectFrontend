// import React from "react";
import React, { useState, useEffect, useRef } from "react";
import { FaSadTear, FaCheck } from "react-icons/fa";
import submissionPop from "./submissionpopup.module.css";

import { Link } from "react-router-dom";

const SubmissionPopup = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState();
  let userInfo = sessionStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  const isAdmin = userInfo.isAdmin;

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    console.log("click count");
  };

  let goBackRoute;
  if (isAdmin) {
    goBackRoute = "/facultydashboard";
  } else {
    goBackRoute = "/studentdashboard";
  }

  //let closeThePopup = "../appext";
  // if (isAdmin) {
  //   goBackRoute = "/facultydashboard";
  // } else {
  //   goBackRoute = "/studentdashboard";
  // }

  return (
    <div className={submissionPop.modal}>
      <div className={submissionPop.modalBox}>
        <span className={submissionPop.closeicon} onClick={(e) => props.closeHandler(false)}>
          x
        </span>
        <div className={submissionPop.message}>
          <div className={submissionPop.iconPlaceholder}>
            {props.success ? (
              <FaCheck className={submissionPop.checkicon} />
            ) : (
              <FaSadTear className={submissionPop.checkicon} />
            )}
          </div>
          <div className={submissionPop.message}>{props.message}</div>
          <div className={submissionPop.optionsContainer}>
            <Link to={goBackRoute}>
              <div className={submissionPop.message}>Go back to dashboard</div>
            </Link>
            <a className={submissionPop.a} href="javascript:;">
              <div className={submissionPop.message} onClick={() => props.closeHandler(false)}>
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
