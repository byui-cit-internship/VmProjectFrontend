listOfCourse = {
  "Cit 214": ["Henry", "Mike"],
  "Cit 5000": ["Mike", "jHelm", "Jane"],
  "Cit 678": ["ark", "jon", "Jess", "Gordan"],
  "Cit 100": ["Mac", "Ling", "Pedro"],
};

// get the main div to place the dynamic table inside

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

  for (let course in listOfCourse) {
    // creating a new option for every course
    const option = document.createElement("option");
    const txt = document.createTextNode(course);
    option.setAttribute("value", course);
    option.appendChild(txt);
    // Add it to the end of default
    select.insertBefore(option, select.lastChild);
  }
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
      changeSelector.textContent = `You are in the ${event.target.value} view`;
      // create the tabel when we select our dropdown
      createStudentTable();
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
