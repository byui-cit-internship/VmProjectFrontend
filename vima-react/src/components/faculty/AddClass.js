import React from 'react'
import Squares from '../../pages/squares';

function AddClass() {
  return (
    <div>
      <div class="container">
        <h1>Add Class</h1>
        <a href="/VMfaculty_dashboard/facultyview.html" class="back">Back</a>
        <form>
          <div class="column1">
            <span class="validation">Required *</span>
            <label for="name">Course Name:
            </label>
              <input type="text" id="name" name="CourseName" placeholder="Enter your class name" required />
            <label for="name">Canvas Course Id:
            </label>
              <input type="text" id="courseId" name="CourseId" placeholder="Enter your course Id" required />
            {/* <span role="alert" id="nameError" aria-hidden="true">
              Please add a valid CourseID
            </span> */}
            <label>Section:
            </label>
              <select name="section" id="section" required>
                <option name="option" value="">Select a section number</option>
                <option name="option" value="1">1</option>
                <option name="option" value="2">2</option>
                <option name="option" value="3">3</option>
                <option name="option" value="4">4</option>
                <option name="option" value="5">5</option>
              </select>
            <div class="tool-tip">
              <label class="canvasToken"for="canvasToken">Canvas Token: <i class="tool-tip__icon">i</i>
              </label>
                <input type="text" id="canvasToken"  name="canvas_token" placeholder="Enter your class token" required/> 
              <p class="tool-tip__info">
                <span class="info"></span>
                For more information
                <a href="https://confluence.cit362.com/display/IMD/Get+your+Canvas+API+Token">&nbsp;click here!</a>
              </p>
            </div>
            <label>Choose Semester:</label>
            <select name="semester" id="semester" required>
              <option name="option" value="">Default</option>
              <option name="option" value="Summer">Summer</option>
              <option name="option" value="Spring">Spring</option>
              <option name="option" value="Fall">Fall</option>
              <option name="option" value="Winter">Winter</option>
            </select>
            <label>Professor Page Year:
            </label>
              <select name="semester" id="semester" required>
                <option name="option" value="">Default</option>
                <option name="option" value="Summer">2022</option>
                <option name="option" value="Spring">2021</option>
                <option name="option" value="Fall">2020</option>
                <option name="option" value="Winter">2019</option>
              </select>
          </div>
          <div class=" column2">
            <label>Choose a Resource Pool:
            </label>
              <select name="pool"  id="pool" required > 
                <option name="option" value="Default">Default</option>
              </select>
            

            <label>Choose a Folder:
            </label>
              <select name="folder"  id="folder" required > 
                <option name="option" value="Default">Default</option>
              </select>

            <label>Choose a Content Library:
            </label>
              <select name="contentLibrary"  id="contentLibrary" required > 
                <option name="option" value="Default">Default</option>
              </select>
            <label>Choose a template Virtual machine:
            </label>
              <select name="templateVm"  id="templateVm"  required multiple type="checkbox">
                <option name="option" value="Default">Default</option>
              </select>
            <label>Description of Course:
            </label>
              <textarea type="text" id="description" name="description" rows="2" cols="30" placeholder="Describe your course"></textarea>
          </div>
          <button type="button" id="submit" class="save submitBt btn-primary">
            Save
          </button>
        </form>
      </div>
      <Squares />
    </div>
            
  )
}

export default AddClass;