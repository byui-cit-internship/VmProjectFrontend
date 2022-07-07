import Background from '../../background';
import Header from '../../header';
import professorList from './professorlist.module.css'
import { useNavigate } from 'react-router-dom';

export default function ProfessorList() {

    let navigate = useNavigate();

    return (
        <div className={professorList.professorList}>
            <div className={professorList.container}>
                <Header />
                <span onClick={() => {navigate("/student")}} id={professorList.backbtn}>&#8592; back</span>
                <h1 className={professorList.lets}>Let's create a VM</h1>

                <div className={professorList.table}>
                    <table>
                        <thead>
                        <tr>
                        <th>Name</th>
                        <th>Age</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Robert</td>
                            <td>23</td>
                        </tr>
                        <tr>
                            <td>Michal</td>
                            <td>24</td>
                        </tr>
                        <tr>
                            <td>Morgan</td>
                            <td>24</td>
                        </tr>
                        <tr>
                            <td>Tom</td>
                            <td>26</td>
                        </tr>
                        <tr>
                            <td>Steve</td>
                            <td>27</td>
                        </tr>
                        </tbody>
                    </table>
                    </div>
            </div>
            <Background />
        </div>
    )
}