
const tokenID = sessionStorage.getItem("token")
const courseIdInputElm = document.getElementById("courseId")
const canvasTokenInputElm = document.getElementById("canvasToken")
canvasTokenInputElm.addEventListener("input", validate)


/***************************************************************
 * This functions calls our API which then calls the canvas API to 
 * verify that the course_id and course_token is a valid token.
 * If it is not, it will clear the fields, which prompts the professors\
 * re-enter those credentials
 * ****************************************** */
function validate(event) {
    event.preventDefault()
    let valid = true;

    // this calls our API which then calls the Canvas API to verufy that the course_id and course Token entered
    // by the professor is correct
    axios({
        method: "post",
        url: "https://localhost:5001/api/course/professor/checkCanvasToken",
        headers: {
            "Authorization": "Bearer " + tokenID,
        },
        data: {
            "canvas_token": canvasTokenInputElm.value,
            "canvas_course_id": courseIdInputElm.value
        }
    })
        .then(response => {
            console.log(response.data)
            // if it is valid then we can go ahead and send that data
            // to register that class
            getFormData()

        }).catch(function (error) {
            console.log("Here in the error")
            console.log(error.message)
            valid = false
            if (valid === false) {
                const nameError = document.getElementById("nameError");
                nameError.classList.add("visible");
                canvasTokenInputElm.value = ""
                courseIdInputElm.value = ""
                nameError.setAttribute("aria-hidden", false);
                nameError.setAttribute("aria-invalid", true);
            }

        })
    console.log(valid)
}

/*******************************************
 * This function will collect the Data from the form
 * then it will call the backend API, to register this course
 * the backend api will create or find the relating course and
 * create an enrollment for the professor to that course along wiht a vm
 * *********************************/
const getFormData = () => {
    console.log("heer in getformdata func")
    const myformElement = document.getElementById("signup")

    // add an eentlistener to the form
    myformElement.addEventListener("submit", function (event) {
        // prevent the page from navigating away
        event.preventDefault()

        // create a formdata object 
        const formData = new FormData(this)
        console.log(formData.get("semester"))
        console.log(formData.get("vm_dropDown"))

        // making sure the form data is accurate
        const courseIdInputElm = document.getElementById("courseId")
        console.log("here goin to call the canvas api")
        console.log(courseIdInputElm.value)
        const canvasTokenInputElm = document.getElementById("canvasToken")

        // this API call is to send the Form-data to the back end to register the class 
        axios({
            method: "post",
            url: "https://localhost:5001/api/enrollment/professor/register/course",
            data: {
                courseName: formData.get("CourseName"),
                course_id: formData.get("CourseId"),
                section_num: formData.get("section_num"),
                canvas_token: formData.get("canvas_token"),
                vmTableID: formData.get("vm_dropDown"),
                semester: formData.get("semester"),
                description: formData.get("description"),
                // useId amd teacher Id needs to be replaced with the current user ID
                userId: "40EB3559-EDB7-4281-35D4-08D9B5DAE12A",
                status: "Active",
                teacherId: "40EB3559-EDB7-4281-35D4-08D9B5DAE12A"
            },
            headers: {
                "Authorization": "Bearer " + tokenID
            }
        })
            .then(response => {
                console.log(response.data)
                console.log("Here in the send form data to api")
                alert("Your Course was created")
            }).catch(function (error) {
                console.log(error.message)

            })
    })

}


/*************************************************
 * Func will call the backend API to grab all the 
 * Vm that are available to the professors. It will 
 * then call VMdropDown func which will create the option tags
 * and the become the values for the drop down option
 * ******************************* */
const getAllVm = () => {
    console.log("here")
    axios({
        method: "get",
        url: "https://localhost:5001/api/vmtable",
        headers: {
            "Authorization": "Bearer " + tokenID
        }
    })
        .then(response => {
            // console.log(response.data)
            const listOfVms = response.data
            // console.log(listOfVms)
            VmDropDown(listOfVms)
        }).catch(function (error) {
            console.log(error.message)
        })
}
getAllVm()


/**************************************************
 * This will create the drop down option tag based upon 
 * how many vm images are in the database.
 * ******************************* */
const VmDropDown = (list_of_vm) => {
    console.log("here in vmDropdown")
    // console.log(list_of_vm)
    const select = document.getElementById("vm_dropDown");

    list_of_vm.forEach(element => {
        console.log(element)
        const option = document.createElement("option");
        const txt = document.createTextNode(element.vm_image);
        option.setAttribute("value", element.vmTableID);
        option.appendChild(txt);
        // Add it to the end of default
        select.insertBefore(option, select.lastChild);

    })
};
