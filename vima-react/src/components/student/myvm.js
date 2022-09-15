import Background from '../../background';
import Header from '../../header';
import myVm from "./myvm.module.css";
import { useNavigate } from 'react-router-dom';


//This page needs to get user data to populate the table with the individual students classes 

function MyVM() {

    let navigate = useNavigate();

    return (
        <div className={myVm.myVm}>
            <div className={myVm.container}>
                <Header />
                <span onClick={() => {navigate("/student")}} id={myVm.backbtn}>&#8592; back</span>
                
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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
            <Background />
        </div>
    </div>
    )
}

export default MyVM;