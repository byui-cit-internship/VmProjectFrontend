// this is the data that well chnage in the future with the backend api
listOfCourse = {
    "Cit 214": ["Henry", "Mike"],
    "Cit 5000": ["Mike", "jHelm", "Jane"],
    "Cit 678": ["ark", "jon", "Jess", "Gordan"],
    "Cit 100": ["Mac", "Ling", "Pedro"]
}


const changetable = () => {
    const columnHeaders = ["Name", " ID", "Status"]

    // getting the div to place ht table into
    const tableDiv = document.querySelector(".table_onCreate")

    // create the table
    const studentTable = document.createElement('table')
    studentTable.className = "main_table"

    // create the thread
    const studentThread = document.createElement('thead')
    studentThread.className = "main_thead"

    // create the tr
    const studentTr = document.createElement('tr')
    studentTr.className = "studentTr"

    // create the cells/coloumn for the table
    columnHeaders.forEach(header => {
        const studentHeader = document.createElement("th")
        studentHeader.innerText = header
        studentTr.append(studentHeader)
    });

    studentThread.append(studentTr)
    studentTable.append(studentThread)

    const studentTableBody = document.createElement('tbody')
    studentTable.append(studentTableBody)
    tableDiv.append(studentTable)

}
changetable()


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

            // Going through the list of names and create th tags for all of them
            for (let name in listofNames) {
                const element = document.getElementsByClassName("name")

                // Deleting all the previouly created elemtents when switching 
                // according to views
                while (element.length > 0) {
                    element[0].parentNode.removeChild(element[0])
                }
                const nameRow = document.createElement('td')
                nameRow.setAttribute("class", "name")
                nameRow.innerHTML = listofNames[name]
                studentTablerow.append(nameRow)

                const IdRow = document.createElement('td')
                IdRow.setAttribute("class", "name")
                IdRow.innerHTML = "123456"
                studentTablerow.append(IdRow)

                const ClassRow = document.createElement('td')
                ClassRow.setAttribute("class", "name")
                // let nameOfClass = event.value.target
                ClassRow.innerHTML = "Active"
                studentTablerow.append(ClassRow)
            }
            studentTable_2.append(studentTablerow)
        }

    })
}
changeView()






