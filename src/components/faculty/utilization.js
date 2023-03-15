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
import { AiOutlineReload } from "react-icons/ai";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { fontSize } from "@mui/system";

getApiRoot();
sessionStorage.getItem("token");

function Utilization() {
  useNavigate();

  const [studentList, setStudentList] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [section, setSection] = useState([]);
  const [courseSections, setCourseSections] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [inputText, setInputText] = useState("");
  const [semesters, setSemesters] = useState([]);
  const [semesterEnrollmentId, setSemesterEnrollmentId] = useState("");
  const [courses, setCourses] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [libraryId, setLibraryId] = useState("");
  const [setPopupInfo] = useState("");
  const [setPopupActivate] = useState("");
  const [vmInstanceList, setVmInstanceList] = useState([]);
  const [studentUserId, setStudentUserId] = useState("");
  const [tableStudentData, setTableStudentData] = useState([]);

  console.log(tableStudentData);
  console.log(vmInstanceList);

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
  //console.log(studentList)
  const filteredData = studentList.filter((i) => {
    //if no input the return the original
    if (inputText === "") {
      return i;
    }
    //return the item which contains the user input
    else {
      const fullName = i.firstName + " " + i.lastName;
      return fullName.toLowerCase().includes(inputText);
    }
  });
  //*****************************************************************/
  //Code for getting a specific professors course list and filtering out any duplicate course codes once semester is selected
  //******************************************************************/
  useEffect(() => {
    const semesterByCourse = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };
      const listResponse = await fetch(
        getApiRoot() + `/api/course/professor/semester/${semesterEnrollmentId}`,
        methods
      );
      const listResponseObject = await listResponse.json();
      setCourses(listResponseObject);
    };

    if (semesterEnrollmentId) {
      semesterByCourse();
    }
  }, [semesterEnrollmentId]);

  //*********Gets all Section names from courses that match the chosen course Code*******************/
  const filterSections = (item) => {
    const sectionList = courses.filter((element) => {
      return element.courseCode == item;
    });
    setCourseSections(sectionList);
  };

  //*********Resets Dropdowns for selecting a different section/course/semester*******************/
  const resetDropdowns = () => {
    setSemesterEnrollmentId("");
    setCourseCode("");
    setCourses([]);
    setCourseSections([]);
    setSectionId("");
    setStudentList([]);
    setSemesters([]);
    setLibraryId("");
    setTemplates([]);
  };

  //*****************************************************************/
  //Gets list of users by section chosen
  //******************************************************************/
  useEffect(() => {
    const studentList = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };
      const listResponse = await fetch(
        getApiRoot() + `/api/user/bySection?sectionId=${sectionId}`,
        methods
      );
      if (!listResponse.ok) {
        console.log("response", listResponse);
      }
      const listResponseObject = await listResponse.json();
      setStudentList(listResponseObject);
    };
    if (sectionId) {
      studentList();
    }
  }, [sectionId]);

  //*****************************************************************/
  //Gets templates in the library that matches the section chosen
  //******************************************************************/
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
      const listResponseObject = await listResponse.json();
      setTemplates(listResponseObject);
    };
    if (libraryId) {
      getTemplates();
    }
  }, [libraryId]);

  //*****************************************************************/
  //Gets a user's vm instance info by the user id set when a name is selected
  //******************************************************************/
  useEffect(() => {
    const getVmInstanceInfo = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };
      const listResponse = await fetch(
        getApiRoot() + `/api/vmtable/professor/instance?userId=${studentUserId}`,
        methods
      );
      const listResponseObject = await listResponse.json();
      const officialVmList = listResponseObject.filter((item) => (item.sectionId = sectionId));
      setVmInstanceList(officialVmList);
    };
    if (studentUserId) {
      getVmInstanceInfo();
    }
  }, [studentUserId]);

  //*****************************************************************/
  //Set the Section ID and Section's Library Id useStates when the section is selected
  //******************************************************************/
  const setSectionStates = (item) => {
    const tempItem = JSON.parse(item);
    setSectionId(tempItem.sectionId);
    setLibraryId(tempItem.libraryVCenterId);
  };

  const setStudentInfo = (first, last, email, userId) => {
    const fullStudentName = first + " " + last;
    setStudentUserId(userId);

    setTableStudentData([{ fullName: fullStudentName, email: email }]);
  };
  //*****************************************************************************/
  //Return statement with all JSX for this page**********************************/
  //*****************************************************************************/
  const handlePopup = (value) => {
    //setPopupInfo(value);
    setPopupActivate(true);
  };

  return (
    <div className={utilization.utilization}>
      <div className={utilization.container}>
        <div className={utilization.header}>
          <Header userType="facultydashboard" />
        </div>
        <div className={utilization.main}>
          <div id={utilization.formheader}>
            <h1>Class VM Utilization</h1>
          </div>

          <div className={utilization.filterContainer}>
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
                    setSemesterEnrollmentId(event.target.value);
                  }}>
                  <option className={utilization.singleOption} value="" hidden>
                    - Select -
                  </option>
                  {semesters.map((item) => (
                    <option key={item.semesterId} value={item.enrollmentTermCanvasId}>
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
                    setCourseCode(event.target.value);
                    filterSections(event.target.value);
                  }}
                  disabled={courses.length === 0 && "disabled"}>
                  <option value="Default" className={utilization.singleOption} hidden>
                    - Select -
                  </option>
                  {courses.map((course) => (
                    <option key={course.courseId} value={course.courseCode}>
                      {course.courseCode}
                    </option>
                  ))}
                </select>
              </label>

              {/*SECTION*/}
              <label className={utilization.dropdown} htmlFor="section">
                Section:
                <select
                  name="section"
                  className={utilization.dropdownDescription}
                  id={utilization.course}
                  required
                  onChange={(event) => {
                    setSectionStates(event.target.value);
                  }}
                  disabled={!courseCode}>
                  <option value="Default" className={utilization.singleOption} hidden>
                    - Select -
                  </option>
                  {courseSections.map((section) => (
                    <option key={section.sectionId} value={JSON.stringify(section)}>
                      {section.sectionName}
                    </option>
                  ))}
                </select>
              </label>
              <div className={utilization.searchBar}>
                <div className={utilization.listHead}>
                  {/*STUDENT*/}
                  <div className={utilization.filterContainer}>
                    <div className={utilization.courseselect}>
                      <label className={utilization.dropdown} htmlFor="student">
                        Student:
                        <select
                          name="student"
                          className={utilization.dropdownDescription}
                          id={utilization.search}
                          required
                          // onChange={inputHandler}
                          onChange={(event) => {
                            const student = JSON.parse(event.target.value);
                            setStudentInfo(
                              student.firstName,
                              student.lastName,
                              student.email,
                              student.userId
                            );
                          }}
                          disabled={!courseCode}>
                          {/* <option value="Default" className={utilization.singleOption} hidden>
                          - Select -
                        </option> */}
                          <option className={utilization.singleOption} value="" hidden>
                            - Select -
                          </option>
                          {filteredData?.map((item) => (
                            <option key={item.userId} value={JSON.stringify(item)}>
                              {item.firstName} {item.lastName}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Templates*/}
          <div className={utilization.templatesAvailable}>
            <h2 className={utilization.h2available}>Available templates for this class:</h2>

            <div className={utilization.button}>
              {templates.map((template) => (
                <button className={utilization.btn} key={template.id} value={template.name}>
                  <img
                    className={utilization.logo}
                    src={"../../images/computerlogo.png"}
                    alt="logo"
                  />
                  <strong>{template.name}</strong>
                </button>
              ))}
            </div>
          </div>

          {/*User Filter List*/}
          <div className={utilization.twoTables}>
            <div className={utilization.studentHeader}>
              <h2>Student</h2>
              <h2>Virtual Machines</h2>
            </div>
            <div className={utilization.allInfoContainer}>
              <div className={utilization.studentInfoSection}>
                <AccountCircleRoundedIcon
                  style={{ fontSize: "70px" }}
                  className={utilization.iconStyle}
                />
                {tableStudentData?.map((item) => (
                  <div key={item.email}>
                    <p style={{ fontWeight: "bold" }}>{item.fullName}</p>
                  </div>
                ))}
                {tableStudentData?.map((item) => (
                  <div key={item.email}>
                    <p>{item.email}</p>
                  </div>
                ))}
              </div>
              <div className={utilization.vmInfo}>
                <div>
                  {vmInstanceList?.map((item, index) => (
                    <div className={utilization.eachVM} key={index}>
                      <div className={`${utilization.vmDirection} ${utilization.vmChange}`}>
                        <p className={utilization.creationDate}>VM Name:</p>
                        <p>{item.vmInstanceVcenterName}</p>
                      </div>

                      <div className={utilization.vmDirection}>
                        <p className={utilization.creationDate}>Creation Date:</p>
                        <p>{item.vmInstanceCreationDate}</p>
                      </div>

                      <div className={`${utilization.vmDirection} ${utilization.vmChange}`}>
                        <p className={utilization.creationDate}>Expire Date:</p>
                        <p>{item.vmInstanceExpireDate}</p>
                      </div>

                      <div className={utilization.vmDirection}>
                        <p className={utilization.vmTemplate}>VM Template Used:</p>
                        <p>{item.vmTemplateName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/*User Info Table*/}
            {/* <div className={utilization.scoreboard}>
              <table className={utilization.scoreboardTable}>
                <thead>
                  <tr>
                    <th className={utilization.thHeader} colSpan="2">
                      Student Information
                    </th>
                  </tr>

                  {tableStudentData?.map((item) => (
                    <tr key={item.email}>
                      <th className={utilization.studentName}>Student Name</th>
                      <td>{item.fullName}</td>
                    </tr>
                  ))}
                  {tableStudentData?.map((item) => (
                    <tr key={item.email}>
                      <th className={utilization.studentEmail}>Email</th>
                      <td>{item.email}</td>
                    </tr>
                  ))}
                </thead>
                {vmInstanceList?.map((item, index) => (
                  <tbody className={utilization.tbody} key={index}>
                    <tr>
                      <th className={utilization.vMachine} colSpan="2">
                        Virtual Machines
                      </th>
                    </tr>

                    <tr>
                      <th className={utilization.creationDate}>VM Name</th>
                      <td>{item.vmInstanceVcenterName}</td>
                    </tr>

                    <tr>
                      <th className={utilization.creationDate}>Creation Date</th>
                      <td>{item.vmInstanceCreationDate}</td>
                    </tr>

                    <tr>
                      <th className={utilization.creationDate}>Expire Date</th>
                      <td>{item.vmInstanceExpireDate}</td>
                    </tr>

                    <tr>
                      <th className={utilization.vmTemplate}>VM Template Used</th>
                      <td>{item.vmTemplateName}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div> */}
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
