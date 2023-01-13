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
        setNetworkList(networkList => [...networkList, {id: item, address: null, status: "offline"}])
      } else {
        var networks = await listResponse.json();
        var ip = networks[0].ip.ip_addresses[0].ip_address
        setNetworkList(networkList => [...networkList, {id: item, address: ip, status: "online"}])
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
      vmList = vmList.map(async vm => {
        try {const listResponse = await fetch(getApiRoot() + `/api/deployvm/vm-network?vmInstanceVcenterId=${vm.vmInstanceVcenterId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "content-type": "application/json"
          }
        });

        const networkList = await listResponse.json() 
        console.log(networkList)
        let ip = ""
        networkList.forEach(network => {
          console.log(network)
          console.log(network.ip.ip_addresses)
          if (network.ip != null && network.ip.ip_addresses.length > 0) {
            ip = ip + " " + network.ip.ip_addresses[0].ip_address
            console.log(ip)
          } 
          
        });
        vm.ip = ip}
        catch (error) {
          console.log(error)
        }
        return vm
      });
      vmList = await Promise.all(vmList)
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

              <tr>
                <th>Ipv4 Address</th>
                <td>{vm.ip}</td>
              </tr>
              

            </thead>
            ))}

          </table>
        </div>
        <Background />
      </div>
    </div>
  );
}

export default MyVM;
