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
      const listResponse = await fetch(getApiRoot() + "/api/vmtable/instances", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      console.log(listResponse);
      const vmList = await listResponse.json();
      console.log("vm's", vmList);
      setVmList(vmList);
    };
    getVmList();
  }, []);

  return (
    <div className={myVm.myVm}>
      <div className={myVm.container}>
        <Header userType="studentdashboard" />
        {/* <span onClick={() => {navigate("/student")}} id={myVm.backbtn}>&#8592; Back</span> */}
        <h1>My Vm's</h1>
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
              {vmList.map((vm) => (
                <tr>
                  <td>{vm.courseCode}</td>
                  <td>{vm.vmTemplateName}</td>
                  <td>{vm.vmInstanceExpire}</td>
                </tr>
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
