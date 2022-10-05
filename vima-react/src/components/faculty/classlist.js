import Background from "../../background";
import Header from "../../header";
import classList from "./classlist";
import { useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import { useEffect, useState } from "react";


// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// const element = <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />

function ClassList() {
  let navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const getCourseInfo = async () => {
      const listResponse = await fetch(
        getApiRoot() + "/api/course/professor/getAllCourses",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log("listResponse; ", listResponse)
      const classList = await listResponse.json();
      console.log("classes; ", classList)
      setCourseList(classList);
    };
    getCourseInfo();
  }, []);

  return (
    <div className={classList.classList}>
      <div className={classList.container}>
        <Header />
        {/* <span onClick={() => {navigate("/student")}} id={classList.backbtn}>&#8592; back</span> */}
        <span id={classList.title}> class List</span>
        <div id={classList.classesAndSearch}>
          <h1 className={classList.lets}>class</h1>
          <div className={classList.searchbar}>
            {/* <FontAwesomeIcon id={classList.MGlass} icon={faMagnifyingGlass} /> */}
            <input
              id={classList.search}
              type="text"
              placeholder="Search.."
            />
          </div>
        </div>

        <div className={classList.add_class} onClick={() => {navigate("/addclass")}}>
        <button>Add New Class</button>
    </div>
      </div>

      <Background />
    </div>
  );
}

export default ClassList;