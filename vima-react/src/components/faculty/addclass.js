import React from 'react';
import Background from '../../background';
import './addclassdependencies.css';
import style from './addclass.module.css'; 
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DnsIcon from '@mui/icons-material/Dns';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';

function AddClass() {
  let navigate = useNavigate();

  return (
    <>
    <div className={style.container}>
      <div className={style.header}>
        <img className={style.logo} src="/images/LOGO-VIMA.png" alt="logo"/>
        <div className={style.professorgrid}>
        <span className={style.materialicons}>
            <PersonIcon sx={{fontSize: '2rem', paddingLeft: "10px"}} />
        </span>
        <p id={style.welcome}>Welcome Professor |</p>

        <button className={style.signOut} onClick={() => {navigate("/")}}>Sign Out</button>
        </div>
    </div>
    <div id={style.formheader}>
      <span onClick={() => {navigate("/")}} id={style.backbtn}>&#8592; back</span>
      <h1>Add Class</h1>
    </div>
    <div id={style.gridcont}>
    
      {/* <!-- Course Name--> */}
        <div className={style.column1}>
          {/* <p class="validation">Required *</p> */}
        <label className={style.label} for="name">Course Name:</label>
        

        <input className={style.input} type="text" id={style.name} name="CourseName" placeholder="Enter your class name" required />

        {/* <!-- Section course --> */}

        <label className={style.label}>Course Section:</label>
          <select name="section" id={style.section} required>
            <option name="option" value="">Select a section number</option>
            <option name="option" value="1">1</option>
            <option name="option" value="2">2</option>
            <option name="option" value="3">3</option>
            <option name="option" value="4">4</option>
            <option name="option" value="5">5</option>
          </select>

             {/* <!--Folders  --> */}
     <label className={style.label}>Choose a Folder:</label>
     <select name="folder"  id="folder" required > 
     <option name="option" value="Default">Default</option>
      </select>
        </div>

        <div className={style.column2}>
        <label className={style.label} for="name">Canvas Token:</label>
        <input className={style.input} type="text" id="canvasToken"  name="canvas_token" placeholder="Enter your class token" required/> 

{/* <!--Course Id--> */}
<label className={style.label} for="name">Canvas Course ID:</label>
        <span role="alert" id="nameError" aria-hidden="true">
        {/* Please add a valid CourseID */}
        </span>
        <input className={style.input} type="text" id="courseId" name="CourseId" placeholder="Enter your course Id" required />

      {/* <!-- Content Library  --> */}
   <label className={style.label}>Choose a Content Library:</label>
     <select name="contentLibrary"  id="contentLibrary" required > 
     <option name="option" value="Default">Default</option>
      </select>
        </div>
  


        
  </div>

      <button type="button" id="submit" className={style.btnprimary}>
        Add
      </button>
    </div>


        <Background />
</>
  )
}

export default AddClass;