

listOfCourse = {
    "Cit 214": ["Henry", "Mike"],
    "Cit 5000": ["Mike", "jHelm", "Jane"],
    "Cit 678": ["ark", "jon", "Jess", "Gordan"],
    "Cit 100": ["Mac", "Ling", "Pedro"]
}

// get the main div to place the dynamic table inside

const tableDiv = document.querySelector(".table_onCreate")
console.log("this is main div", tableDiv)

// define the headers for the table
const tableHeaders = ["Name", "ID", "Status"]

const createStudentTable = () => {

    while (tableDiv.firstChild) tableDiv.removeChild(tableDiv.firstChild)

    // create the table
    const studentTable = document.createElement("table")
    studentTable.className = "studentTable"

    // create the table head for that table
    const studentTableHead = document.createElement("thead")
    studentTableHead.className = "studentTableHead"

    // create row for that head
    const studentTableHeadRow = document.createElement("tr")
    studentTableHeadRow.className = "studentTableHeadRow"


    tableHeaders.forEach(header => {
        let studentHeader = document.createElement("th")
        studentHeader.innerText = header
        // append that new header to the row of that head
        studentTableHeadRow.append(studentHeader)

    });

    // append row to the table header
    studentTableHead.append(studentTableHeadRow)
    // append the head to the table
    studentTable.append(studentTableHead)


    const studentTableBody = document.createElement('tbody')
    studentTableBody.className = "studentTableBody"
    studentTable.append(studentTableBody)

    tableDiv.append(studentTable)


}
createStudentTable()

const appendStudent = (name, id, status) => {

    const studentTable = document.querySelector(".studentTable")

    const studentTableBodyRow = document.createElement('tr')
    studentTableBodyRow.className = "studentTableBodyRow"

    // const element = document.getElementsByClassName("studentTableBodyRow")

    // // Deleting all the previouly created elemtents when switching 
    // // according to views
    // while (element.length > 0) {
    //     element[0].parentNode.removeChild(element[0])
    // }


    const studentName = document.createElement('td')
    studentName.className = "studentName"
    studentName.innerText = name

    const studentId = document.createElement('td')
    studentId.className = "studentId"
    studentId.innerText = id

    const StudentStatus = document.createElement('td')
    StudentStatus.className = "StudentStatus"
    StudentStatus.innerText = status

    studentTableBodyRow.append(studentName, studentId, StudentStatus)

    studentTable.append(studentTableBodyRow)
}


/******************************************************************/
// grabbing the course element/option

const changeDropDown = () => {
    const select = document.getElementById("course")

    for (let course in listOfCourse) {
        // creating a new otion for every course
        const option = document.createElement("option")
        const txt = document.createTextNode(course);
        option.setAttribute("value", course)
        option.appendChild(txt);
        // Add it to the end of default
        select.insertBefore(option, select.lastChild);
        console.log("where", listOfCourse[course][1])

    }
}

changeDropDown()

// Changing the table based on the drop down option
const changeView = () => {

    const grabSelect = document.querySelector('#course')
    console.log(grabSelect)

    grabSelect.addEventListener('change', (event) => {
        const changeSelector = document.querySelector(".courseSelected")
        console.log(event.target.value)

        if (event.target.value == "Default") {
            changeSelector.textContent = ''
        }
        else {
            changeSelector.textContent = `You are in the ${event.target.value} view`;

            const studentTable_2 = document.querySelector('.main_table')
            const studentTablerow = document.createElement("tr")
            studentTablerow.setAttribute("class", "studentTableRow")
            const listofNames = listOfCourse[event.target.value]



            for (let name in listofNames) {
                const nameOfStudent = listofNames[name]
                const element = document.getElementsByClassName("studentTableBodyRow")
                console.log(element)
                // Deleting all the previouly created elemtents when switching 
                // according to views
                // while (element.length > 0) {
                //     element[0].parentNode.removeChild(element[0])
                // }
                appendStudent(nameOfStudent, "1223434", "active")


            }

        }

    })
}
changeView()






