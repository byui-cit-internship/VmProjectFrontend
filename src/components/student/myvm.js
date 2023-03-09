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
    const getVmNetwork = async (item) => {
      if (listResponse.status >= 400) {
        setNetworkList((networkList) => [
          ...networkList,
          { id: item, address: null, status: "offline" }
        ]);
      } else {
        var networks = await listResponse.json();
        var ip = networks[0].ip.ip_addresses[0].ip_address;
        setNetworkList((networkList) => [
          ...networkList,
          { id: item, address: ip, status: "online" }
        ]);
      }
    };

    const getVmList = async () => {
      const listResponse = await fetch(getApiRoot() + "/api/vmtable/instances", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      console.log(listResponse);
      let vmList = await listResponse.json();
      vmList = vmList.map(async (vm) => {
        try {
          const listResponse = await fetch(
            getApiRoot() + `/api/deployvm/vm-network?vmInstanceVcenterId=${vm.vmInstanceVcenterId}`,
            {
              method: "GET",
              credentials: "include",
              headers: {
                "content-type": "application/json"
              }
            }
          );

          const networkList = await listResponse.json();
          console.log(networkList);
          let ip = "";
          networkList.forEach((network) => {
            console.log(network);
            console.log(network.ip.ip_addresses);
            if (network.ip != null && network.ip.ip_addresses.length > 0) {
              ip = ip + " " + network.ip.ip_addresses[0].ip_address;
              console.log(ip);
            }
          });
          vm.ip = ip;
        } catch (error) {
          console.log(error);
        }
        return vm;
      });
      vmList = await Promise.all(vmList);
      console.log("vm's", vmList);
      setVmList(vmList);
    };
    getVmList();
  }, []);

  //*********Get Vm Instance Netowkr Info**********/

  console.log(networkList);

  return (
    <div className={myVm.myVm}>
      <div className={myVm.container}>
        <Header userType="studentdashboard" />
        {/* <span onClick={() => {navigate("/student")}} id={myVm.backbtn}>&#8592; Back</span> */}
        <h1>My Vm's</h1>
        <div className={myVm.table}>
          <div className={myVm.individualBox}>
            {vmList.map((vm) => (
              <div className={myVm.eachBox}>
                <div className={myVm.VMname}>
                  <div className={myVm.bodyHeader} colSpan="2">
                    {vm.vmInstanceVcenterName}
                  </div>
                </div>

                <div className={`${myVm.details} ${myVm.oddNum}`}>
                  <p className={myVm.boldedPara}>Class:</p>
                  <p className={myVm.infoReceived}>{vm.courseCode}</p>
                </div>

                <div className={myVm.details}>
                  <p className={myVm.boldedPara}>VM Template:</p>
                  <p className={myVm.infoReceived}>{vm.vmTemplateName}</p>
                </div>

                <div className={`${myVm.details} ${myVm.oddNum}`}>
                  <p className={myVm.boldedPara}>Expire Date:</p>
                  <p className={myVm.infoReceived}>{vm.vmInstanceExpireDate}</p>
                </div>

                <div className={myVm.details}>
                  <p className={myVm.boldedPara}>Ipv4 Address:</p>
                  <p className={myVm.infoReceived}>{vm.ip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Background />
      </div>
    </div>
  );
}

export default MyVM;
