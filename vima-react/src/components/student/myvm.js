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
                            <td>CIT 335</td>
                            <td>Linux</td>
                            <td>2/17/22</td>
                        </tr>
                        <tr>
                            <td>CIT 240</td>
                            <td>Android Pie</td>
                            <td>2/17/22</td>
                        </tr>
                        <tr>
                            <td>CIT 354</td>
                            <td>Android Pie</td>
                            <td>2/17/22</td>
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