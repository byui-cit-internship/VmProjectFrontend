// import { useEffect } from "react";
// import Squares from "../../pages/squares";
// import axios from "axios";
// import { getApiRoot } from "../signIn_signOut/getApiRoot.js";

// function Utilization() {
//     useEffect(() => {
//       axios({
//       method: "get",
//       url: `${registerApiUrlroot}/api/course/professor/${semester}/${section}`,
//       headers: {
//           "Authorization": "Bearer " + register_tokenID
//       }
//   })
//     }, [])

//     return (
//         <div class="container">
//       <div class="VMU-header">
//         <a href="/VMfaculty_dashboard/facultyview.html" class="back"><i style="font-size:24px" class="fa">&#xf177;</i> Back</a>
//         <h1>Class VM utilization</h1>
//       </div>
//       <div class="course-select">
//     <label for="course_semester">Choose Semester
//         {/* <!-- onchange="semester_update() --> */}
//           <select name="course_semester" id="course_semester">
//             <option value="Winter">Winter</option>
//             <option value="Spring">Spring</option>
//             <option value="Summer">Summer</option>
//             <option value="Fall">Fall</option>
//           </select>
//         </label>

//     <label class="chooseCourse" for="course">Course:
//       <select name="course" id="course">
//         <option value="Default">Default</option>
//           {listOfOptions.map(option => {
//             <option value={option.id}>{option.course_name}</option>
//           }}
//         </select>
//     </label>

        
//         </div>
//         <div>
//         <h2>Available templates for this Class</h2>
//         </div>
//             <div class="button">
//               <button class="btn"></button>
//             </div>


//     <div class="scoreboard" style="display:block;">
//       <table class="scoreboardTable">
//         <thead class="scoreboardtableHead">
//           <tr class="scoreboardtableHeaderRow">
//           <th>Student Name</th>
//           <th>Email</th>
//           <th>Virtual Machine</th>
//           <th>Class</th>
//           <th>Creation Date</th>
//           </tr>
//         </thead>
//       </table>
//     </div>

//     {/* <!-- <div class="courseSelected"></div>
//     <div class="table_onCreate"></div>
//     <div class="status_btn"></div>
//     <div class="form-check">  --> */}
    
//     {/* <!-- <a href="/VMfaculty_dashboard/facultyview.html" class="submitBt btn-primary">Back</a> --> */}

//     <Squares />

//     </div>
//     )
// }

// export default Utilization;
