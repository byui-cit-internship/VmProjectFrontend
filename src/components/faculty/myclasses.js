import Background from "../../background";
import Header from "../../header";
import myclasses from "./myclasses.module.css";
import { useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import React from "react";

function MyClasses() {
  let navigate = useNavigate();
  const [classList, setClassList] = useState([]);
  console.log(JSON.stringify(myclasses));
  useEffect(() => {
    const getclassList = async () => {
      const listResponse = await fetch(getApiRoot() + "/api/course/professor/getAllCourses", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
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
        <h1 className={myclasses.title}>My Classes</h1>
        <div id={myclasses.classesAndSearch}>
          <div className={myclasses.searchbar}>
            <input id={myclasses.search} type="text" placeholder="Search.." />
          </div>
        </div>
        <div className={myclasses.tablegrid}>
          <div className={myclasses.table}>
            {classList.map((item) => (
              <div className={myclasses.card}>
                <Card variant="outlined">
                  <div value={item} className={myclasses.tableheader}>
                    {item.courseCode}
                  </div>
                  <div className={myclasses.tablecontent}>
                    <div className={myclasses.add}>
                      <button className={myclasses.addbutton}>Add Virtual Machine</button>
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
