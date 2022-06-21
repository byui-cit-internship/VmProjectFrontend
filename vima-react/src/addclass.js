import React from 'react'
import Squares from '../../pages/squares';
import './addclassdependencies.css';
import './addclass.css'; 

function AddClass() {
  return (
    <div>
    <div class="container">
    <div id="form-header">
      <span id="back-btn">&#8592; back</span>
      <h1>Add Class</h1>
    </div>
    <div id="grid-cont">
    
    {/* <a href="/VMfaculty_dashboard/facultyview.html" class="back">Back</a> */}
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

          {/* <!--Virtual machine  --> */}
        {/* <label>Choose a Virtual machine:</label>
        <form action="">
        <select name="templateVm"  id="templateVm"  required multiple type="checkbox">
        <option name="option" value="Default">Default</option>
        </select>
        </form> */}


          {/* <!--Semester  --> */}
        {/* <label>Professor Page Year:</label>
        <select name="semester" id="semester" required>
          <option name="option" value="">Default</option>
          <option name="option" value="Summer">2022</option>
          <option name="option" value="Spring">2021</option>
          <option name="option" value="Fall">2020</option>
          <option name="option" value="Winter">2019</option>
        </select> */}
        </div>

        <div class=" column2">
        <label for="name">Canvas Token:</label>
        {/* <!-- Canvas token --> */}
        {/* <div class="tool-tip"> */}
        {/* <label class="canvasToken"for="canvasToken">Canvas Token: <i class="tool-tip__icon">i</i></label> */}
    
          {/* <p class="tool-tip__info"> */}
            {/* <!-- <span class="info">
            </span>For more information<a href="https://confluence.cit362.com/display/IMD/Get+your+Canvas+API+Token">&nbsp;click here!</a></span> --> */}
        {/* </p> */}
      {/* </div> */}
        <input type="text" id="canvasToken"  name="canvas_token" placeholder="Enter your class token" required/> 

{/* <!--Course Id--> */}
<label for="name">Canvas Course ID:</label>
        <span role="alert" id="nameError" aria-hidden="true">
        Please add a valid CourseID
        </span>
        <input type="text" id="courseId" name="CourseId" placeholder="Enter your course Id" required />

        {/* <label>Course Section:</label>
          <select name="section" id="section" required>
            <option name="option" value="">Select a section number</option>
            <option name="option" value="1">1</option>
            <option name="option" value="2">2</option>
            <option name="option" value="3">3</option>
            <option name="option" value="4">4</option>
            <option name="option" value="5">5</option>
          </select> */}

 {/* <!--Resource_Pool  --> */}
 {/* <label>Choose a Resource Pool:</label>
 <select name="pool"  id="pool" required > 
 <option name="option" value="Default">Default</option>
  </select> */}

     {/* <!--Folders  --> */}
     {/* <label>Choose a Folder:</label>
     <select name="folder"  id="folder" required > 
     <option name="option" value="Default">Default</option>
      </select> */}

     {/* <!-- Content Library  --> */}
   {/* <label>Choose a Content Library:</label>
     <select name="contentLibrary"  id="contentLibrary" required > 
     <option name="option" value="Default">Default</option>
      </select> */}

      {/* <!--Semester  --> */}
      {/* <label>Choose Semester:</label>
          <select name="semester" id="semester" required>
            <option name="option" value="">Default</option>
            <option name="option" value="Summer">Summer</option>
            <option name="option" value="Spring">Spring</option>
            <option name="option" value="Fall">Fall</option>
            <option name="option" value="Winter">Winter</option>
          </select> */}

        
        {/* <!--Button to open a modal to add more templates--> */}

        {/* <!-- <button id="open"><i class="material-icons">add_circle</i>Add more templates</button>
        
        <div class="modalForTemplate" id="modalForTemplate">
          <div class="modal-content">
          <span class="closeModal">X</span>
            <h1>Add templates</h1>
            <label>Choose a template Virtual machine:</label>
            <select name="addTemplateVm"  id="addTemplateVm"  required > 
            <option name="option" value="Default">Default</option>
            </select>
            <button id="more"><i class="material-icons">add</i></button>
            <button id="submitAddTemplates">save</button>
            </div>
        </div> --> */}
        

        {/* <!--Description--> */}
        {/* <label>Description of Course:</label>
        <textarea type="text" id="description" name="description" rows="2" cols="30" placeholder="Describe your course"
         ></textarea> */}
        </div>
  
  </div>
      <button type="button" id="submit" class="save submitBt btn-primary">
        Add
      </button>
    </div>
    {/* // <!-- </form> --> */}

  {/* // <!-- </div> --> */}

//  <div class="area" >
{/* //       <ul class="circles">
//               <li></li>
//               <li></li>
//               <li></li>
//               <li></li>
//               <li></li>
//               <li></li>
//               <li></li>
//               <li></li>
//               <li></li>
//               <li></li>
//       </ul> */}
        <Squares />
</div >
</div>
  )
}

export default AddClass;