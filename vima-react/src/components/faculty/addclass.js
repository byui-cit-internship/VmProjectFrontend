import React from 'react'
import Background from '../../background';
import './addclassdependencies.css';
import './addclass.module.css'; 
import { useNavigate } from 'react-router-dom';

function AddClass() {
  let navigate = useNavigate();

  return (
    <>
    <div class="container">
    <div id="form-header">
      <span onClick={() => {navigate("/")}} id="back-btn">&#8592; back</span>
      <h1>Add Class</h1>
    </div>
    <div id="grid-cont">
    
      {/* <!-- Course Name--> */}
        <div class="column1">
          {/* <p class="validation">Required *</p> */}
        <label for="name">Course Name:</label>
        

        <input type="text" id="name" name="CourseName" placeholder="Enter your class name" required />

        {/* <!-- Section course --> */}

        <label>Course Section:</label>
          <select name="section" id="section" required>
            <option name="option" value="">Select a section number</option>
            <option name="option" value="1">1</option>
            <option name="option" value="2">2</option>
            <option name="option" value="3">3</option>
            <option name="option" value="4">4</option>
            <option name="option" value="5">5</option>
          </select>

         
        </div>

        <div class=" column2">
        <label for="name">Canvas Token:</label>
        <input type="text" id="canvasToken"  name="canvas_token" placeholder="Enter your class token" required/> 

{/* <!--Course Id--> */}
<label for="name">Canvas Course ID:</label>
        <span role="alert" id="nameError" aria-hidden="true">
        Please add a valid CourseID
        </span>
        <input type="text" id="courseId" name="CourseId" placeholder="Enter your course Id" required />

        </div>
  
  </div>
      <button type="button" id="submit" class="save submitBt btn-primary">
        Add
      </button>
    </div>


        <Background />
</>
  )
}

export default AddClass;