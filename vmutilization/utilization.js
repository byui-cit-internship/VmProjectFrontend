import { getApiRoot } from "../signIn_signOut/getApiRoot.js";
let registerApiUrlroot = getApiRoot();
const register_tokenID = sessionStorage.getItem("token");


const getAllCourses = () => {
  console.log("here");
  axios({
      method: "get",
      url: `${registerApiUrlroot}/api/studentcourse`,
      headers: {
          "Authorization": "Bearer " + register_tokenID
      }
  })
      .then(response => {
          console.log(response.data)
          const listOfCourses = response.data
          console.log(listOfCourses)
          courseDropDown(listOfCourses)
      }).catch(function (error) {
          console.log(error.message)
      })
}
getAllCourses()

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
    }
// const getAllCourses = () => {
//   console.log("here");
//   axios({
//       method: "get",
//       url: `${registerApiUrlroot}/api/course/professor/semester/${course_semester}`,
//       headers: {
//           "Authorization": "Bearer " + register_tokenID
//       }
//   }) .then((response) => {
//         const list_courses = response.data;
//         console.log("here");


// // let apiUrl = getApiRoot();

// // const facultyPostItem = () => {
 
// //     // let course_semester = document.querySelector("#course_semester").value;
  
// //     console.log(course_semester);
// //     // First API call to get a list of all the courses that the professor has for that semester.
// //     axios({
// //       method: "get",
// //       url: `${apiUrl}/api/course/professor/semester/${course_semester}`,
  
// //       headers: {
// //         // Auth token is needed for every Api call
// //         Authorization: "Bearer " + tokenID,
// //       },
// //     }).then((response) => {
// //       const list_courses = response.data;
// //       console.log("here");
  

//       if (list_courses !== null) {
//         // grabbing the div Table element that will be affected through-out
//         const tableDiv = document.querySelector(".table_onCreate");
//         // define the headers for the table
//         const tableHeaders = ["Student Name", "Email", "Virtual Machine", "Creation Date"];

//          /*******************************************
//        * Create the Table for that Professor will see, that will contain
//        * course and students of that course
//        * *********************** */
//       const createDetailTable = () => {
//         while (tableDiv.firstChild) tableDiv.removeChild(tableDiv.firstChild);

//         // create the table

//         const studentTable = document.createElement("table");
//         studentTable.className = "studentTable";


//         // create the tabel head for that table
//         const studentTableHead = document.createElement("thead");
//         studentTableHead.className = "studentTableHead";

//         // create row for that head
//         const studentTableHeadRow = document.createElement("tr");
//         studentTableHeadRow.className = "studentTableHeadRow";

//         tableHeaders.forEach((header) => {
//           let studentHeader = document.createElement("th");
//           studentHeader.innerText = header;
//           // append that new header to the row of that head
//           studentTableHeadRow.append(studentHeader);
//         });

//         // append row to the table header
//         studentTableHead.append(studentTableHeadRow);
//         // append the head to the table
//         studentTable.append(studentTableHead);

//         const studentTableBody = document.createElement("tbody");
//         studentTableBody.className = "studentTableBody";
//         studentTable.append(studentTableBody);

//         tableDiv.append(studentTable);
//       };

//       ///SemesterDropdown

//       const changeSemester = () => {
//         const select = document.getElementById("course_semester");

//         // this counter is need for value which will be later
//         // used as the event.target.value to identify which course was selcted
//         // we cannot pass the entire object sicne we will get a weird [object Object]
//         // as a value.
//         var counter = 0;
//         list_courses.forEach((element) => {
//           console.log(course);
//           const option = document.createElement("option");
//           const txt = document.createTextNode(element.option);
//           // sending that counter as the value
//           option.setAttribute("value", counter);
//           option.appendChild(txt);
//           // Add it to the end of default
//           select.insertBefore(option, select.lastChild);
//           // counter = counter + 1;
//         });
//       };

//       changeSemester();

//       /*********************************************
//        * When called, this func dynamically create the the table and rows
//        * for all the students and their Vm status for that course
//        * *********************************** */
//       const appendStudent = (name, email,) => {
//         const studentTable = document.querySelector(".studentTable");

//         const studentTableBodyRow = document.createElement("tr");
//         studentTableBodyRow.className = "studentTableBodyRow";
        

//         const studentName = document.createElement("td");
//         studentName.className = "studentName";
//         studentName.innerText = name;
//         // const checkout = document.getElementById("myCheck");
//         // checkout.checked = true;
//         const StudentStatus = document.createElement("td");
//         StudentStatus.className = "StudentStatus";
//         StudentStatus.innerText = status;

//         // Adding an event listener to the status for each student
//         // Will have to learn more about that functionality later
//         StudentStatus.addEventListener("click", () => {
//           createStatusBtn(status);
//         });
//         studentTableBodyRow.append(studentName, StudentStatus);
//         studentTable.append(studentTableBodyRow);
//       };

//       /************************************************
//        * This func will create the drop down with a list of all the
//        * courses that a professor will have for that semster
//        * and will also be used to trigger a table for the student for that class
//        * to be created.
//        * ********************************** */
//       const changeDropDown = () => {
//         const select = document.getElementById("course");

//         // this counter is need for value which will be later
//         // used as the event.target.value to identify which course was selcted
//         // we cannot pass the entire object sicne we will get a weird [object Object]
//         // as a value.
//         var counter = 0;
//         list_courses.forEach((element) => {
//           console.log(course);
//           const option = document.createElement("option");
//           const txt = document.createTextNode(element.course_name);
//           // sending that counter as the value
//           option.setAttribute("value", counter);
//           option.appendChild(txt);
//           // Add it to the end of default
//           select.insertBefore(option, select.lastChild);
//           counter = counter + 1;
//         });
//       };

//       changeDropDown();

//       /*************************************************
//        *This Func will change what the Teacher sees based upon what the
//        * drop down selection was. It will display all the students for that class
//        * ******************* */
//       const changeView = () => {
//         const grabSelect = document.querySelector("#course");
//         grabSelect.addEventListener("change", (event) => {
//           const changeSelector = document.querySelector(".courseSelected");
//           const table = document.querySelector(".studentTable");
//           if (event.target.value == "Default") {
//             changeSelector.textContent = "";
//             if (table !== null) {
//               table.style.display = "none";
//               statusDiv.style.display = "none";
//             }
//           } else {
//             const target_course_name =
//               list_courses[event.target.value].course_name;
//             changeSelector.textContent = `You are in the ${target_course_name} view`;

//             // create the table when we select our dropdown
//             createProfessorTable();

//             const specificCourse = list_courses[event.target.value];
//             // call the api to get the list of students for that slected class from the drop-down

//             const searchCourse = () => {
//               axios({
//                 method: "get",
//                 url: `${apiUrl}/api/course/professor/students/${specificCourse.course_id}/${specificCourse.course_semester}/${specificCourse.course_section}`,
//                 headers: {
//                   Authorization: "Bearer " + tokenID,
//                 },
//               }).then((response) => {
//                 const list_student = response.data;

//                 // when that object comes back, we loop through it to create the create the student table
//                 // populate it with the student and their VM status
//                 list_student.forEach((element) => {
//                   appendStudent(
//                     element.student_name,
//                     element.student_vm_status
//                   );
//                 });
//                 if (table !== null) {
//                   table.style.display = "block";
//                   statusDiv.style.display = "block";
//                 }
//               });
//             };
//             console.log("here in the second api");
//             searchCourse();
//           }
//         });
//       };
//       changeView();

//       // console.log("this is status div", statusDiv);
//       const statusDiv = document.querySelector(".status_btn");

  

//     }
//   });
// };
// getAllCourses();
// // get the main div to place the dynamic table inside

