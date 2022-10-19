import React, { useState, useEffect, useRef } from "react";
import Background from "../../background";
import "./addclassdependencies.css";
import addclass from "./addclass.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../header";
import { getApiRoot } from "../../utils/getApiRoot";
import Popup from "./Popup.js";
import SubmissionPopup from "../submissionpop";

function AddClass() {
  //*********Session Storage for name and email data of current user***********/
  const userInfoString = sessionStorage.getItem("userInfo");
  const userInfoObject = JSON.parse(userInfoString);
  const userId = userInfoObject.userId;
  const canvasToken = userInfoObject.canvasToken

  //*********Variables and React States************/
  let navigate = useNavigate();
  const [templateVm, setTemplateVm] = useState("");
  const [templateVmList, setTemplateVmList] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [canvasCourseId, setCanvasCourseId] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [courseSemester, setCourseSemester] = useState("");
  const [semesterYear, setSemesterYear] = useState("");
  const [vCenterFolderList, setvCenterFolderList] = useState([])
  const [vCenterFolderId, setvCenterFolderId] = useState("");
  const [libraryList, setLibraryList] = useState([]);
  const [canvasCourses, setCanvasCourses] = useState([]);
  const [libraryId, setLibraryId] = useState();
  const [resourceGroupName, setResourceGroupName] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState();
  const [popupMessage, setPopupMessage] = useState();
  const [popupAgainMessage, setPopupAgainMessage] = useState();
  const [success, setIsSuccess] = useState();
  const selectElement = useRef();
  //*********Creates course by sending all info in body to the BFF course controller************/
  const createCourse = async () => {
    console.log(courseCode)
    const options = {
      method: 'POST',
      body: JSON.stringify({
         
        sectionName: sectionName,
        courseCode: courseCode,
        canvas_token: canvasToken,
        section_num: "1", 
        semester: courseSemester,
        libraryId: libraryId,
        folder: vCenterFolderId,
        templateVm: [templateVm],
        resource_group: "blah",
        userId: userId,
        semesterYear: semesterYear,
        canvasCourseId: canvasCourseId
      }),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }
    console.log(options.body)
    const response = await fetch(
      getApiRoot() + "/api/enrollment/professor/register/course", options);
    if (response.ok) {
      setPopupMessage("Course added succesfully")
      setPopupAgainMessage("Add another course")
      setIsSuccess(true)
    } else {
      setPopupMessage("Error adding the course")
      setPopupAgainMessage("Try again")
      setIsSuccess(false)
    }
    setIsPopupOpen(true)
  };

  //*********Validates the Canvas token************/
  const validateCanvasToken = async () => {
    const tokenResponse = await fetch(
      getApiRoot() + "/api/course/professor/checkCanvasToken",
      {
        method: "POST",
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify({
          canvas_token: canvasToken,
          canvas_course_id: canvasCourseId,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    );

    // const canvasValidationObject = await tokenResponse.json();
    if (!tokenResponse.ok) {
      setPopupMessage("Canvas Id validation error")
      setPopupAgainMessage("Try again")
      setIsSuccess(false)
      setIsPopupOpen(true)
    } else {
      await createCourse();
    }
  };

  //*************Gets Library ID's and Names****************/
  useEffect(() => {
    const getLibraries = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        method: "GET",
      };

      const listResponse = await fetch(
        getApiRoot() + "/api/createvm/libraries",
        methods
      );

      const listResponseObject = await listResponse.json();
      setLibraryList(listResponseObject);
    };
    getLibraries();
  }, []);

  // Gets Template Id's and Names

  useEffect(() => {
    const getTemplateVms = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        method: 'GET',
      }
      const listResponse = await fetch(getApiRoot() + `/api/vmtable/templates/all?libraryId=${libraryId}`, methods);

      const listResponseObject = await listResponse.json()
      setTemplateVmList(listResponseObject)
    }
    if (libraryId) {
      getTemplateVms();
    }
  }, [libraryId])

  //*************Sets VM Folder when Course Code is set and if no folder, gives link to article on how to create one****************/
  //*************Sets Folder by comparing name of the course code to the name of the folder if it matches, it fills it in****************/
  useEffect(() => {
    const getVmFolderInfo = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        method: "GET",
      };

      const listResponse = await fetch(
        getApiRoot() + "/api/createvm/folders",
        methods
      );

      const listResponseObject = await listResponse.json();
      setvCenterFolderList(listResponseObject);
    };
    getVmFolderInfo();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

  //*************Gets Canvas course info with your canvas token****************/
  useEffect(() => {
    const getCanvasCourseInfo = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        method: "GET",
      };

      const listResponse = await fetch(getApiRoot() + '/api/course/professor/canvasDropdown', methods);
      if (!listResponse.ok) {
        console.log("response", listResponse)
      }
      const listResponseObject = await listResponse.json()
      setCanvasCourses(listResponseObject)
    }
    getCanvasCourseInfo();
  }, []);

  //*************Maps course list string from canvas and sets course description****************/


  /* What happens after selecting course id */
  const updateInputs = (event) => {
    const code = event.target.options[event.target.selectedIndex].dataset.code
    const id = event.target.options[event.target.selectedIndex].dataset.id
    const name = event.target.options[event.target.selectedIndex].dataset.name
    
    setCourseCode(code);
    setCanvasCourseId(id);
    setSectionName(name);

    vmFolder(code)
  }

  const closePopup = (closeBool) => {
    selectElement.current.reset()
    setCanvasCourseId("")
    setCourseCode("")
    setCourseYear("")
    setCourseSemester("")
    setLibraryId("")
    setIsPopupOpen(closeBool);
  };

  //*****************************************************************************/
  //Return statement with all JSX for this page**********************************/
  //*****************************************************************************/
  return (
    <div className={addclass.addclass}>
      <div className={addclass.container}>
        <div className={addclass.header}>
          <Header userType="faculty" />
        </div>
        <form ref={selectElement}>
          <div id={addclass.formheader}>
            <h1>Add Class</h1>
          </div>
          <div id={addclass.gridcont}>

            {/* <!-- Course Code--> */}
            <div className={addclass.coursename}>
              <label className={addclass.label} htmlFor="name">
                Course:
                <select
                  onChange={event => updateInputs(event)}
                >
                  <option
                    value="Default"
                    data-code=""
                    data-name=""
                    data-id="">
                    - Select -
                  </option>
                  {
                    canvasCourses.map((course) => (
                      <option
                        data-code={course.course_code}
                        data-name={course.name}
                        data-id={course.id}
                        value={course}
                      >
                        {course.course_code} - {course.name}
                      </option>
                    ))
                  }
                </select>
              </label>
            </div>

            {/* <!--Course Id--> */}
            <div className={addclass.courseid}>
              <label className={addclass.label} htmlFor="name">
                Canvas Course ID:
              </label>
              <span role="alert" id={addclass.nameError} aria-hidden="true">
                {/* Please add a valid CourseID */}
              </span>
              <input
                readOnly
                type="text"
                value={canvasCourseId}
              ></input>
            </div>

            {/* Year*/}
            <div className={addclass.year}>
              <label>Year:</label>
              <select
                name="semester"
                id={addclass.semester}
                required
                onChange={(event) => {
                  setCourseYear(event.target.value);
                }}
                disabled={!courseCode}
              >
                <option name="option" value="">
                  Default
                </option>
                <option name="option" value="2022">
                  2022
                </option>
                <option name="option" value="2021">
                  2021
                </option>
                <option name="option" value="2020">
                  2020
                </option>
                <option name="option" value="2019">
                  2019
                </option>
              </select>
            </div>

            {/* Semester */}
            <div className={addclass.semester}>
              <label>Choose Semester:</label>
              <select name="semester" id="semester" required disabled={!courseYear} onChange={(event) => {
                setCourseSemester(event.target.value)
              }}>
                <option name="option" value="" hidden>
                  Default
                </option>
                <option name="option" value="Summer">
                  Summer
                </option>
                <option name="option" value="Spring">
                  Spring
                </option>
                <option name="option" value="Fall">
                  Fall
                </option>
                <option name="option" value="Winter">
                  Winter
                </option>
              </select>
            </div>

            {/* <!-- Library --> */}
            <div className={addclass.library}>
              <label>Choose Library:</label>
              <select name="library" id="semester"
                required
                onChange={(event) => setLibraryId(event.target.value)}
                disabled={!courseSemester}
              >
                <option value="" hidden>
                  Choose Library
                </option>
                {libraryList.map((item) => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>))}
              </select>
            </div>

            {/* Template VM */}
            <div className={addclass.templateVm}>
              <label className={addclass.label} htmlFor="templateVM">
                Template VM:
              </label>
              <select
                name="templateVm"
                id={addclass.templateVm}
                required
                onChange={(event) => { setTemplateVm(event.target.value) }}
                disabled={!libraryId}
              >
                <option value="" hidden>
                  Choose a Template
                </option>
                {templateVmList.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <!-- vCenterFolder --> */}
            <div className={addclass.vCenterFolderId}>
              <label>vCenterFolder:</label>
              <select
                id={addclass.vCenterFolderId}
                name="vCenterFolderId"
                required
                onChange={(event) => {
                  setvCenterFolderId(event.target.value);
                }}
              >
                <option value="" hidden>
                  Choose vCenter Folder
                </option>
                {vCenterFolderList.map((item) => (
                  <option key={item.name} value={item.folder}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className={addclass.alert}>
                <label className={addclass.alertLabel}>
                  No Folder For Your Class
                </label>
                <button
                  onClick={togglePopup}
                  type="vCenter Folder Alert Button"
                  className={addclass.alertButton}
                >
                  <i
                    className={addclass.alertIcon}
                    class="fa fa-question-circle fa-lg"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
              {isOpen && (
                <Popup
                  content={
                    <>
                      <div className={addclass.popupbox}>

                        <div className={addclass.box}>

                          <span
                            className={addclass.closeicon}
                            onClick={togglePopup}
                          >
                            x
                          </span>
                          <img
                            className={addclass.logo}
                            src="../../images/LOGO-VIMA.png"
                            alt="logo" />
                          <h3>
                            Follow This Link To a Confluence Article to Create a
                            Vcenter Folder
                          </h3>
                          <a href="https://byui-cit.atlassian.net/wiki/spaces/VSSP/pages/2392332/How+to+set+up+a+VM+template" className={addclass.a}>
                            <button className={addclass.confluence}>Create VCenter Folder</button>
                          </a>
                        </div>
                      </div>
                    </>
                  }
                />
              )}
            </div>
          </div>
          <button
            
            type="button"
            id="submit"
            className={addclass.btnprimary}
            onClick={validateCanvasToken}
          >
            Add
          </button>
        </form>
      </div>

      {isPopupOpen && (
        <SubmissionPopup
          closeHandler={closePopup}
          message={popupMessage}
          againOptionMessage={popupAgainMessage}
          success={success}
        />
      )}
      <Background />
    </div>
  );
}

export default AddClass;
