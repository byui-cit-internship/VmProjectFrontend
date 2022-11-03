import Background from "../../background";
import Header from "../../header";
import mynetworks from "./mynetworks.module.css";
import { useNavigate } from "react-router-dom";

function MyNetworks() {
  let navigate = useNavigate();

  return (
    <div className={mynetworks.mynetworks}>
      <div className={mynetworks.container}>
        <Header userType="studentdashboard" />
        {/* <span onClick={() => {navigate("/student")}} id={mynetworks.backbtn}>&#8592; Back</span> */}
        Network page
      </div>
      <Background />
    </div>
  );
}

export default MyNetworks;
