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
  const teacherId = userInfoObject.userId;


  //*********Variables and React States************/
  let navigate = useNavigate();
  const [templateVm, setTemplateVm] = useState("");
  const [templateVmList, setTemplateVmList] = useState([]);
  const [courseCode, setCourseCode] = useState("");
  const [canvasToken, setCanvasToken] = useState("");
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

  //*********Creates course by sending all info in body to the BFF course controller************/
  const createCourse = async () => {
    const response = await fetch(
      getApiRoot() + "/api/enrollment/professor/register/course", {
      method: 'POST',
      body: JSON.stringify({

        userId: userId,
        teacherId: teacherId,
        templateVm: [templateVm],
        courseCode: courseCode,
        courseName: courseName,
        semester: courseSemester,
        courseYear: courseYear,
        canvasCourseId: canvasCourseId,
        canvasToken: canvasToken,
        folder: vCenterFolderId,
        section_num: courseSection,
      }),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }
    );
    const responseObject = await response;
    console.log(JSON.stringify(responseObject));
    console.log("Here we send data from api");
    alert("Your course was created!");
    console.log("Your course was created!");
    if (console.log("Your course was created!") == true) {
      alert("Would you like to add another course");

      // return(
      // <Navigate to='/faculty' element={<FacultyDashboard />}></Navigate>
      // );
    }
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

  function chooseLibrary(n) {
    const obj = Object.name(libraryList).includes(n)
    console.log(obj);
  }

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
      const listResponse = await fetch(getApiRoot() + '/api/vmtable/templates/all?libraryId=8feee841-e798-48a3-9e7d-743411a0f641', methods);

      const listResponseObject = await listResponse.json()
      setTemplateVmList(listResponseObject)
    }
    getTemplateVms();
  }, [])

  function chooseTemplateVm(n) {
    const obj = Object.name(templateVmList).includes(n)
    console.log(obj);
  }


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
      }}).map((folder) => {
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

  function canvasDesc(item) {
    const canvasDescList = canvasCourses.filter(element => {return element.id == item}).map((desc) => {
        return [desc.name]
      });
    console.log(canvasDescList)
    let canvasDescString = "";
    if (canvasDescList.length > 0) {
      canvasDescString = canvasDescList[0][0]
    }
    console.log(canvasDescString)
    setCourseName(canvasDescString);

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
        <div id={addclass.formheader}>
          {/* <span onClick={() => {navigate("/faculty");}} id={addclass.backbtn}>&#8592; back</span> */}
          <h1>Add Class</h1>
        </div>
        <div id={addclass.gridcont}>
          {/* <!-- Course Code--> */}
          <div className={addclass.coursename}>
            <label className={addclass.label} htmlFor="name">
              Course Code:
            </label>
            <input
              className={addclass.input}
              type="text"
              id={addclass.name}
              name="CourseCode"
              placeholder="Enter your course code"
              required
              value={courseCode}
              onChange={(event) => {setCourseCode(event.target.value),
                vmFolder(event.target.value)}}
            />
          </div>

          {/* <!-- Template VM --> */}
          <div className={addclass.templateVm}>
            <label className={addclass.label} htmlFor="templateVM">
              Template VM:
            </label>
            <select name="templateVm" id={addclass.templateVm}
            required
            onChange={(event) => {setTemplateVm(event.target.value)}}>
              <option value="" hidden>
                Choose a Template
              </option>
              {templateVmList.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.name}
                </option>))}
            </select>
          </div>
          {/* <!-- Course Name/Nickname -->*/}

          <div className={addclass.description}>
            <label description={addclass.label} htmlFor="description">
              Course Name:
            </label>
            <select
              className={addclass.input}
              type="text"
              id={addclass.courseCode}
              name="courseName"
              placeholder="Enter Course Name"
              required
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
            />
          </div>

          {/* <!-- Canvas Token  --> */}
          <div className={addclass.canvastoken}>
            <label className={addclass.label} htmlFor="name">
              Canvas Token:
            </label>
            <select
              className={addclass.input}
              type="text"
              id="canvasToken"
              name="canvas_token"
              placeholder="Enter your class token"
              required
              value={canvasToken}
              onChange={(event) => setCanvasToken(event.target.value)}
            />
          </div>
          {/* <!-- Section course --> */}
          <div className={addclass.coursesection}>
            <label className={addclass.label}>Course Section:</label>
            <select
              name="section"
              required
              onChange={(event) => {
                console.log("section", event.target.value);

                setCourseSection(event.target.value);
                console.log("courseSection", courseSection);
              }}
            >
              <option name="option" value="">
                Select a Section Number
              </option>
              <option name="option" value="1">
                1
              </option>
              <option name="option" value="2">
                2
              </option>
              <option name="option" value="3">
                3
              </option>
              <option name="option" value="4">
                4
              </option>
              <option name="option" value="5">
                5
              </option>
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
            <select
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
              required
            />
          </div>
          {/* Year */}
          <div className={addclass.year}>
            <label>Year:</label>
            <select
              name="semester"
              id={addclass.semester}
              required
              onChange={(event) => {
                console.log("Year", event.target.value);
                setCourseYear(event.target.value);
                console.log("courseYear", courseYear);
              }}
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
            <select name="semester" id="semester" required onChange={(event) => {
              console.log("Semester", event.target.value)
              setCourseSemester(event.target.value)
              console.log("Semester", courseSemester)
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
              value={visibleFolderName}/>
          </div>

          {/* Library*/}
          <div className={addclass.library}>
            <label>Choose Library:</label>
            <select name="library" id="semester"
              required
              onChange={(event) => chooseLibrary(event.target.value)}
            >
              <option value="" hidden>
                Choose Library
              </option>
              {libraryList.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.name}
                </option>))}
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
