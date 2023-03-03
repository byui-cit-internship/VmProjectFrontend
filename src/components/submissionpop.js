import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApiRoot } from "../utils/getApiRoot";
import submissionPop from "./submissionpopup.module.css";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SubmissionPopup = (props) => {
  const [link, setLink] = useState("");

  const redirect = async () => {
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    };
    var response = await fetch(getApiRoot() + "/api/user/self", options);
    if (response.ok) {
      response = await response.json();
      sessionStorage.setItem("userInfo", JSON.stringify(response));
      const role = response.role;

      if (role === "professor") {
        return "/facultydashboard";
      } else {
        return "/studentdashboard";
      }
    }
  };

  useEffect(() => {
    const getRedirectLink = async () => {
      const route = await redirect();
      setLink(route);
    };
    getRedirectLink();
  }, []);

  return (
    <div className={submissionPop.modal}>
      <div className={submissionPop.modalBox}>
        <span className={submissionPop.closeicon} onClick={() => props.closeHandler(false)}>
          <CloseIcon />
        </span>
        <div className={submissionPop.message}>
          <div className={submissionPop}>
            {props.success ? (
              <CheckCircleIcon className={submissionPop.checkiconGreen} />
            ) : (
              <CancelIcon className={submissionPop.checkicon} />
            )}
          </div>
          <div className={submissionPop.message}>{props.message}</div>
          <div className={submissionPop.optionsContainer}>
            <Link to={link}>
              <button className={submissionPop.dashboardButton}>
                <div className={submissionPop.message}>Go to dashboard</div>
              </button>
            </Link>
            {props.againOptionMessage && (
              <a className={submissionPop.a} href="javascript:;">
                <button>
                  <div className={submissionPop.message} onClick={() => props.closeHandler(false)}>
                    {props.againOptionMessage}
                  </div>
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

SubmissionPopup.propTypes = {
  againOptionMessage: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
  closeHandler: PropTypes.func.isRequired
};

export default SubmissionPopup;
