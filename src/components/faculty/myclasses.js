import Background from "../../background";
import Header from "../../header";
import myclasses from "./myclasses.module.css";
import { useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import { React, useEffect, useState } from "react";
import { Card } from "@mui/material";

function MyClasses() {
  let navigate = useNavigate();
  const [classList, setClassList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Mock data to test search functionality
  // const classesArray = [
  //   { courseId: 32, courseCode: "CIT 171", resourcePoolId: 1060 },
  //   { courseId: 33, courseCode: "CSE 150", resourcePoolId: 1060 },
  //   { courseId: 34, courseCode: "WDD 130", resourcePoolId: 1060 },
  //   { courseId: 35, courseCode: "CIT 172", resourcePoolId: 1060 },
  //   { courseId: 36, courseCode: "CIT 172", resourcePoolId: 1060 }
  // ];

  const filteredClasses = classList.filter((singleClass) => {
    if (searchInput === "") {
      return singleClass;
    } else {
      return singleClass.courseCode.includes(searchInput);
    }
  });

  useEffect(() => {
    const getclassList = async () => {
      const listResponse = await fetch(getApiRoot() + "/api/course/professor/getAllCourses", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      const classList = await listResponse.json();
      console.log(classList);
      setClassList(classList);
    };
    getclassList();
  }, []);

  return (
    <div className={myclasses.myclasses}>
      <div className={myclasses.container}>
        <Header userType="facultydashboard" />
        {/* <span onClick={() => {navigate("/faculty")}} id={myclasses.backbtn}>&#8592; back</span> */}
        <h1 className={myclasses.title}>My Classes</h1>
        <div id={myclasses.classesAndSearch}>
          <div className={myclasses.searchbar}>
            <input
              id={myclasses.search}
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className={myclasses.tablegrid}>
          <div className={myclasses.table}>
            {filteredClasses.map((item) => (
              <div className={myclasses.card} key={item.courseId}>
                <Card variant="outlined">
                  <div value={item} className={myclasses.tableheader}>
                    {item.courseCode}
                  </div>
                  <div className={myclasses.tablecontent}>
                    <div className={myclasses.add}>
                      <button
                        className={myclasses.addbutton}
                        onClick={(e) => navigate(`/addvm?courseId=${item.courseId}`)}>
                        Add Virtual Machine Template
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div
          className={myclasses.add_class}
          onClick={() => {
            navigate("/addclass");
          }}>
          <button className={myclasses.submitBt}>Add New Class</button>
        </div>
      </div>

      <Background />
    </div>
  );
}

export default MyClasses;
