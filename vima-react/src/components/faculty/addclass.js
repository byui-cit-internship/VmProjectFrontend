import { React, useState } from "react";
import Background from "../../background";
import "./addclassdependencies.css";
import addclass from "./addclass.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "../../header";
import { getApiRoot } from '../../utils/getApiRoot';

// import FacultyDashboard from "../../facultydashboard";

function AddClass() {
  const userInfoString = sessionStorage.getItem('userInfo');
  const userInfoObject = JSON.parse(userInfoString);
  const userId = userInfoObject.userId;
  const teacherId = userInfoObject.userId;
  let navigate = useNavigate();
  const [templateVm, setTemplateVm] = useState("");
  const [description, setDescription] = useState("");
  const [canvasToken, setCanvasToken] = useState("");
  const [canvasCourseId, setCanvasCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseSemester, setCourseSemester] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [courseSection, setCourseSection] = useState("");
  const [vCenterFolderId, setvCenterFolderId] = useState("");

  const createCourse = async () => {
    const response = await fetch(
      getApiRoot() + "/api/enrollment/professor/register/course", {
      method: 'POST',
      body: JSON.stringify({

        userId: userId,
        teacherId: teacherId,
        templateVm: [templateVm],
        description: description,
        courseName: courseName,
        courseSection: courseSection,
        courseSemester: courseSemester,
        courseYear: courseYear,
        canvasCourseId: canvasCourseId,
        canvasToken: canvasToken,
        vCenterFolderId: vCenterFolderId,

      }),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    }
    );
    const responseObject = await response.json();
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
  }

  const validateCanvasToken = async () => {
    const tokenResponse = await fetch(
      getApiRoot() + "/api/course/professor/checkCanvasToken", {
      method: 'POST',
      credentials: 'include',
      withCredentials: true,
      body: JSON.stringify({
        "canvas_token": canvasToken,
        "canvas_course_id": canvasCourseId
      }
      ),


      headers: {
        'content-type': 'application/json'
      }
    }
    );

    const canvasValidationObject = await tokenResponse.json();
    if (tokenResponse.status != 200) {
      alert("Canvas Validation failed with the error: " + JSON.stringify(canvasValidationObject.errors))
    }
    else {
      await createCourse();
    }
  }

  return (
    <div className={addclass.addclass}>
      <div className={addclass.container}>
        <div className={addclass.header}>
          <Header />
        </div>
        <div id={addclass.formheader}>
          <span
            onClick={() => {
              navigate("/faculty");
            }}
            id={addclass.backbtn}
          >
            &#8592; back
          </span>
          <h1>Add Class</h1>
        </div>
        <div id={addclass.gridcont}>


          {/* <!-- Course Name--> */}
          <div className={addclass.coursename}>
            <label className={addclass.label} htmlFor="name">
              Course Name:
            </label>
            <input
              className={addclass.input}
              type="text"
              id={addclass.name}
              name="CourseName"
              placeholder="Enter your class name"
              required
              value={courseName}
              onChange={(event) => setCourseName(event.target.value)}
            />
          </div>



          {/* <!-- Template VM --> */}
          <div className={addclass.templateVm}>
            <label className={addclass.label} htmlFor="templateVM">
              Template VM:
            </label>
            <input
              className={addclass.input}
              type="text"
              // id={addclass.templateVm}
              name="TemplateVM"
              placeholder="Enter the template VM"
              required
              value={templateVm}
              onChange={(event) => setTemplateVm(event.target.value)}
            />
          </div>


          {/* <!-- Description --> */}
          <div className={addclass.description}>
            <label description={addclass.label} htmlFor="description">
              Description:
            </label>
            <input
              className={addclass.input}
              type="text"
              id={addclass.description}
              name="Description"
              placeholder="Enter description"
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>


          {/* <!--Folders  --> */}
          <div className={addclass.canvastoken}>
            <label className={addclass.label} htmlFor="name">
              Canvas Token:
            </label>
            <input
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
            <select name="section" required onChange={(event) => {

              console.log("section", event.target.value)

              setCourseSection(event.target.value)
              console.log("courseSection", courseSection)
            }}>
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
            <input
              className={addclass.input}
              type="text"
              id="courseId"
              name="CourseId"
              placeholder="Enter your course Id"
              value={canvasCourseId}
              onChange={(event) => setCanvasCourseId(event.target.value)}
              required
            />
          </div>
          {/* Year */}
          <div className={addclass.year}>
            <label>Year:</label>
            <select name="semester" id={addclass.semester} required onChange={(event) => {

              console.log("Year", event.target.value)
              setCourseYear(event.target.value)
              console.log("courseYear", courseYear)
            }}>
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
              <option name="option" value="">
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

          {/* <!-- vCenterFolderId --> */}
          <div className={addclass.vCenterFolderId}>
            <label className={addclass.label} htmlFor="vCenterFolderId">
              vCenterFolderId:
            </label>
            <input
              className={addclass.input}
              type="text"
              id={addclass.vCenterFolderId}
              name="vCenterFolderId"
              placeholder="Enter the vCenterFolderId"
              required
              value={vCenterFolderId}
              onChange={(event) => setvCenterFolderId(event.target.value)}
            />
          </div>


        </div>
        <button type="button" id="submit" className={addclass.btnprimary} onClick={validateCanvasToken}>
          Add
        </button>
      </div>
      <Background />
    </div>
  );
}

export default AddClass;
