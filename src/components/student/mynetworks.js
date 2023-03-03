import Background from "../../background";
import Header from "../../headerStudent";
import mynetworks from "./mynetworks.module.css";
import { useNavigate } from "react-router-dom";
import React from "react";

function MyNetworks() {
  useNavigate();

  return (
    <div className={mynetworks.mynetworks}>
      <div className={mynetworks.container}>
        <Header userType="studentdashboard" />
        {/* <span onClick={() => {navigate("/student")}} id={mynetworks.backbtn}>&#8592; Back</span> */}
        <h1 className="mynetwork">My Network</h1>
        
      </div>
      <Background />
    </div>
  );
}

export default MyNetworks;
