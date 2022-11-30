import React, { useState, useEffect } from "react";
import Background from "../../background";
import "./addclassdependencies.css";
import addclass from "./addclass.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../header";
import { getApiRoot } from "../../utils/getApiRoot";
import Popup from "./Popup.js";
import SubmissionPopup from "../submissionpop";

function AddClass() {
  //*********Session Storage for name and email data of current user***********/
  const userInfoString = sessionStorage.getItem("userInfo");
  const userInfoObject = JSON.parse(userInfoString);
  const userId = userInfoObject.userId;
  const canvasToken = userInfoObject.canvasToken;

  //*********Variables and React States************/
  useNavigate();
  const [templateVm, setTemplateVm] = useState("");
  const [templateVmList, setTemplateVmList] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [canvasCourseId, setCanvasCourseId] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [courseSemesterList, setCourseSemesterList] = useState([]);
  const [semester, setSemester] = useState([]);
  const [vCenterFolderList, setvCenterFolderList] = useState([]);
  const [vCenterFolder, setvCenterFolder] = useState("");
  const [libraryList, setLibraryList] = useState([]);
  const [canvasCourses, setCanvasCourses] = useState([]);
  const [libraryId, setLibraryId] = useState("");
  const [vmTemplateName, setvmTemplateName] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState();
  const [popupMessage, setPopupMessage] = useState();
  const [popupAgainMessage, setPopupAgainMessage] = useState();
  const [success, setIsSuccess] = useState();
  const [resourcePoolList, setResourcePoolList] = useState([]);
  const [resourcePool, setResourcePool] = useState("");
  const [resourcePoolName, setResourcePoolName] = useState("");
  //*********Creates course by sending all info in body to the B  FF course controller************/
  console.log(resourcePool);
  console.log(resourcePoolName);

  const validateForm = async () => {
    console.log("validate form here");
    let allFieldsValid = true;
    if (
      sectionName === undefined ||
      courseCode === undefined ||
      canvasToken === undefined ||
      semester === undefined ||
      libraryId === undefined ||
      vCenterFolder === undefined ||
      templateVm === undefined ||
      resourcePool === undefined ||
      vmTemplateName === undefined ||
      canvasCourseId === undefined
    ) {
      allFieldsValid = false;
    }
    // if (allFieldsValid) {
    createCourse();
    // } else {
    //   {
    //     setPopupMessage("Error adding the course");
    //     setPopupAgainMessage("Try again");
    //     setIsSuccess(false);
    //     setIsPopupOpen(true);
    //   }
    // }
  };
  const createCourse = async () => {
    console.log(courseCode);
    const options = {
      method: "POST",
      body: JSON.stringify({
        sectionName: sectionName,
        courseCode: courseCode,
        canvas_token: canvasToken,
        section_num: "1" /*Keep this hardcoded */,
        semester: semester,
        libraryId: libraryId,
        folder: vCenterFolder,
        templateVm: [templateVm],
        resource_pool: resourcePool,
        resourcePoolName: resourcePoolName,
        userId: userId,
        vmTemplateName: vmTemplateName,
        canvasCourseId: canvasCourseId
      }),
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    };
    console.log(options.body);
    const response = await fetch(
      getApiRoot() + "/api/enrollment/professor/register/course",
      options
    );
    console.log(response);
  };
  //*************Gets Library ID's and Names****************/
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
          "content-type": "application/json"
        },
        method: "GET"
      };
      const listResponse = await fetch(
        getApiRoot() + `/api/vmtable/templates/all?libraryId=${libraryId}`,
        methods
      );

      const listResponseObject = await listResponse.json();
      setTemplateVmList(listResponseObject);
    };
    if (libraryId) {
      getTemplateVms();
    }
  }, [libraryId]);

  useEffect(() => {
    const resourcePool = async () => {
      const methods = {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      };
      const listResponse = await fetch(getApiRoot() + "/api/deployvm/resource-pool", methods);
      console.log(listResponse);
      const listResponseObject = await listResponse.json();
      setResourcePoolList(listResponseObject);
    };
    resourcePool();
  }, []);

  useEffect(() => {
    const getcourseSemester = async () => {
      const listResponse = await fetch(getApiRoot() + "/api/semester/enrollmentTerms", {
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
  //*************Sets VM Folder when Course Code is set and if no folder, gives link to article on how to create one****************/
  //*************Sets Folder by comparing name of the course code to the name of the folder if it matches, it fills it in****************/
  useEffect(() => {
    const getVmFolderInfo = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };

      const listResponse = await fetch(getApiRoot() + "/api/createvm/folders", methods);

      const listResponseObject = await listResponse.json();
      setvCenterFolderList(listResponseObject);
    };
    getVmFolderInfo();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

  //*************Gets Canvas course info with your canvas token****************/
  useEffect(() => {
    const getCanvasCourseInfo = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };

      const listResponse = await fetch(
        getApiRoot() + "/api/course/professor/canvasDropdown",
        methods
      );
      if (!listResponse.ok) {
        console.log("response", listResponse);
      }
      const listResponseObject = await listResponse.json();
      setCanvasCourses(listResponseObject);
    };
    getCanvasCourseInfo();
  }, []);

  //*************Maps course list string from canvas and sets course description****************/

  /* What happens after selecting course id */
  const updateInputs = (event) => {
    const code = event.target.options[event.target.selectedIndex].dataset.code;
    const id = event.target.options[event.target.selectedIndex].dataset.id;
    const name = event.target.options[event.target.selectedIndex].dataset.name;
    setCourseCode(code);
    setCanvasCourseId(id);
    setSectionName(name);

    setvCenterFolder(code);
  };
  const closePopup = (closeBool) => {
    setCanvasCourseId("");
    setCourseCode("");
    setLibraryId("");
    setIsPopupOpen(closeBool);
  };

  const seperateTemplateName = (item) => {
    console.log(item);
    const thing = JSON.parse(item);
    setvmTemplateName(thing.name);
    setTemplateVm(thing.id);
  };

  const seperateResourcePoolName = (item) => {
    console.log(item);
    const thing = JSON.parse(item);
    setResourcePool(thing.resource_pool);
    setResourcePoolName(thing.name);
  };


  //*****************************************************************************/
  //Return statement with all JSX for this page**********************************/
  //*****************************************************************************/
  return (
    <div>
      <div className={addclass.addclass}>
        <div className={addclass.container}>
          <Header userType="facultydashboard" />
          <h1>Add Class</h1>
          <div className={addclass.form}>
            {/*Course*/}
            <div className={addclass.flex1}>
              <div>
                <label className={addclass.label} htmlFor="name">
                  Course:
                </label>
                <br></br>
                <select className={addclass.select} onChange={(event) => updateInputs(event)}>
                  <option value="Default" data-code="" data-name="" data-id="">
                    -Select-
                  </option>
                  {canvasCourses?.map((course) => (
                    <option
                      data-code={course.course_code}
                      data-name={course.name}
                      data-id={course.id}
                      key={course.id}>
                      {course.course_code} = {course.name}
                    </option>
                  ))}
                </select>
              </div>

              {/*Library*/}
              <div>
                <label className={addclass.label}>Choose Library: </label>
                <br></br>
                <select
                  className={addclass.select}
                  name="library"
                  required
                  onChange={(event) => setLibraryId(event.target.value)}>
                  <option value="" hidden>
                    -Select-
                  </option>
                  {libraryList?.map((item) => (
                    <option key={item.name} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/*Course ID*/}
              <div className={addclass.courseid}>
                <label className={addclass.label}>Canvas Course ID: </label> <br></br>
                <span role="alert" id={addclass.nameError} aria-hidden="true">
                  {/* Please add a valid Course ID */}
                </span>
                <input
                  className={addclass.courseIdInput}
                  readOnly
                  type="text"
                  value={canvasCourseId}></input>
              </div>
              {/*Template VM*/}
              <div>
                <label className={addclass.label}>Template Virtual Machine: </label>
                <br></br>
                <select
                  className={addclass.select}
                  name="templateVm"
                  required
                  onChange={(event) => {
                    seperateTemplateName(event.target.value);
                  }}

                  disabled={!libraryId}>
                  <option value="" hidden>
                    - Select a Template -
                  </option>
                  {templateVmList?.map((item) => (
                    <option key={item.id} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={addclass.flex2}>
              {/*Semester*/}
              <div>
                <label className={addclass.label}>Choose Semester: </label> <br></br>
                <select
                  onChange={(event) => {
                    var obj = JSON.parse(event.target.value);
                    setSemester(obj);
                  }}>
                  <option>- Select -</option>
                  {courseSemesterList?.map((item, i) => (
                    <option key={i} value={JSON.stringify(item)}>
                      {item.semesterTerm} {item.semesterYear}
                    </option>
                  ))}
                </select>
              </div>
              {/*vCenter Folder*/}
              <div>
                <label className={addclass.label}>vCenter Folder:</label>
                <br></br>
                <select
                  className={addclass.select}
                  id={addclass.vCenterFolder}
                  name="vCenterFolder"
                  required
                  onChange={(event) => {
                    setvCenterFolder(event.target.value);
                  }}>
                  <option value="" hidden>
                    Choose a Folder
                  </option>
                  {vCenterFolderList?.map((item) => (
                    <option key={item.name} value={item.folder}>
                      {item.name}
                    </option>
                  ))}
                </select>

                {/*Resource Pool*/}
                <div>
                  <label className={addclass.label}>Resource Pool:</label>
                  <br></br>
                  <select
                    className={addclass.select}
                    name="resourcePool"
                    required

                    onChange={(event) => {
                      seperateResourcePoolName(event.target.value);
                    }}>
                    <option value="" hidden>
                      Choose a Resource Pool
                    </option>
                    {resourcePoolList?.map((item) => (
                      <option key={item.name} value={JSON.stringify(item)}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={addclass.alert}>
                  <label className={addclass.alertLabel}>No folder for your class</label>
                  <button
                    onClick={togglePopup}
                    type="vCenterFolder Alert Button"
                    className={addclass.alertButton}>
                    <i className={addclass.alertIcon} aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              {isOpen && (
                <Popup
                  content={
                    <>
                      <div className={addclass.popupbox}>
                        <div className={addclass.box}>
                          <span className={addclass.closeicon} onClick={togglePopup}>
                            x
                          </span>
                          <img
                            className={addclass.logo}
                            src="../../images/LOGO-VIMA.png"
                            alt="logo"
                          />
                          <h3>
                            Click the button to find an article that will show how to create a
                            vCenter folder.
                          </h3>
                          <a
                            href="https://byui-cit.atlassian.net/wiki/spaces/VSSP/pages/2392332/How+to+set+up+a+VM+template"
                            className={addclass.a}>
                            <button className={addclass.confluence}>Create vCenter Folder</button>
                          </a>
                        </div>
                      </div>
                    </>
                  }
                />
              )}
            </div>
          </div>
          <br></br>
          <button type="button" className={addclass.btnprimary} onClick={validateForm}>
            Add
          </button>
        </div>
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
