

const userID = sessionStorage.getItem("token")

const postItem = () => {
  // let userID = query()
  // console.log(userID)
  axios({
    method: "get",
    url: `https://localhost:5001/api/studentcourse`,

    headers: {
      "Authorization": "Bearer " + userID
    }

  }).then((response) => {
    // console.log(response.data.firstName);
    const list_student_courses = response.data;
    // console.log("here")
    // console.log(list_student_courses)
    const studentName = document.querySelector(".nameofStudent");
    if (list_student_courses != null) {
      studentName.innerHTML = list_student_courses[0].student_name
      /***********************CREATE TABLE************************************************** */
      // get the main div to place the dynamic table inside

      const tableDiv = document.querySelector(".table_onCreate");
      // console.log("this is main div", tableDiv);

      // define the headers for the table
      const tableHeaders = ["Status"];

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

      /****************************APPEND********************************************** */
      const appendStudent = (status) => {
        const studentTable = document.querySelector(".studentTable");

        const studentTableBodyRow = document.createElement("tr");
        studentTableBodyRow.className = "studentTableBodyRow";

        const element = document.getElementsByClassName("studentTableBodyRow");
        // console.log("this is the student element", element);

        const StudentStatus = document.createElement("td");
        StudentStatus.className = "StudentStatus";
        StudentStatus.innerText = status;

        studentTableBodyRow.append(StudentStatus);

        studentTable.append(studentTableBodyRow);
      };

      /********************************CREATE BTN UPON STATUS*********************************************/
      // get the main div to place the dynamic table inside

      const statusDiv = document.querySelector(".status_btn");
      // console.log("this is status div", statusDiv);

      const createStatusBtn = (status) => {
        while (statusDiv.firstChild) statusDiv.removeChild(statusDiv.firstChild);

        const statusBtn = document.createElement("button");
        statusBtn.classList.add("btn-primary", "submitBt");

        switch (status) {
          case "Active":
            const activeFunction = () => {
              alert("You just clicked the Active button");
            };

            statusBtn.innerHTML = "Launch Vm";
            statusBtn.onclick = activeFunction;
            statusDiv.append(statusBtn);
            break;
          case "InActive":
            const inActiveFunction = () => {
              axios({
                method: "get",
                url: "https://localhost:5001/api/user/sendemail/1234",
              }).then((response) => {
                var message = response.data;
                alert(message);
              });
            };

            statusBtn.innerHTML = "Send Request";
            statusBtn.onclick = inActiveFunction;
            statusDiv.append(statusBtn);
            break;
          case "Pending":
            const pendingFunction = () => {
              alert("You just clicked the pending button");
            };

            statusBtn.innerHTML = "Waiting on Professor Approval ....";
            // statusBtn.setAttribute("onClick", pendingFunction)
            statusBtn.onclick = pendingFunction;
            statusDiv.append(statusBtn);
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

      /************************************grabbing the course element/option****************************/

      const changeDropDown = () => {
        const select = document.getElementById("course");

        var counter = 0;
        list_student_courses.forEach(element => {

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

      /***************************CHANGE UPON SELECT************************************************* */
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
            const target_course_name = list_student_courses[event.target.value].course_name
            changeSelector.textContent = `You are in the ${target_course_name} view`;
            console.log("here in target")
            // create the table when we select our dropdown and display the satus of that class
            createStudentTable();
            const specificClassSelect = list_student_courses[event.target.value];
            appendStudent(specificClassSelect.course_status);
            createStatusBtn(specificClassSelect.course_status);
            if (table !== null) {
              table.style.display = "block";
              statusDiv.style.display = "block";
            }
          }
        });
      };
      changeView();

      console.log("Your are in the student view");

    }

  });
};
postItem();

