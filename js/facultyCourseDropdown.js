const userID = sessionStorage.getItem("token")

const postItem = () => {
  // let userID = query()
  console.log(userID)
  axios({
    method: "get",
    url: `https://localhost:5001/api/course/professor/semester/fall`,

    headers: {
      "Authorization": "Bearer " + userID
    }

  }).then((response) => {
    console.log(response.data.firstName);
    const list_courses = response.data;
    console.log("here")
    console.log(list_courses)

    if (list_courses != null) {
      const professor_name_element = document.querySelector("#name0fProfessor");
      console.log("here is professor element", professor_name_element)
      professor_name_element.innerHTML = list_courses[0].course_professor

      const tableDiv = document.querySelector(".table_onCreate");
      console.log("this is main div", tableDiv);

      // define the headers for the table
      const tableHeaders = ["Name", "Status"];

      const createStudentTable = () => {
        while (tableDiv.firstChild) tableDiv.removeChild(tableDiv.firstChild);

        // cretae the table
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

      const appendStudent = (name, status) => {
        const studentTable = document.querySelector(".studentTable");

        const studentTableBodyRow = document.createElement("tr");
        studentTableBodyRow.className = "studentTableBodyRow";

        const element = document.getElementsByClassName("studentTableBodyRow");
        console.log("this is the student element", element);

        const studentName = document.createElement("td");
        studentName.className = "studentName";
        studentName.innerText = name;

        // const studentId = document.createElement('td')
        // studentId.className = "studentId"
        // studentId.innerText = id

        const StudentStatus = document.createElement("td");
        StudentStatus.className = "StudentStatus";
        StudentStatus.innerText = status;
        StudentStatus.addEventListener("click", () => {
          createStatusBtn(status);
        });
        studentTableBodyRow.append(studentName, StudentStatus);

        studentTable.append(studentTableBodyRow);
      };

      // grabbing the course element/option

      const changeDropDown = () => {
        const select = document.getElementById("course");

        var counter = 0;
        list_courses.forEach(element => {

          console.log(course)
          const option = document.createElement("option");
          const txt = document.createTextNode(element.course_name);
          option.setAttribute("value", counter);
          option.appendChild(txt);
          // Add it to the end of default
          select.insertBefore(option, select.lastChild);
          counter = counter + 1
        })
      };

      changeDropDown();

      // Changing the table based on the drop down option
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
            // changeSelector.textContent = `You are in the ${event.target.value} view`;
            const target_course_name = list_courses[event.target.value].course_name
            changeSelector.textContent = `You are in the ${target_course_name} view`;
            // create the tabel when we select our dropdown
            createStudentTable();
            const specificCourse = list_courses[event.target.value]
            console.log('specificCourse')
            console.log(specificCourse)
            // call the api to get the list of students for that class
            const searchCourse = () => {
              axios({
                method: "get",
                url: `https://localhost:5001/api/course/professor/students/${specificCourse.course_id}/${specificCourse.course_semester}/${specificCourse.course_section}`,

                headers: {
                  "Authorization": "Bearer " + userID
                }

              }).then((response) => {
                const list_student = response.data;
                console.log("here in the second api")
                console.log("this is ", list_student)


                list_student.forEach(element => {
                  console.log(element.student_name)
                  console.log(element.student_vm_status)
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



            /***************************************** */

            const listofNames = listOfCourse[event.target.value];
            for (let name in listofNames) {
              const nameOfStudent = listofNames[name];
              appendStudent(nameOfStudent, "Active");
            }
            if (table !== null) {
              table.style.display = "block";
              statusDiv.style.display = "block";
            }
          }
        });
      };
      changeView();

      const statusDiv = document.querySelector(".status_btn");
      // console.log("this is status div", statusDiv);

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

            statusBtn.innerHTML = " Approved Launch Vm";
            statusBtn.onclick = approvedFuncton;
            statusDiv.append(statusBtn);
            break;
        }
      };

    }

  });
};
postItem();
// get the main div to place the dynamic table inside
