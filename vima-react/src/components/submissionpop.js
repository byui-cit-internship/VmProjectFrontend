import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
//import addprofessor from "./faculty/addclass.module.css";

const SubmissionPopup = (props) => {

    const handleClosePopup = () => {
        props.closeHandler(false)
    }

    return (
        <div className={addprofessor.modal}>
            <div className={addprofessor.modalBox}>
                <button
                    className={addprofessor.closeBtn}
                    onClick={handleClosePopup}
                >
                    X
                </button>
                <div className={addprofessor.message}>
                    <div className={addprofessor.iconPlaceholder}>
                        <FaCheck className={addprofessor.checkicon} />
                    </div>
                    <div className={addprofessor.message}>
                        {props.message}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubmissionPopup