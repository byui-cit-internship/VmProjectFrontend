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
  let navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  console.log(JSON.stringify(professorList))
  useEffect(() => {
    const getCourseInfo = async () => {

      console.log("hello");
      const listResponse = await fetch(getApiRoot() + "/api/user/professors", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      console.log("listResponse; ", listResponse);

      const classList = await listResponse.json();
      console.log("classes; ", classList);
      setCourseList(classList);
    };
    getCourseInfo();
  }, []);

  return (
    <div className={professorList.professorList}>
      <div className={professorList.container}>
        <Header userType="faculty" />
        {/* <span onClick={() => {navigate("/student")}} id={professorList.backbtn}>&#8592; back</span> */}
        <span id={professorList.title}> Professor List</span>
        <div id={professorList.professorsAndSearch}>
          <h1 className={professorList.lets}>Professors</h1>
          <div className={professorList.searchbar}>
            {/* <FontAwesomeIcon id={professorList.MGlass} icon={faMagnifyingGlass} /> */}
            <input
              id={professorList.search}
              type="text"
              placeholder="Search.."
            />
          </div>
        </div>

        <div className={professorList.table}>
          <table>
            <thead>
            </thead>
            <tbody>
              {courseList.map((professor) => (
                <tr>
                  <td>{professor.firstName} {professor.lastName}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
