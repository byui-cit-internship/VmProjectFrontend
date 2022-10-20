import Background from "../../background";
import Header from "../../header";
import myVm from "./myvm.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getApiRoot } from "../../utils/getApiRoot";

function MyVM() {
  const [vmList, setVmList] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    const getVmList = async () => {
      const listResponse = await fetch(
        getApiRoot() + "/api/vmtable/instances", 
        {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log(listResponse);
    const vmList = await listResponse.json();
    console.log("virtual machines; ", vmList);
    setVmList(vmList);
    };
    getVmList();
  }, []);

  return (
    <div className={myVm.myVm}>
      <div className={myVm.container}>
        <Header userType="student" />
        {/* <span onClick={() => {navigate("/student")}} id={myVm.backbtn}>&#8592; Back</span> */}

        <div className={myVm.table}>
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>VM</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
            {vmList.map((item) =>(
              <div value={item.vmName}>
                {item.vmName}
              </div>
            ))}
            </tbody>
          </table>
        </div>
        <Background />
      </div>
    </div>
  );
}

export default MyVM;
