import { React, useState, useEffect } from "react";
import Background from "../../background";
import utilization from "./utilization.module.css";
import { useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import TextField from "@mui/material/TextField";
import Header from "../../header";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Popup from "./Popup.js";

getApiRoot();
sessionStorage.getItem("token");

function Utilization() {
  useNavigate();

  const [courseCode, setCourseCode] = useState("");
  const [courseSemester, setSemester] = useState("");
  const [courseSectionId, setSectionId] = useState("");
  const [courseSections, setCourseSections] = useState([]);
  const [inputText, setInputText] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [canvasCourses, setCanvasCourses] = useState([]);
  const [sectionUsers, setSectionUsers] = useState([]);
  const [setVmLibraries] = useState([]);
  const [libraryId] = useState("");
  const [setPopupInfo] = useState("");
  const [setPopupActivate] = useState("");

  //Code that gets a list of semesters and puts it in a dropdown ****
  //***********************************************************************/
  useEffect(() => {
    const getSemesters = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };

      const listResponse = await fetch(getApiRoot() + "/api/semester/semester", methods);
      if (!listResponse.ok) {
        console.log("response", listResponse);
      }
      const listResponseObject = await listResponse.json();
      setSemesters(listResponseObject);
    };
    getSemesters();
  }, []);

  //Code for filtering student lists when the proper course is selected ****
  //***********************************************************************/
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const filteredData = sectionUsers.filter((i) => {
    //if no input the return the original
    if (inputText === "") {
      return i;
    }
    //return the item which contains the user input
    else {
      return i.firstName.toLowerCase().includes(inputText);
    }
  });
  //*****************************************************************/
  //Code for getting a specific professors course list and filtering out any duplicate course codes once semester is selected
  //******************************************************************/
  useEffect(() => {
    const getCourses = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };
      const listResponse = await fetch(
        getApiRoot() + `/api/course/professor/semester/${courseSemester}`,
        methods
      );
      if (!listResponse.ok) {
        console.log("response", listResponse);
      }
      const listResponseObject = await listResponse.json();
      setCanvasCourses(listResponseObject);
    };
    if (courseSemester) {
      getCourses();
    }
  }, [courseSemester]);

  //*********Gets all Section names from canvasCourses that match the chosen canvas Code*******************/
  const filterSections = (item) => {
    const sectionList = canvasCourses.filter((element) => {
      return element.courseCode == item;
    });
    setCourseSections(sectionList);
  };

  //*****************************************************************/
  //Gets list of users by section chosen
  //******************************************************************/
  useEffect(() => {
    const getUsers = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };
      const listResponse = await fetch(
        getApiRoot() + `/api/user/bySection?sectionId=${courseSectionId}`,
        methods
      );
      if (!listResponse.ok) {
        console.log("response", listResponse);
      }
      const listResponseObject = await listResponse.json();
      setSectionUsers(listResponseObject);
    };
    if (courseSectionId) {
      getUsers();
    }
  }, [courseSectionId]);

  //*****************************************************************/
  //Gets list of Libraries and gets templates in the library that matches the section chosen
  //******************************************************************/
  useEffect(() => {
    const getLibraries = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };
      const listResponse = await fetch(getApiRoot() + "/api/createvm/libraries", methods);
      if (!listResponse.ok) {
        console.log("response", listResponse);
      }
      const listResponseObject = await listResponse.json();
      setVmLibraries(listResponseObject);
    };
    getLibraries();
  }, []);

  useEffect(() => {
    const getTemplates = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };
      const listResponse = await fetch(
        getApiRoot() + `/api/vmtable/templates/all?libraryId=${libraryId}`,
        methods
      );
      if (!listResponse.ok) {
        console.log("response", listResponse);
      }
      const listResponseObject = await listResponse.json();
      setSectionUsers(listResponseObject);
    };
    if (libraryId) {
      getTemplates();
    }
  }, [libraryId]);

  //*****************************************************************************/
  //Return statement with all JSX for this page**********************************/
  //*****************************************************************************/
  const handlePopup = (value) => {
    setPopupInfo(value);
    setPopupActivate(true);
  };
  return (
    <div className={utilization.utilization}>
      <div className={utilization.container}>
        <div className={utilization.header}>
          <Header userType="faculty" />
        </div>
        <div className={utilization.main}>
          <div id={utilization.formheader}>
            {/* <span
            onClick={() => {
              navigate("/faculty");
            }}
            id={utilization.backbtn}
          >
            &#8592; back
          </span> */}
            <h1 className={utilization.h1}>Class VM Utilization</h1>
          </div>
          {/*SEMESTER*/}
          <div className={utilization.courseselect}>
            <label className={utilization.dropdown} htmlFor="course_semester">
              Semester:
              <select
                name="course_semester"
                className={utilization.dropdownDescription}
                id={utilization.course_semester}
                required
                onChange={(event) => {
                  setSemester(event.target.value);
                }}>
                <option className={utilization.singleOption} value="" hidden>
                  Choose Semester
                </option>
                {semesters.map((item) => (
                  <option key={item.semesterId} value={item.semesterTerm}>
                    {item.semesterTerm} {item.semesterYear}
                  </option>
                ))}
              </select>
            </label>
            {/*COURSE CODE*/}
            <label className={utilization.dropdown} htmlFor="course">
              Course:
              <select
                name="course"
                className={utilization.dropdownDescription}
                id={utilization.course}
                required
                onChange={(event) => {
                  setCourseCode(event.target.value),
                    filterSections(event.target.value),
                    libraryToName(event.target.value);
                }}
                disabled={!courseSemester}>
                <option value="Default" className={utilization.singleOption} hidden>
                  - Select -
                </option>
                {canvasCourses.map((course) => (
                  <option value={course.courseCode} key={course.sectionId}>
                    {course.courseCode}
                  </option>
                ))}
              </select>
            </label>
            {/*Section Name*/}
            <label htmlFor="choosesection" className={utilization.dropdown}>
              Section:
              <select
                className={utilization.dropdownDescription}
                name="choosesection"
                id={utilization.choosesection}
                required
                onChange={(event) => {
                  setSectionId(event.target.value);
                }}
                disabled={!courseCode}>
                <option value="Default" className={utilization.singleOption} hidden>
                  - Select -
                </option>
                {courseSections.map((course) => (
                  <option value={course.sectionId} key={course.sectionNumber}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {/*Templates*/}
          <div className={utilization.templatesAvailable}>
            <h2 className={utilization.h2available}>Available templates for this Class</h2>

            <div className={utilization.button}>
              <button className={utilization.btn}>
                <img className={utilization.logo} src={"../../computerlogo.png"} alt="logo" />
                <strong>Linux</strong>
              </button>
              <button className={utilization.btn}>
                <img className={utilization.logo} src={"../../computerlogo.png"} alt="logo" />
                <strong>Android-Pie</strong>
              </button>
            </div>
          </div>
          {/*User Filter List*/}
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
                        <SearchIcon className={utilization.searchIcon} />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div className={utilization.updateList}>
                <ul>
                  {filteredData.map((item) => (
                    <li
                      key={item.userId}
                      className={utilization.li}
                      value={item.firstName}
                      onClick={(e) => handlePopup(e.target.value)}>
                      {item.firstName}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/*User Info Table*/}
            <div className={utilization.scoreboard}>
              <table className={utilization.scoreboardTable}>
                <thead className={utilization.scoreboardtableHead}>
                  <tr className={utilization.scoreboardtableHeaderRow}>
                    <th className={utilization.studentName}>Student Name</th>
                    <th className={utilization.studentEmail}>Email</th>

                    <th className={utilization.studentVM}>Virtual Machine</th>
                    <th className={utilization.creationDate}>Creation Date</th>
                    <th className={utilization.vmTemplate}>VM Template</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hardcoded1</td>
                  </tr>
                  <tr>
                    <td>Hardcoded2</td>
                  </tr>
                  <tr>
                    <td>Hardcoded3</td>
                  </tr>
                  <tr>
                    <td>Hardcoded4</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* S E P A R A T I O N */}
          {/* button */}
          <div className={utilization.alert}>
            <label className={utilization.alertLabel}>Click button</label>
            <button
              onClick={togglePopup}
              type="vCenter Folder Alert Button"
              className={utilization.alertButton}>
              <i className={utilization.alertIcon} aria-hidden="true"></i>
            </button>
          </div>
          {/* isOpen  */}
          {isOpen && (
            <Popup
              content={
                <>
                  <div className={utilization.popupbox}>
                    <div className={utilization.box}>
                      <span className={utilization.closeicon} onClick={togglePopup}>
                        x
                      </span>
                      <img
                        className={utilization.logo}
                        src="../../images/LOGO-VIMA.png"
                        alt="logo"
                      />
                      <h3 className={utilization.h3}>ALL THE STUDENT'S INFORMATION</h3>
                    </div>
                  </div>
                </>
              }
            />
          )}
          {/* S E P A R A T I O N */}
        </div>
      </div>
      <div>
        <Background />
      </div>
    </div>
  );
}

export default Utilization;
