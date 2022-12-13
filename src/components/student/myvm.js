import Background from "../../background";
import Header from "../../headerStudent";
import myVm from "./myvm.module.css";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState, useRef } from "react";
import { getApiRoot } from "../../utils/getApiRoot";

function MyVM() {
  useNavigate();
  const [vmList, setVmList] = useState([]);
  const [vmInstanceVcenterId, setVmInstanceVcenterId] = useState("");
  const [networkList, setNetworkList] = useState([]);
  useEffect(() => {
    //setNetworkList([])
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

//*********Get Vm Instance Netowkr Info**********/
useEffect(() => {
  const getVmNetwork = async (item) => {
    const listResponse = await fetch(getApiRoot() + `/api/deployvm/vm-network?vmInstanceVcenterId=${item}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    });
    if (listResponse.status >= 400) {
      setNetworkList(networkList => [...networkList, {id: item, address: null, status: "offline"}])
    } else {
      var networks = await listResponse.json();
      var ip = networks[0].ip.ip_addresses[0].ip_address
      setNetworkList(networkList => [...networkList, {id: item, address: ip, status: "online"}])
    }
  };

const mapVms = () => {
  vmList.map(vm => {getVmNetwork(vm.vmInstanceVcenterId)});
}
  if (vmList) {
    mapVms()
  }
}, [vmList]);

console.log(networkList);

  return (
    <div className={myVm.myVm}>
      <div className={myVm.container}>
        <Header userType="studentdashboard" />
        {/* <span onClick={() => {navigate("/student")}} id={myVm.backbtn}>&#8592; Back</span> */}
        <h1>My Vm's</h1>
        <div className={myVm.table}>
          <table>
            {vmList.map((vm) => (
            <thead>

              <tr>
                <th className={myVm.bodyHeader} colSpan='2'>{vm.vmInstanceVcenterName}</th>
              </tr>

              <tr>
                <th>Class</th>
                <td>{vm.courseCode}</td>
              </tr>

              <tr>
                <th>VM Template</th>
                <td>{vm.vmTemplateName}</td>
              </tr>

              <tr>
                <th>Expire Date</th>
                <td>{vm.vmInstanceExpireDate}</td>
              </tr>

            </thead>
            ))}

            <tbody>

              <tr>
                <th>Mac Address</th>
                <td>{}</td>
              </tr>

              <tr>
                <th>Ipv4 Address</th>
                <td>{}</td>
              </tr>

          </tbody>
          </table>
        </div>
        <Background />
      </div>
    </div>
  );
}

export default MyVM;
