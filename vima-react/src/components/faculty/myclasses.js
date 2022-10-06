import Background from "../../background";
import Header from "../../header";
import myclasses from "./myclasses.module.css";
import { useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import { useEffect, useState } from "react";


// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// const element = <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />

function MyClasses() {
  let navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  console.log(JSON.stringify(myclasses));

  // useEffect(() => {
  //   const getCourseInfo = async () => {
  //     const listResponse = await fetch(
  //       getApiRoot() + "/api/course/professor/getAllCourses",
  //       {
  //         method: "GET",
  //         credentials: "include",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("listResponse; ", listResponse)
  //     const classList = await listResponse.json();
  //     console.log("classes; ", classList)
  //     setCourseList(classList);
  //   };
  //   getCourseInfo();
  // }, []);

  return (
    <div className={myclasses.myclasses}>
      <div className={myclasses.container}>
        <Header />
        {/* <span onClick={() => {navigate("/faculty")}} id={myclasses.backbtn}>&#8592; back</span> */}
        <span id={myclasses.title}> My Classes</span>
        <div id={myclasses.classesAndSearch}>
          <h1 className={myclasses.lets}>My Classes</h1>
          <div className={myclasses.searchbar}>
            {/* <FontAwesomeIcon id={classList.MGlass} icon={faMagnifyingGlass} /> */}
            <input
              id={myclasses.search}
              type="text"
              placeholder="Search.."
            />
          </div>
        </div>
        <div className={myclasses.table}>
          
        </div>
        <div className={myclasses.add_class} onClick={() => {navigate("/addclass")}}>
        <button>Add New Class</button>
    </div>
      </div>

      <Background />
    </div>
  );
}

export default MyClasses;