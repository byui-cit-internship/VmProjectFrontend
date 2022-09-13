import React from "react";
import Background from "../../background";
import Header from "../../header";

// import background from './background.module.css';

function Utilization() {
    return (
    <div className="container">
      <div className="VMU-header">
          <Header />
        </div>
      <div className="course-select">
    <label htmlFor="course_semester">Choose Semester
    {/*onchange="semester_update()*/}
        <select name="course_semester" id="course_semester">
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
        </select>
     </label>
        
     <label className="chooseCourse" htmlFor="course">Course:
        <select name="course" id="course">
            <option value="Default">Default</option>
            {/*<option value="CIT171">CIT 171</option>
            <option value="CIT270">CIT 270</option>
            <option value="CIT353">CIT 353</option>
            <option value="CIT354">CIT 354</option>
            <option value="CIT470">CIT 470</option>*/}
        </select>
     </label>
      </div>
                <div>
                <h2>Available templates for this Class</h2>
                </div>
                    <div className="button">
                      <button className="btn"></button>
                    </div>
        
        
            <div className="scoreboard">
              <table className="scoreboardTable">
                <thead className="scoreboardtableHead">
                  <tr className="scoreboardtableHeaderRow">
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Virtual Machine</th>
                  <th>Class</th>
                  <th>Creation Date</th>
                  </tr>
                </thead>
              </table>
            </div>
        
            {/*} <div class="courseSelected"></div>
            <div class="table_onCreate"></div>
            <div class="status_btn"></div>
                <div class="form-check">  */}
            
            {/*} <a href="/VMfaculty_dashboard/facultyview.html" class="submitBt btn-primary">Back</a> */}
        
            <div className="area" >
                <ul className="circles">
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
            </div >
            <div>
            <Background />
          </div>
    </div>
    );
}

export default Utilization;