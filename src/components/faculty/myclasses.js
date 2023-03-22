import Background from "../../background";
import Header from "../../header";
import myclasses from "./myclasses.module.css";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Card } from "@mui/material";

import { getApiRoot } from "../../utils/getApiRoot";
import LoadingSpinner2 from "../spinner2";
import DbLibraryTemplates from "./dbLibraryTemplates";
import ClassesSkeleton from "./classesSkeleton";

function MyClasses() {
  let navigate = useNavigate();
  const [sectionList, setSectionList] = useState([]);
  const [filteredSectionList, setFilteredSectionList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [semester, setSemester] = useState(null);
  const [courseSemesterList, setCourseSemesterList] = useState([]);
  const [fetchingClasses, setFetchingClasses] = useState(false);

  useEffect(() => {
    setFetchingClasses(true);

    const filterBySemesterId = (section) => {
      console.log(section.semesterId);
      if (section.semesterId == semester.semesterId) {
        return true;
      }
    };

    const getclassList = async () => {
      const listResponse = await fetch(getApiRoot() + "/api/course/professor/getAllSections", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });

      const sections = await listResponse.json();
      setSectionList(sections);
      setFetchingClasses(false);
    };
    getclassList();
  }, []);

  useEffect(() => {
    const getcourseSemester = async () => {
      const listResponse = await fetch(getApiRoot() + "/api/semester/semester", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      const courseSemesterList = await listResponse.json();
      setCourseSemesterList(courseSemesterList);
    };
    getcourseSemester();
  }, []);

  return (
    <div className={myclasses.myclasses}>
      <div className={myclasses.container}>
        <Header userType="facultydashboard" />
        <h1>My Classes</h1>
        <div className={myclasses.flex2}>
          {/*Semester*/}
          <div className={myclasses.singleDiv}>
            {/* <label className={myclasses.label}>Choose Semester: </label> <br></br> */}
            <select
              className={myclasses.select}
              onChange={(e) => {
                console.log(e);
                var selectedSemester = JSON.parse(e.target.value);
                setSemester(selectedSemester);
                console.log(selectedSemester);
                const filteredSections = sectionList.filter((section) => {
                  console.log(section);
                  if (section.semesterId == selectedSemester.semesterId) {
                    console.log(section.semesterId);
                    console.log(selectedSemester.semesterId);
                    return true;
                  }
                });
                console.log(filteredSections);
                setFilteredSectionList(filteredSections);
              }}>
              <option>Select Semester</option>

              {courseSemesterList?.map((item, i) => (
                <option key={i} value={JSON.stringify(item)}>
                  {item.semesterTerm} {item.semesterYear}
                </option>
              ))}
            </select>
          </div>

          {/* <div id={myclasses.classesAndSearch}>
            <div className={myclasses.searchbar}>
              <input
                id={myclasses.search}
                onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
                type="text"
                placeholder="Search..."
              />
            </div>
          </div> */}

          <div className={myclasses.MyClasscontainer}>
            <table className={myclasses.MyClasstableheader}>
              <tr>
                <th>Class</th>
                <th>Virtual Machine</th>
                <th>Creation Date</th>
              </tr>
            </table>
          </div>

          <div className={myclasses.tablegrid}>
            <div className={myclasses.table}>
              {fetchingClasses ? (
                <ClassesSkeleton />
              ) : (
                filteredSectionList.map((item) => (
                  <div className={myclasses.card} key={item.sectionId}>
                    <Card variant="outlined">
                      <div value={item} className={myclasses.tableheader}>
                        {item.sectionName}
                      </div>
                      <div className={myclasses.tablecontent}>
                        <DbLibraryTemplates libraryId={item.libraryVCenterId} />
                        <div className={myclasses.add}></div>
                      </div>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </div>

          <div
            className={myclasses.add_class}
            onClick={() => {
              navigate("/addclass");
            }}>
          </div>
            <button className={myclasses.submitBt}>Add Class</button>
      
            <a className={myclasses.conf_link} href="https://byui-cit.atlassian.net/wiki/spaces/CDI/pages/25493505/Creating+A+VM+and+Template+in+VSphere" target="_blank">Don't see your template?</a>

        </div>
      </div>
      <Background />
    </div>
  );
}

export default MyClasses;
