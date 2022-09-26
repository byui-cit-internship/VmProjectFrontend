import { React, useState } from "react";
import Background from "../../background";
import utilization from "./utilization.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import TextField from "@mui/material/TextField";
import data from "../../studentList.json";
import Header from "../../header";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import classList from "../../courseList.json";

let registerApiUrlroot = getApiRoot();
const register_tokenID = sessionStorage.getItem("token");
let semester = "";
let section = "";

function Utilization() {
  let navigate = useNavigate();

  const [courseCode, setCourseCode] = useState("");
  const [courseSemester, setSemester] = useState("");
  const [courseSection, setSection] = useState("");
  const [inputText, setInputText] = useState("");

  //Code for filtering student lists when the proper course is selected ****
  //***********************************************************************/
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = data.filter((i) => {
    //if no input the return the original
    if (inputText === "") {
      return i;
    }
    //return the item which contains the user input
    else {
      return i.text.toLowerCase().includes(inputText);
    }
  });

  //*****************************************************************/
  //Code for getting a specific professors course list and filtering out any duplicate course codes
  //******************************************************************/

  const getStudentList = async () => {
    //   const listResponse = await fetch(
    //     getApiRoot() + "/api/course/professor/semester/winter",{
    //     method:'GET',
    //     credentials:'include',
    //     headers:{
    //       'content-type':'application/json'
    //     }
    //   }
    // );
    // const classList = listResponse.json()
  };
  getStudentList();

  //below code is hardcode for the dropdown that pulls data from a local json file because as of Sept. 20, 2022, the get request above displays an empty array
  const uniqueIds = new Set();
  const unique = classList.filter((element) => {
    const isDuplicate = uniqueIds.has(element.course_code);

    uniqueIds.add(element.course_code);

    if (!isDuplicate) {
      return true;
    }

    return false;
  });
  console.log(unique);
  console.log(courseCode);
  console.log(courseSemester);
  console.log(courseSection);

  //*****************************************************************************/
  //Return statement with all JSX for this page**********************************/
  //*****************************************************************************/

  return (
    <div className={utilization.utilization}>
      <div className={utilization.container}>
        <div className={utilization.header}>
          <Header />
        </div>
        <div id={utilization.formheader}>
          <span
            onClick={() => {
              navigate("/faculty");
            }}
            id={utilization.backbtn}
          >
            &#8592; back
          </span>
          <h1>Class VM Utilization</h1>
        </div>

        <div className={utilization.courseselect}>
          <label htmlFor="course_semester">
            Semester:
            {/*onchange="semester_update()*/}
            <select
              name="course_semester"
              id={utilization.course_semester}
              required
              onChange={(event) => setSemester(event.target.value)}
              >
              <option value="" hidden>
                Choose Semester
              </option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
            </select>
          </label>

          <label className={utilization.choosecourse} htmlFor="course">
            Course:
            <select
              name="course"
              id={utilization.course}
              required
              onChange={(event) => setCourseCode(event.target.value)}
            >
              <option value="" hidden>
                Choose Course
              </option>
              {unique.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.course_code} {item.original_name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="choosesection">
            Section:
            <select
              name="choosesection"
              id={utilization.choosesection}
              required
              onChange={(event) => setSection(event.target.value)}
            >
              <option value="" hidden>
                Choose Section
              </option>
            </select>
          </label>
        </div>
        <div>
          <h2>Available templates for this Class</h2>
        </div>
        <div className={utilization.button}>
          <button className={utilization.btn}>
            <img
              className={utilization.logo}
              src={require("../../computerlogo.png")}
              alt="logo"
            />
            <strong>Linux</strong>
          </button>
          <button className={utilization.btn}>
            <img
              className={utilization.logo}
              src={require("../../computerlogo.png")}
              alt="logo"
            />
            <strong>Android-Pie</strong>
          </button>
        </div>

        <div className={utilization.twoTables}>
          <div className={utilization.searchBar}>
            <div className={utilization.listHead}>
              <strong className={utilization.listHeadText}>Students</strong>
              <TextField
                onChange={inputHandler}
                id={utilization.search}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{ color: "white" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={utilization.updateList}>
              <ul>
                {filteredData.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={utilization.scoreboard}>
            <table className={utilization.scoreboardTable}>
              <thead className={utilization.scoreboardtableHead}>
                <tr className={utilization.scoreboardtableHeaderRow}>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Virtual Machine</th>
                  <th>Creation Date</th>
                  <th>VM Template</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>hello</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <Background />
      </div>
    </div>
  );
}

export default Utilization;
