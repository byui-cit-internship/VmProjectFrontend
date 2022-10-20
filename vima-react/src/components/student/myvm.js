import Background from "../../background";
import Header from "../../header";
import myVm from "./myvm.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getApiRoot } from "../../utils/getApiRoot";

function MyVM() {
  let navigate = useNavigate();
  const [vmList, setVmList] = useState([]);
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
      console.log("vm's", vmList);
      setVmList(VmList);
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
                <div value={item.vmName} className={myvm.tableheader}>
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
