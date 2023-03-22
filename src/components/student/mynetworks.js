import Background from "../../background";
import Header from "../../headerStudent";
import mynetworks from "./mynetworks.module.css";
import { useNavigate } from "react-router-dom";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import React from "react";

const MyNetworks = () => {
  const navigate = useNavigate();

  return (
    <div className={mynetworks.mynetworks}>
      <div className={mynetworks.container}>
        <Header userType="studentdashboard" />
        {/* <span onClick={() => {navigate("/student")}} id={mynetworks.backbtn}>&#8592; Back</span> */}
        <h1 className="mynetwork">My Network</h1>
        <div className={mynetworks.messageContainer}>
          <SettingsRoundedIcon className={mynetworks.iconStyle} />
          <p>This feature is currently under development</p>

          <button className={mynetworks.dashboardButton} onClick={()=> navigate("/studentdashboard")}>Go To Dashboard</button>
        </div>
      </div>
      <Background />
    </div>
  );
}

export default MyNetworks;
