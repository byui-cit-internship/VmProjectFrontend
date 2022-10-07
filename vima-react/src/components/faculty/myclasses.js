import Background from "../../background";
import Header from "../../header";
import myclasses from "./myclasses.module.css";
import { useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import { useEffect, useState } from "react";

function MyClasses() {
  let navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  console.log(JSON.stringify(myclasses));
  useEffect(()=>{
    const getClassInfo = async () =>{
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
    getClassInfo();
  }, []);


  return (
    <div className={myclasses.myclasses}>
      <div className={myclasses.container}>
        <Header />
        {/* <span onClick={() => {navigate("/faculty")}} id={myclasses.backbtn}>&#8592; back</span> */}
        <span id={myclasses.title}></span>
        <div id={myclasses.classesAndSearch}>
          <h1 className={myclasses.lets}>My Classes</h1>
          <div className={myclasses.searchbar}>
            <input
              id={myclasses.search}
              type="text"
              placeholder="Search.."
            />
          </div>
        </div>
          <div className={myclasses.tablegrid}>
            <div className={myclasses.table}>
              <table id={myclasses.table1}>
                <tr className={myclasses.tableHead}>
                <th>CIT 110</th>
                </tr>
                <tr>
                  <span className={myclasses.vmName}>Linux </span>
                  <span className={myclasses.semester}> Spring 2022</span>
                </tr>
                <tr>
                  <span className={myclasses.vmName}>Windows </span>
                  <span className={myclasses.semester}> Spring 2022</span>
                  </tr>
              </table>
              <br></br>
            </div>
          </div>
        <div className={myclasses.add_class} onClick={() => {navigate("/addclass")}}>
        <button className={myclasses.submitBt}>Add New Class</button>
    </div>
      </div>

      <Background />
    </div>
  );
}

export default MyClasses;