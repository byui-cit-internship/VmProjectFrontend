
/***************************************
   * This Api call is run to get a list of courses that this professor 
   * is enrolled in for that semster. It then takes those course, 
   * creates a drop down menu. Then takes the course_id of each class and calls
   * another API which gives that specific class and a list of all the students 
   * for that class. For each student, rows are created in the table and The student name and their 
   * Virtual machine status is outputted on those newly created rows
   * ****************** */

// The session token that was stored, this token is used through out every API call

const tokenID = sessionStorage.getItem("token")
const user_name = sessionStorage.getItem("user_name")

const postItem = () => {
  var course_semester = "Fall";
  // First API call to get a list of all the courses that the professor has for that semester.
  axios({
    method: "get",
    url: `https://localhost:5001/api/course/professor/semester/${course_semester}`,

    headers: {
      // Auth token is needed for every Api call
      "Authorization": "Bearer " + tokenID
    }

  }).then((response) => {
    console.log(response.data.firstName);
    const list_courses = response.data;
    console.log("here")
    console.log(list_courses)

    if (list_courses !== null) {

      const professor_name_element = document.querySelector("#name0fProfessor");
      professor_name_element.innerHTML = user_name

      // grabbing the div Table element that will be affected through-out
      const tableDiv = document.querySelector(".table_onCreate");
      console.log("this is main div", tableDiv);

      // define the headers for the table
      const tableHeaders = ["Name", "Status"];


      /*******************************************
       * Create the Table for that Professor will see, that will contain
       * course and students of that course
       * *********************** */
      const createProfessorTable = () => {
        while (tableDiv.firstChild) tableDiv.removeChild(tableDiv.firstChild);

        // create the table
        const studentTable = document.createElement("table");
        studentTable.className = "studentTable";

        // create the tabel head for that table
        const studentTableHead = document.createElement("thead");
        studentTableHead.className = "studentTableHead";

        // create row for that head
        const studentTableHeadRow = document.createElement("tr");
        studentTableHeadRow.className = "studentTableHeadRow";

        tableHeaders.forEach((header) => {
          let studentHeader = document.createElement("th");
          studentHeader.innerText = header;
          // append that new header to the row of that head
          studentTableHeadRow.append(studentHeader);
        });

        // append row to the table header
        studentTableHead.append(studentTableHeadRow);
        // append the head to the table
        studentTable.append(studentTableHead);

        const studentTableBody = document.createElement("tbody");
        studentTableBody.className = "studentTableBody";
        studentTable.append(studentTableBody);

        tableDiv.append(studentTable);
      };


      /*********************************************
       * When called, this func dynamically create the the table and rows 
       * for all the students and their Vm status for that course
       * *********************************** */
      const appendStudent = (name, status) => {
        const studentTable = document.querySelector(".studentTable");

        const studentTableBodyRow = document.createElement("tr");
        studentTableBodyRow.className = "studentTableBodyRow";

        const element = document.getElementsByClassName("studentTableBodyRow");
        console.log("this is the student element", element);

        const studentName = document.createElement("td");
        studentName.className = "studentName";
        studentName.innerText = name;
        const StudentStatus = document.createElement("td");
        StudentStatus.className = "StudentStatus";
        StudentStatus.innerText = status;

        // Adding an event listener to the status for each student
        // Will have to learn more about that functionality later
        StudentStatus.addEventListener("click", () => {
          createStatusBtn(status);
        });
        studentTableBodyRow.append(studentName, StudentStatus);
        studentTable.append(studentTableBodyRow);
      };


      /************************************************
       * This func will create the drop down with a list of all the 
       * courses that a professor will have for that semster
       * and will also be used to trigger a table for the student for that class 
       * to be created.
       * ********************************** */
      const changeDropDown = () => {
        const select = document.getElementById("course");

        // this counter is need for value which will be later
        // used as the event.target.value to identify which course was selcted
        // we cannot pass the entire object sicne we will get a weird [object Object]
        // as a value.
        var counter = 0;
        list_courses.forEach(element => {
          console.log(course)
          const option = document.createElement("option");
          const txt = document.createTextNode(element.course_name);
          // sending that counter as the value
          option.setAttribute("value", counter);
          option.appendChild(txt);
          // Add it to the end of default
          select.insertBefore(option, select.lastChild);
          counter = counter + 1
        })
      };

      changeDropDown();


      /*************************************************
       *This Func will change what the Teacher sees based upon what the 
       * drop down selection was. It will display all the students for that class
       * ******************* */
      const changeView = () => {
        const grabSelect = document.querySelector("#course");
        grabSelect.addEventListener("change", (event) => {
          const changeSelector = document.querySelector(".courseSelected");
          const table = document.querySelector(".studentTable");
          if (event.target.value == "Default") {
            changeSelector.textContent = "";
            if (table !== null) {
              table.style.display = "none";
              statusDiv.style.display = "none";
            }
          } else {
            const target_course_name = list_courses[event.target.value].course_name
            changeSelector.textContent = `You are in the ${target_course_name} view`;

            // create the tabel when we select our dropdown
            createProfessorTable();

            const specificCourse = list_courses[event.target.value]
            // call the api to get the list of students for that slected class from the drop-down
            const searchCourse = () => {
              axios({
                method: "get",
                url: `https://localhost:5001/api/course/professor/students/${specificCourse.course_id}/${specificCourse.course_semester}/${specificCourse.course_section}`,
                headers: {
                  "Authorization": "Bearer " + tokenID
                },

              }).then((response) => {
                const list_student = response.data;

                // when that object comes back, we loop through it to create the create the student table
                // populate it with the student and their VM status
                list_student.forEach(element => {
                  appendStudent(element.student_name, element.student_vm_status);
                });
                if (table !== null) {
                  table.style.display = "block";
                  statusDiv.style.display = "block";
                }
              })
            }
            console.log("here in the second api")
            searchCourse();
          }
        });
      };
      changeView();


      // console.log("this is status div", statusDiv);
      const statusDiv = document.querySelector(".status_btn");

      /*************************************************
       * This func will let the professor alter or play with the Vm status of the students
       * it should let the Professor, chnage the status, view the Vm instance etc.
       * For now this is not implemented
       * ************************** */
      const createStatusBtn = (status) => {
        while (statusDiv.firstChild) statusDiv.removeChild(statusDiv.firstChild);

        const statusBtn = document.createElement("button");
        statusBtn.classList.add("btn-primary", "submitBt");

        switch (status) {
          case "Active":
            const accessFunction = () => {
              alert("You just clicked Access VM.");
            };

            statusBtn.innerHTML = "Access VM";
            statusBtn.onclick = accessFunction;
            statusDiv.append(statusBtn);
            break;
          case "InActive":
            const activeFunction = () => {
              alert("You just clicked Access VM.");
            };
            statusBtn.innerHTML = "Activate VM";
            statusBtn.onclick = activeFunction;
            statusDiv.append(statusBtn);
            break;
          case "Pending":
            const denyBtn = document.createElement("button");
            const activateFunction = () => {
              alert("You just clicked Access VM.");
            };
            const denyFunction = () => {
              alert("You just clicked Deny request.");
            };

            statusBtn.innerHTML = "Activate VM";
            denyBtn.innerHTML = "Deny request";

            // statusBtn.setAttribute("onClick", pendingFunction)
            statusBtn.onclick = activateFunction;
            denyBtn.onclick = denyFunction;

            statusDiv.append(statusBtn, denyBtn);
            break;

          case "Approved":
            const approvedFuncton = () => {
              alert("You have just cliked the Approved Function");
            };

            // statusBtn.innerHTML = " Approved Launch Vm";
            // statusBtn.onclick = approvedFuncton;
            statusDiv.append(statusBtn);
            break;
        }
      };
    }

  });
};
postItem();
// get the main div to place the dynamic table inside
