import { React, useState, useEffect } from "react";
import Background from "../../background";
import "./addclassdependencies.css";
import addclass from "./addclass.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../header";
import { getApiRoot } from "../../utils/getApiRoot";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
// import FacultyDashboard from "../../facultydashboard";

function AddClass() {

  //*********Session Storage for name and email data of current user***********/
  const userInfoString = sessionStorage.getItem('userInfo');
  const userInfoObject = JSON.parse(userInfoString);
  const userId = userInfoObject.userId;
  // const teacherId = userInfoObject.userId;
  const canvasToken = userInfoObject.canvasToken

  //*********Variables and React States************/
  let navigate = useNavigate();
  const [templateVm, setTemplateVm] = useState("");
  const [templateVmList, setTemplateVmList] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  // const [canvasToken, setCanvasToken] = useState("");
  const [canvasCourseId, setCanvasCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseSemester, setCourseSemester] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [courseSection, setCourseSection] = useState("");
  const [vCenterFolderList, setvCenterFolderList] = useState([])
  const [vCenterFolderId, setvCenterFolderId] = useState("");
  const [visibleFolderName, setVisibleFolderName] = useState("")
  const [libraryList, setLibraryList] = useState([]);
  const [libraryName, setLibraryName] = useState("");
  const [canvasCourses, setCanvasCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState()
  const [libraryId, setLibraryId] = useState()

  //*********Creates course by sending all info in body to the BFF course controller************/
  const createCourse = async () => {

    const options = {
      method: 'POST',
      body: JSON.stringify({
        canvasCourseId: canvasCourseId,
        courseName: courseName,
        description: description,
        canvasToken: canvasToken,
        section_num: "1", // Section will not be needed
        semester: courseSemester,
        courseYear: courseYear,
        userId: userId,
        teacherId: userId,
        templateVm: [templateVm],
        folder: vCenterFolderId
      }),
      // body: JSON.stringify({

      //   userId: userId,
      //   teacherId: teacherId,
      //   templateVm: [templateVm],
      //   courseCode: code,
      //   courseName: name,
      //   semester: courseSemester,
      //   courseYear: courseYear,
      //   canvasCourseId: canvasCourseId,
      //   canvasToken: canvasToken,
      //   folder: vCenterFolderId,
      //   section_num: courseSection,
      // }),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }

    const response = await fetch(
      getApiRoot() + "/api/enrollment/professor/register/course", options);
    if (response.ok) {
      alert("Course was added");
    } else {
      alert("Error adding course.")
    }
    console.log(response)
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

    const canvasValidationObject = await tokenResponse.json();
    if (tokenResponse.status != 200) {
      alert(
        "Canvas Validation failed with the error: " +
        JSON.stringify(canvasValidationObject.errors)
      );
    } else {
      await createCourse();
    }
  };

  //*************Gets Library ID's and Names****************/
  useEffect(() => {
    const getLibraries = async () => {

      const methods =
      {
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        method: 'GET',
      }

      const listResponse = await fetch(getApiRoot() + '/api/createvm/libraries', methods);

      const listResponseObject = await listResponse.json()
      setLibraryList(listResponseObject)
    }
    getLibraries();
  }, [])

  // Gets Template Id's and Names

  useEffect(() => {
    const getTemplateVms = async () => {

      const methods =
      {
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        method: 'GET',
      }
      //PUT THIS TEMPORARY URL IN JUST SO I CAN SEE A COUPLE TEMPLATES
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

      const methods =
      {
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        method: 'GET',
      }

      const listResponse = await fetch(getApiRoot() + '/api/createvm/folders', methods);

      const listResponseObject = await listResponse.json()
      setvCenterFolderList(listResponseObject)
    }
    getVmFolderInfo();
  }, [])

  function vmFolder(item) {
    const newItem = item.replace(/\D/g, '');
    const folderList = vCenterFolderList.filter(element => {
      if (element.name.replace(/\D/g, '') == newItem) {
        return [element.name, element.folder]
      }
    }).map((folder) => {
      return [folder.name, folder.folder]
    });
    let folderString = "";
    let folderId = "";
    if (folderList.length > 0) {
      folderString = folderList[0][0]
      folderId = folderList[0][1]
      if (/\d/.test(folderString) == true) {
        setvCenterFolderId(folderId);
        setVisibleFolderName(folderString);
      } else {
        const errorMsg = "No Folder For Course"
        setVisibleFolderName(errorMsg)
      }
    }

  }


  //*************Gets Canvas course info with your canvas token****************/
  useEffect(() => {
    const getCanvasCourseInfo = async () => {

      const methods =
      {
        credentials: 'include',
        headers: {
          'content-type': 'application/json'
        },
        method: 'GET',
      }

      const listResponse = await fetch(getApiRoot() + '/api/course/professor/canvasDropdown', methods);

      const listResponseObject = await listResponse.json()
      setCanvasCourses(listResponseObject)
    }
    getCanvasCourseInfo();
  }, [])

  //*************Maps course list string from canvas and sets course description****************/

  // Not needed?
  function canvasDesc(item) {
    const canvasDescList = canvasCourses.filter(element => { return element.id == item }).map((desc) => {
      return [desc.name]
    });
    console.log(canvasDescList)
    let canvasDescString = "";
    if (canvasDescList.length > 0) {
      canvasDescString = canvasDescList[0][0]
    }
    setDescription(canvasDescString);
  };

  /* What happens after selecting course id */
  const updateInputs = (event) => {
    const code = event.target.options[event.target.selectedIndex].dataset.code
    const id = event.target.options[event.target.selectedIndex].dataset.id
    const name = event.target.options[event.target.selectedIndex].dataset.name

    setCourseCode(code);
    setCanvasCourseId(id);
    setCourseName(name);

    canvasDesc(event.target.value)
    vmFolder(code)
  }

  //*****************************************************************************/
  //Return statement with all JSX for this page**********************************/
  //*****************************************************************************/
  return (
    <div className={addclass.addclass}>
      <div className={addclass.container}>
        <div className={addclass.header}>
          <Header userType="faculty" />
        </div>
        <div id={addclass.formheader}>
          {/* <span onClick={() => {navigate("/faculty");}} id={addclass.backbtn}>&#8592; back</span> */}
          <h1>Add Class</h1>
        </div>
        <div id={addclass.gridcont}>
          {/* <!-- Course Code--> */}
          <div className={addclass.coursename}>
            <label className={addclass.label} htmlFor="name">
              Course:
              <select
                onChange={event => updateInputs(event)
                  // vmFolder(event.target.value),
                }>
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
            // Not needed?
            // onChange={(event) => {
            //     canvasDesc(event.target.value)
            // }}
            ></input>
            {/* <select
              className={addclass.input}
              type="text"
              id="courseId"
              name="CourseId"
              placeholder="Enter your course Id"
              value={canvasCourseId}
              onChange={(event) => {
                setCanvasCourseId(event.target.value),
                  canvasDesc(event.target.value)
              }}
              readOnly
            /> */}
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
                </option>))}
            </select>
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
          {/* <!-- vCenterFolder --> */}
          <div className={addclass.vCenterFolderId}>
            <label className={addclass.label} htmlFor="vCenterFolderId">
              vCenterFolder:
            </label>
            <FontAwesomeIcon icon="fa-solid fa-question" />
            <input
              className={addclass.input}
              type="text"
              id={addclass.vCenterFolderId}
              name="vCenterFolderId"
              required
              readOnly
              value={visibleFolderName} />
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
        </div>
        <button
          type="button"
          id="submit"
          className={addclass.btnprimary}
          onClick={validateCanvasToken}
        >
          Add
        </button>
      </div>
      <Background />
    </div>
  );
}

export default AddClass;
