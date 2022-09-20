import Background from '../../background';
import Header from '../../header';
import professorList from './professorlist.module.css';
import { useNavigate } from 'react-router-dom';


// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// const element = <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />





export default function ProfessorList() {

    let navigate = useNavigate();

    return (
        <div className={professorList.professorList}>
            <div className={professorList.container}>
                <Header />
                <span onClick={() => {navigate("/student")}} id={professorList.backbtn}>&#8592; back</span>
                <span id={professorList.title}> Professor List</span>
                <div id={professorList.professorsAndSearch}>
                    <h1 className={professorList.lets}>Professors</h1>
                    <div class={professorList.searchbar}>
                        {/* <FontAwesomeIcon id={professorList.MGlass} icon={faMagnifyingGlass} /> */}
                        <input id={professorList.search} type="text" placeholder="Search.."/>
                    </div>
                </div>

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

                <button className={professorList.backbtn} onClick={() => {navigate("#");}}>Add New Professor</button>
            </div>

            <Background />
        </div>
    )
}