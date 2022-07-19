import React from "react";
import Background from "../../background";
import "./addclassdependencies.css";
import addclass from "./addclass.module.css";
import { useNavigate } from "react-router-dom";
import Header from "../../header";

function AddClass() {
  let navigate = useNavigate();

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
            <label className={addclass.label} for="name">
              Course Name:
            </label>
            <input
              className={addclass.input}
              type="text"
              id={addclass.name}
              name="CourseName"
              placeholder="Enter your class name"
              required
            />
          </div>
          {/* <!--Folders  --> */}
          <div className={addclass.canvastoken}>
            <label className={addclass.label} for="name">
              Canvas Token:
            </label>
            <input
              className={addclass.input}
              type="text"
              id="canvasToken"
              name="canvas_token"
              placeholder="Enter your class token"
              required
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
            <label className={addclass.label} for="name">
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
              required
            />
          </div>
        </div>
        <button type="button" id="submit" className={addclass.btnprimary}>
          Add
        </button>
      </div>
      <Background />
    </div>
  );
}

export default AddClass;
