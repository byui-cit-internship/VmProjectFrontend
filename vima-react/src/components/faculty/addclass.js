import React, { useState, useEffect } from "react";
import Background from "../../background";
import "./addclassdependencies.css";
import addclass from "./addclass.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../header";
import { getApiRoot } from "../../utils/getApiRoot";
// import FacultyDashboard from "../../facultydashboard";
import Popup from "./Popup.js";

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
  const [courseName, setCourseName] = useState("");
  const [courseSemester, setCourseSemester] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [vCenterFolderList, setvCenterFolderList] = useState([])
  const [vCenterFolderId, setvCenterFolderId] = useState("");
  const [visibleFolderName, setVisibleFolderName] = useState("");
  const [libraryList, setLibraryList] = useState([]);
  const [canvasCourses, setCanvasCourses] = useState([]);
  const [description, setDescription] = useState()
  const [libraryId, setLibraryId] = useState()

  //*********Creates course by sending all info in body to the BFF course controller************/
  const createCourse = async () => {
    console.log(courseCode)
    const options = {
      method: 'POST',
      body: JSON.stringify({
        canvasCourseId: canvasCourseId, 
        courseName: courseCode, // Passing course code because table is set to varchar(20), so it wont accept long strings...
        description: description, 
        canvasToken: canvasToken,
        section_num: "1", 
        semester: courseSemester, 
        courseYear: courseYear, 
        userId: userId, 
        teacherId: userId, 
        templateVm: [templateVm],
        folder: vCenterFolderId 
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
      if (!listResponse.ok){
        console.log("response", listResponse)
      }
      const listResponseObject = await listResponse.json()
      setCanvasCourses(listResponseObject)
    }
    getCanvasCourseInfo();
  }, []);

  //*************Maps course list string from canvas and sets course description****************/

  // Not needed?
  function canvasDesc(item) {
    const canvasDescList = canvasCourses
      .filter((element) => {
        return element.id == item;
      })
      .map((desc) => {
        return [desc.name];
      });
    console.log(canvasDescList);
    let canvasDescString = "";
    if (canvasDescList.length > 0) {
      canvasDescString = canvasDescList[0][0];
    }
    setDescription(canvasDescString);
  };

  /* What happens after selecting course id */
  const updateInputs = (event) => {
    const code = event.target.options[event.target.selectedIndex].dataset.code
    const id = event.target.options[event.target.selectedIndex].dataset.id
    const name = event.target.options[event.target.selectedIndex].dataset.name
    
    setCourseCode(code); //course code probably not needed
    setCanvasCourseId(id);
    setCourseName(name);

    canvasDesc(event.target.value)
    vmFolder(code)
  }

  //*****************************************************************************/
  //Return statement with all JSX for this page**********************************/
  //*****************************************************************************/
  return (
   <div>
    <div className={addclass.addclass}>
      <div className={addclass.container}>
        <Header userType="faculty" />
        <h1>Add Class</h1>
        <div className={addclass.form}>

          {/*Course*/}
          <div className={addclass.flex1}>
            <div>
              <label className={addclass.label} htmlFor="name">Course:</label><br></br>
                <select className={addclass.select} onChange={event => updateInputs(event)}>
                  <option value="Default" data-code="" data-name="" data-id="">
                    -Select-
                  </option>
                  {canvasCourses.map((course) =>(
                    <option data-code={course.course_code} data-name={course.name} data-id={course.id} value={course}>
                      {course.course_code} = {course.name}
                    </option>
                  ))}
                </select>
            </div>


          {/*Library*/}
          <div>
            <label className={addclass.label}>Choose Library: </label><br></br>
            <select className={addclass.select} name="library" required onChange={(event) => setLibraryId(event.target.value)}
            disabled={!courseSemester}>
              <option value="" hidden>
                -Select-
              </option>
              {libraryList.map((item) =>(
                <option key={item.name} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/*Course ID*/}
          <div className={addclass.courseid}>
            <label className={addclass.label}>Canvas Course ID: </label><br></br>
            <span role="alert" id={addclass.nameError} aria-hidden="true">
              {/* Please add a valid Course ID */}
            </span>
            <input className={addclass.courseIdInput} readOnly type="text" value={canvasCourseId}></input>
          </div>

        {/*Template VM*/}
          <div>
              <label className={addclass.label}>Template Virtual Machine: </label><br></br>
              <select className={addclass.select} name="templateVm" required 
              onChange={(event) => {setTemplateVm(event.target.value)}} disabled={!libraryId}>
                <option value="" hidden>
                  - Select a Template -
                </option>
                {templateVmList.map((item) =>(
                  <option key={item.id} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
          </div>
        </div>

        {/*Year*/}
        <div className={addclass.flex2}>
          <div>
            <label className={addclass.label}>Year: </label><br></br>
            <select className={addclass.select} name="semester" id={addclass.semester} required 
            onChange={(event) =>{setCourseYear(event.target.value)}} disabled={!courseCode}>
              <option>- Select -</option>
            </select>
          </div>

          {/*Semester*/}
          <div>
            <label>Choose Semester: </label><br></br>
            <select className={addclass.select} name="semester" required disabled={!courseYear}
            onChange={(event) => {setCourseSemester(event.target.value)}}>
              <option name="option" value="" hidden>Default</option>
              <option>Season</option>
            </select>
          </div>

          {/*vCenter Folder*/}
          <div>
            <label className={addclass.label}>vCenter Folder:</label><br></br>
            <select className={addclass.select} id={addclass.vCenterFolderId} name="vCenterFolderId" required
            onChange={(event) =>{setvCenterFolderId(event.target.value)}}>
              <option value="" hidden>Choose a Folder</option>
              {vCenterFolderList.map((item) =>(
                <option key={item.name} value={item.folder}>{item.name}</option>))}
            </select>

            <div className={addclass.alert}>
            <label className={addclass.alertLabel}>No folder for your class</label>
            <button onClick={togglePopup} type="vCenterFolder Alert Button" className={addclass.alertButton}>
              <i className={addclass.alertIcon} class="fa fa-question-circle fa-lg" 
              aria-hidden="true"></i>
            </button>
            </div>
          </div>

          {isOpen && (
            <Popup content={
              <>
                <div className={addclass.popupbox}>
                  <div className={addclass.box}>
                    <span className={addclass.closeicon} onClick={togglePopup}>x</span>
                    <img className={addclass.logo} src="../../images/LOGO-VIMA.png" alt="logo"/>
                    <h3>Click the button to find an article that will show how to create a vCenter folder.</h3>
                    <a href="https://byui-cit.atlassian.net/wiki/spaces/VSSP/pages/2392332/How+to+set+up+a+VM+template"
                    className={addclass.a}>
                      <button className={addclass.confluence}>Create vCenter Folder</button>
                    </a>
                  </div>
                </div>
              </>}
              />)}
        </div>
        </div>
        <br></br>
        <button type="button" className={addclass.btnprimary} onClick={validateCanvasToken}>
          Add
        </button>
        </div>
      </div>
      <Background />

   </div>
  );
}

export default AddClass;
