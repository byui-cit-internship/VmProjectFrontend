import {React,useState} from "react";
import Background from "../../background";
import "./addclassdependencies.css";
import addclass from "./addclass.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../header";
import {getApiRoot} from '../../utils/getApiRoot';

function AddClass() {
  let navigate = useNavigate();
  const [canvasToken, setCanvasToken] =useState("");
  const [canvasCourseId, setCanvasCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseSemester, setCourseSemester] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [courseSection, setCourseSection] = useState("");

  const validateCanvasToken = ()=>{
    fetch(
      getApiRoot() + "/api/course/professor/checkCanvasToken",{
      method:'POST',
      credentials:'include',
      withCredentials:true,
      body: JSON.stringify({
          "canvas_token": canvasToken,
          "canvas_course_id": canvasCourseId
      }
      ),
      headers:{
        'content-type':'application/json'
      }
    }
  )
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
            {/* <p class="validation">Required *</p> */}
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
              onChange={(event)=>setCourseName(event.target.value)}
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
              onChange={(event)=>setCanvasToken(event.target.value)}
              />
          </div>
              {/* <!-- Section course --> */}
          <div className={addclass.coursesection}>
            <label className={addclass.label}>Course Section:</label>
            <select name="section" required>
              <option name="option" value="">
                Select a section number
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
              onChange={(event)=>setCanvasCourseId(event.target.value)}
              required
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
