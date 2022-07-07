import Background from '../../background';
import Header from '../../header';
import myVm from "./myvm.module.css";
import { useNavigate } from 'react-router-dom';


function MyVM() {

    let navigate = useNavigate();

    return (
        <div className={myVm.myVm}>
            <div className={myVm.container}>
                <Header />
                <span onClick={() => {navigate("/student")}} id={myVm.backbtn}>&#8592; back</span>
                My VMs page
            </div>
            <Background />
        </div>
    )
}

export default MyVM;