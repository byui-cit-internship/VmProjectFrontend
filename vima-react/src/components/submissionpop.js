import React from "react";
import { FaSadTear, FaCheck } from "react-icons/fa";
import submissionPop from "./submissionpop.module.css";
import { Link } from "react-router-dom";

const SubmissionPopup = (props) => {
    let userInfo = sessionStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const isAdmin = userInfo.isAdmin;

    let goBackRoute;
    if (isAdmin) {
        goBackRoute = "/faculty";
    } else {
        goBackRoute = "/student";
    }

    return (
        <div className={submissionPop.modal}>
            <div className={submissionPop.modalBox}>
                <div className={submissionPop.message}>
                    <div className={submissionPop.iconPlaceholder}>
                        {props.success ? <FaCheck className={submissionPop.checkicon} /> : <FaSadTear className={submissionPop.checkicon} />}
                    </div>
                    <div className={submissionPop.message}>{props.message}</div>
                    <div className={submissionPop.optionsContainer}>
                        <Link to={goBackRoute}>
                            <div className={submissionPop.message}>Go back to dashboard</div>
                        </Link>
                        <a href="javascript:;">
                            <div
                                className={submissionPop.message}
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
