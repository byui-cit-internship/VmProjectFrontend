import React from "react";
import Popup from "./Popup.js";

{isOpen && (
    <Popup
      content={
        <>
          <div className={utilization.popupbox}>
            <div className={utilization.box}>
              <span className={utilization.closeicon} onClick={togglePopup}>
                x
              </span>
              <img
                className={utilization.logo}
                src="../../images/LOGO-VIMA.png"
                alt="logo"
              />
              <h3>ALL THE STUDENT INFORMATION</h3>
            </div>
          </div>
        </>
      }
    />
  );
}
