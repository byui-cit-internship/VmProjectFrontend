import React from "react";
import Background from "../../background";
import Header from "../../header";
import utilization from "./utilization.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import {getApiRoot} from '../../utils/getApiRoot';

// import background from './background.module.css';


let registerApiUrlroot = getApiRoot();
const register_tokenID = sessionStorage.getItem("token");
let semester = '';
let section = '';

//   console.log("here");
//   axios({
//       method: "get",
//       url: `${registerApiUrlroot}/api/course/professor/${semester}/${section}`,
//       headers: {
//           "Authorization": "Bearer " + register_tokenID
//       }
//   })
//       .then(response => {
//           console.log(response.data)
//           const listOfCourses = response.data
//           console.log(listOfCourses)
//           courseDropDown(listOfCourses)
//       }).catch(function (error) {
//           console.log(error.message)
//       })


// getAllCourses();

//course dropdown 

const courseDropDown = (list_of_course) => {
  console.log("courses");
//    console.log(list_of_template);

  const select = document.getElementById("course");

  list_of_course.forEach(element => {
      console.log(element);
      const option = document.createElement("option");
      const txt = document.createTextNode(element.course_name);
  
      option.setAttribute("value", element.id);
      console.log("list")
      option.appendChild(txt);
      // Add it to the end of default
      select.insertBefore(option, select.lastChild);
     })
    };

//table 

const scoreDiv = document.querySelector("div.scoreboard")
const tableHeaders = ["Student Name", "Email", "Virtual Machine", "Class", "Creation Date"];

const createScoreboardTable = () => {
  while (scoreDiv.firstChild) scoreDiv.removeChild(scoreDiv.firstChild)

  let scoreboardTable  = document.createElement('table')
  scoreboardTable.className = "scoreboardTable"

  let  scoreboardTableHead = document.createElement('thead')
  scoreboardTableHead.className = 'scoreboardTableHead'

  let scoreboardTableHeaderRow = document.createElement('tr')
  scoreboardTableHeaderRow.className = 'scoreboardTableHeaderRow'

  
  tableHeaders.forEach(header =>{
    let scoreHeader = document.createElement('th')
    scoreHeader.innerText = header
    scoreboardTableHeaderRow.append(scoreHeader)
  })

  scoreboardTableHead.append(scoreboardTableHeaderRow)
  scoreboardTable.append(scoreboardTableHead)
  
  scoreDiv.append(scoreboardTable)
}


function Utilization() {

    let navigate = useNavigate();

    return (
    <div className={utilization.utilization}>
        <div className={utilization.container}>
        <div className={utilization.header}>
            <Header />
        </div>
        <div id={utilization.formheader}>
          <span
            onClick={() => {
              navigate("/faculty");
            }}
            id={utilization.backbtn}
          >
            &#8592; back
          </span>
          <h1>Class VM Utilization</h1>
        </div>
        <div className={utilization.courseselect}>
    <label htmlFor="course_semester">Semester:
    {/*onchange="semester_update()*/}
        <select name="course_semester" id={utilization.course_semester}>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
        </select>
     </label>
        
     <label className={utilization.choosecourse} htmlFor="course">Course:
        <select name="course" id={utilization.course}>
            <option value="Default">Default</option>
            {/*<option value="CIT171">CIT 171</option>
            <option value="CIT270">CIT 270</option>
            <option value="CIT353">CIT 353</option>
            <option value="CIT354">CIT 354</option>
            <option value="CIT470">CIT 470</option>*/}
        </select>
     </label>

     <label htmlFor="choosesection">Section:
    {/*onchange="semester_update()*/}
        <select name="choosesection" id={utilization.choosesection}>
        <option value="Default">Default</option>
        </select>
     </label>
          </div>
                <div>
                <h2>Available templates for this Class</h2>
                </div>
                    <div className={utilization.button}>
                      <button className={utilization.btn}></button>
                    </div>
        
        
            <div className={utilization.scoreboard}>
              <table className={utilization.scoreboardTable}>
                <thead className={utilization.scoreboardtableHead}>
                  <tr className={utilization.scoreboardtableHeaderRow}>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Virtual Machine</th>
                  <th>Class</th>
                  <th>Creation Date</th>
                  </tr>
                </thead>
              </table>
            </div>
        
            <div className="courseSelected"></div>
            <div className="table_onCreate"></div>
            <div className="status_btn"></div>
                <div class="form-check"></div>
            
            {/*} <a href="/VMfaculty_dashboard/facultyview.html" class="submitBt btn-primary">Back</a> */}
        
            <div className={utilization.area} >
                <ul className={utilization.circles}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                </ul>
            </div>
        </div>
            <div>
                <Background />
            </div>
    </div>
    );
}

export default Utilization;