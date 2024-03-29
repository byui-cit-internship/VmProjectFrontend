import React, { useState, useEffect } from "react";
import Background from "../../background";
import "./addclassdependencies.css";
import addclass from "./addclass.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../header";
import { getApiRoot } from "../../utils/getApiRoot";
import Popup from "./Popup.js";
import SubmissionPopup from "../submissionpop";
import AddClassSkeleton from "./addClassSkeleton";

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
  const [fetchingLibraries, setFetchingLibraries] = useState(false);
  const [addButtonDisabled, setaddButtonDisabled] = useState(true);
  //*********Creates course by sending all info in body to the B  FF course controller************/

  const validateForm = async () => {
    console.log("validate form here");

    let allFieldsValid = true;
    if (
      sectionName.length === 0 ||
      courseCode.length === 0 ||
      canvasToken.length === 0 ||
      semester.length === 0 ||
      libraryId.length === 0 ||
      vCenterFolder.length === 0 ||
      resourcePool.length === 0 ||
      canvasCourseId.length === 0
    ) {
      allFieldsValid = false;
      setaddButtonDisabled(true);
    }
    if (allFieldsValid) {
      createCourse();
    } else {
      {
        setPopupMessage("Error Adding the Course. Missing Information");
        setPopupAgainMessage("Please Try Again");
        setIsSuccess(false);
        setIsPopupOpen(true);
      }
    }
  };
  const createCourse = async () => {
    console.log(courseCode);
    setaddButtonDisabled(true);
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
    if (response.status == 200) {
      console.log(response);
      setPopupMessage("Successfully Added the Course!");
      setPopupAgainMessage("Add New Course");
      setIsSuccess(true);
    } else {
      setPopupMessage("This Course Already Exists");
      setPopupAgainMessage("Please Try Again");
      setIsSuccess(false);
    }
    setIsPopupOpen(true);
  };
  //*************Gets Library ID's and Names****************/
  useEffect(() => {
    setFetchingLibraries(true);

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
      setFetchingLibraries(false);
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

  const separateTemplateName = (item) => {
    console.log(item);
    const thing = JSON.parse(item);
    setvmTemplateName(thing.name);
    setTemplateVm(thing.id);
  };

  const separateResourcePoolName = (item) => {
    console.log(item);
    const thing = JSON.parse(item);
    setResourcePool(thing.resource_pool);
    setResourcePoolName(thing.name);
    setaddButtonDisabled(false);
  };
  return (
    <div>
      <div className={addclass.addclass}>
        <div className={addclass.container}>
          <Header userType="facultydashboard" />
          <div className={addclass.wrapper}>
            <h1>Add New Class</h1>

            <div className={addclass.form}>
              {fetchingLibraries ? (
                <AddClassSkeleton />
              ) : (
                <>
                  <div className={addclass.flex1}>
                    <div className={addclass.singleDiv}>
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
                    <div className={addclass.singleDiv}>
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
                    <div className={addclass.singleDiv}>
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
                    </div>
                  </div>
                  <div className={addclass.flex2}>
                    {/*Semester*/}
                    <div className={addclass.singleDiv}>
                      <label className={addclass.label}>Choose Semester: </label>
                      <br></br>
                      <select
                        className={addclass.select}
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
                    <div className={addclass.singleDiv}>
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
                    </div>

                    {/*Resource Pool*/}
                    <div className={addclass.singleDiv}>
                      <label className={addclass.label}>Resource Pool:</label>
                      <br></br>
                      <select
                        className={addclass.select}
                        name="resourcePool"
                        required
                        onChange={(event) => {
                          separateResourcePoolName(event.target.value);
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
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              disabled={addButtonDisabled}
              className={addclass.btnprimary}
              onClick={validateForm}>
              Add
            </button>
            <div className={addclass.alert}>
              <label className={addclass.alertLabel}>
                <a
                  href="https://byui-cit.atlassian.net/wiki/spaces/VSSP/pages/2392332/How+to+set+up+a+VM+template"
                  className={addclass.a}>
                  No folder for your class?
                </a>
              </label>
            </div>
          </div>
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
