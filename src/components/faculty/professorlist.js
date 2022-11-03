import Background from "../../background";
import Header from "../../header";
import professorList from "./professorlist.module.css";
import { useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import { useEffect, useState } from "react";

// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// const element = <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />

function ProfessorList() {
  const body = document.querySelector("body");
  const urlParams = window.location.href.split("/")[3];

  //*****************************************************************/
  //All useStates and variable for this page
  //******************************************************************/
  let navigate = useNavigate();
  const [professorsList, setProfessorList] = useState([]);
  const [inputText, setInputText] = useState("");

  // Removes styles from the body tag
  // Apply this useEffect on any page you go from this page
  useEffect(() => {
    if (urlParams !== "addprofessor") {
      body.style.height = "unset";
      body.style.display = "unset";
      body.style.justifyContent = "unset";
      body.style.alignItems = "unset";
    }
  });

  //*****************************************************************/
  //Gets all professors and professor user information
  //******************************************************************/
  console.log(JSON.stringify(professorList));
  useEffect(() => {
    const getProfessorInfo = async () => {
      const listResponse = await fetch(getApiRoot() + "/api/user/professors", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      console.log("listResponse; ", listResponse);

      const profList = await listResponse.json();
      console.log("classes; ", profList);
      setProfessorList(profList);
    };
    getProfessorInfo();
  }, []);


  //*****************************************************************/
  //Filtering Professor list when input is given in the search bar
  //******************************************************************/
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = professorsList.filter((i) => {
          
      if (inputText === "") {
      for(var key in i){
        console.log(`${key}: ${i[key]}`);
        if(i[key.toString()] === true){
            i.isVerified = "BALH";
          } //else {
            //i.isVerified = "NO";
          //}
        }
        return i;
      }
      else {
       const fullName =  (i.firstName + ' ' + i.lastName)
        return fullName.toLowerCase().includes(inputText);
      }
  });

  //****************************/
  //Returns all JSX
  //****************************/
  return (
    <div className={professorList.professorList}>
      <div className={professorList.container}>
        <Header userType="faculty" />
        {/* <span onClick={() => {navigate("/student")}} id={professorList.backbtn}>&#8592; back</span> */}
        <span id={professorList.title}> Professor List</span>
        <div id={professorList.professorsAndSearch}>
          <div className={professorList.tableHeader}>
            <h1 className={professorList.lets}>Professors</h1>
            <div className={professorList.searchbar}>
              {/* <FontAwesomeIcon id={professorList.MGlass} icon={faMagnifyingGlass} /> */}
              <input
                onChange={inputHandler}
                id={professorList.search}
                type="text"
                placeholder="Search.."
              />
            </div>
          </div>

          <div className={professorList.table}>
            <table>
              <thead>
                <tr>
                  <th>Users</th>
                  <th>Email</th>
                  <th>Aprroved</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((professor) => (
                  <tr key={professor.userId}>
                    <td>
                      {professor.firstName} {professor.lastName}
                    </td>
                    <td>
                      <button>{professor.isVerified.toString()}</button>
                       {professor.email}
                    </td>
                    <td>
                      <button className={professorList.isApproved}>{professor.isAdmin.toString()}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          className={professorList.button}
          onClick={() => {
            navigate("/addprofessor");
          }}
        >
          Add New Professor
        </button>
      </div>

      <Background />
    </div>
  );
}

export default ProfessorList;

// [HttpGet("professor/getAllCourses")]
