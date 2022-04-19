import { getApiRoot } from "../signIn_signOut/getApiRoot.js";
let registerApiUrlroot = getApiRoot();
const register_tokenID = sessionStorage.getItem("token");
let semester = '';
let section = '';

const getAllCourses = () => {
  console.log("here");
  axios({
      method: "get",
      url: `${registerApiUrlroot}/api/course/professor/${semester}/${section}`,
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
getAllCourses();

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