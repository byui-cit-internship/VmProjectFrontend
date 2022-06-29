import React from 'react';
import Background from '../../background';
import './addclassdependencies.css';
import addclass from './addclass.module.css'; 
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DnsIcon from '@mui/icons-material/Dns';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

function AddClass() {
  let navigate = useNavigate();

  return (
    <div className={addclass.addclass}>
    <div className={addclass.container}>
      <div className={addclass.header}>
        <img className={addclass.logo} src="/images/LOGO-VIMA.png" alt="logo"/>
        <div className={addclass.professorgrid}>
        <span className={addclass.materialicons}>
            <PersonIcon sx={{fontSize: '2rem', paddingLeft: "10px"}} />
        </span>
        <p id={addclass.welcome}>Welcome Professor |</p>

        <button className={addclass.signOut}>Sign Out</button>
        </div>
    </div>
    <div id={addclass.formheader}>
      <span onClick={() => {navigate("/")}} id={addclass.backbtn}>&#8592; back</span>
      <h1>Add Class</h1>
    </div>
    <div id={addclass.gridcont}>
    
      {/* <!-- Course Name--> */}
        <div className={addclass.column1}>
          {/* <p class="validation">Required *</p> */}
        <label className={addclass.label} for="name">Course Name:</label>
        

        <input className={addclass.input} type="text" id={addclass.name} name="CourseName" placeholder="Enter your class name" required />

        {/* <!-- Section course --> */}

        <label className={addclass.label}>Course Section:</label>
          <select name="section" id={addclass.section} required>
            <option name="option" value="">Select a section number</option>
            <option name="option" value="1">1</option>
            <option name="option" value="2">2</option>
            <option name="option" value="3">3</option>
            <option name="option" value="4">4</option>
            <option name="option" value="5">5</option>
          </select>

             {/* <!--Folders  --> */}
     <label className={addclass.label}>Choose a Folder:</label>
     <select name="folder"  id="folder" required > 
     <option name="option" value="Default">Default</option>
      </select>
        </div>

        <div className={addclass.column2}>
        <label className={addclass.label} for="name">Canvas Token:</label>
        <input className={addclass.input} type="text" id="canvasToken"  name="canvas_token" placeholder="Enter your class token" required/> 

{/* <!--Course Id--> */}
<label className={addclass.label} for="name">Canvas Course ID:</label>
        <span role="alert" id="nameError" aria-hidden="true">
        {/* Please add a valid CourseID */}
        </span>
        <input className={addclass.input} type="text" id="courseId" name="CourseId" placeholder="Enter your course Id" required />

      {/* <!-- Content Library  --> */}
   <label className={addclass.label}>Choose a Content Library:</label>
     <select name="contentLibrary"  id="contentLibrary" required > 
     <option name="option" value="Default">Default</option>
      </select>
        </div>
  


        
  </div>

      <button type="button" id="submit" className={addclass.btnprimary}>
        Add
      </button>
    </div>


        <Background />
</div>
  )
}

export default AddClass;