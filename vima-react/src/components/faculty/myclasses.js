import Background from "../../background";
import Header from "../../header";
import myclasses from "./myclasses.module.css";
import { useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import { useEffect, useState } from "react";
import { Card } from '@mui/material';

function MyClasses() {
  let navigate = useNavigate();
  const [classList, setClassList] = useState([]);
  console.log(JSON.stringify(myclasses));
  useEffect(() =>{
    const getclassList = async () =>{
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
      console.log(listResponse);
      const classList = await listResponse.json();
      console.log("classes; ", classList);
      setClassList(classList);
    };
    getclassList();
  }, []);


  return (
    <div className={myclasses.myclasses}>
      <div className={myclasses.container}>
        <Header />
        {/* <span onClick={() => {navigate("/faculty")}} id={myclasses.backbtn}>&#8592; back</span> */}
        <span id={myclasses.title}>
        <h1 className={myclasses.lets}>My Classes</h1>
        </span>
        <div id={myclasses.classesAndSearch}>
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
            {classList.map((item) => (
              <div className={myclasses.card}>
              <Card variant="outlined">
                <div value={item.courseName} className={myclasses.tableheader}>
                  {item.courseName}
                </div>
                <div className={myclasses.tablecontent}>
                  <div className={myclasses.tablerow}>
                  <p>Linux</p>
                  <span className={myclasses.time} >Semester, year</span>
                  </div>
                  <div className={myclasses.tablerow}>
                  <p>Windows</p>
                  <span className={myclasses.time}>Semester, year</span>
                  </div>
                  <div className={myclasses.tablerow}>
                  <p>Android</p>
                  <span className={myclasses.time}>Semester, year</span>
                  </div>
                  <button className={myclasses.addbutton}>Add Virtual Machine</button>
                </div>
              </Card>
              </div>
              ))}
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