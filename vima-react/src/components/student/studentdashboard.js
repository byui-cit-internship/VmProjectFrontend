import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Computer from '@mui/icons-material/Computer';
import CloudQueue from '@mui/icons-material/CloudQueue'
import { useNavigate } from 'react-router-dom';
import Background from '../../background';
import studentdashboard from "./studentdashboard.module.css";
import Header from '../../header';
//import React, { useState, useEffect } from 'react';

const iconStyles = {
    color: 'white', fontSize: '35px'
}

// route student course is api/StudentCourse

const StudentDashboard = () => {
  let navigate = useNavigate();
 // const [resourceType, setResourceType] = useState('posts');

  return(
  <div className={studentdashboard.studentdashboard}>
      <div className={studentdashboard.container}>
        <div className={studentdashboard.header} >
        <Header />  
        </div>
      <h1 id={studentdashboard.nameOfStudent}>Hello <span>Student</span></h1>
      <p id={studentdashboard.greeting}>How can we help you today?</p>
        <div className={studentdashboard.createvm}>
          <span className={studentdashboard.material}>
            <AddCircleOutlineIcon studentdashboard={iconStyles} className={studentdashboard.material}/>
          </span>
          <button onClick={() => {navigate("/createvm")}}>Create VM</button>
        </div>
        <div className={studentdashboard.vm_utilization}>
          <span className={studentdashboard.material}>
            <Computer studentdashboard={iconStyles} className={studentdashboard.material}/>
          </span>
          <button onClick={() => {navigate("/myvm")}}>My VMS</button>
        </div>
        <div className={studentdashboard.mynetworks}>
          <span className={studentdashboard.material}>
            <CloudQueue studentdashboard={iconStyles} className={studentdashboard.material}/>
          </span>
          <button onClick={() => {navigate("/mynetworks")}}>My Networks</button>
        </div>
      </div>
      <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
    <Background/>
  </div>
)
}
export default StudentDashboard; 