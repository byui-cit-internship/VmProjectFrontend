import { getApiRoot } from "../signIn_signOut/getApiRoot.js"

const register_tokenID = sessionStorage.getItem("token");
const user_id = sessionStorage.getItem("user_id");
const courseIdInputElm = document.getElementById("courseId");
const canvasTokenInputElm = document.getElementById("canvasToken");
// canvasTokenInputElm.addEventListener("input", validate)

//new option
const submitButton = document.getElementById("submit");
console.log(submitButton);
submitButton.addEventListener("click", validate);

let registerApiUrlroot = getApiRoot()



/***************************************************************
 * This functions calls our API which then calls the canvas API to 
 * verify that the course_id and course_token is a valid token.
 * If it is not, it will clear the fields, which prompts the professors\
 * re-enter those credentials
 * ****************************************** */
function validate(event) {

    let valid = true;

    // this calls our API which then calls the Canvas API to verufy that the course_id and course Token entered
    // by the professor is correct
    axios({
        method: "post",
        url: registerApiUrlroot + "/api/course/professor/checkCanvasToken",
        headers: {
            "Authorization": "Bearer " + register_tokenID,
        },
        data: {
            "canvas_token": canvasTokenInputElm.value,
            "canvas_course_id": courseIdInputElm.value
        }
    })
        .then(response => {
            console.log(response.data)
    //         // if it is valid then we can go ahead and send that data
    //         // to register that class
         getFormData()
        }).catch(function (error) {
          alert("Please type a valid Canvas Token or the class ID");
            console.log(error.message);
            valid = false
            if (valid === false) {
                // window.alert("Warning! Please type a valid Canvas Token or class ID")
                const nameError = document.getElementById("nameError");
                nameError.classList.add("visible");
                canvasTokenInputElm.value = ""
                courseIdInputElm.value = ""
                nameError.setAttribute("aria-hidden", false);
                nameError.setAttribute("aria-invalid", true);
            }
        })
    // console.log(valid)
    
}




/*******************************************
 * This function will collect the Data from the form
 * then it will call the backend API, to register this course
 * the backend api will create or find the relating course and
 * create an enrollment for the professor to that course along wiht a vm
 * *********************************/
const getFormData = () => {
    console.log("here in getformdata func")
  
       
    
        // get form field values
        const name = document.querySelector('#name').value;
        const courseId = document.querySelector('#courseId').value;
        const section = document.querySelector('#section').value;
        const contentLibrary = document.querySelector('#contentLibrary').value;
        const canvasToken = document.querySelector('#canvasToken').value;
        const templateVm = document.querySelector('#vm_dropDown').value;
        const semester = document.querySelector('#semester').value;
        const description = document.querySelector('#description').value;



        // this API call is to send the Form-data to the back end to register the class 
        axios({
            method: "post",
            url: registerApiUrlroot + "/api/enrollment/professor/register/course",
            data: {
                courseName: name,
                course_id: courseId,
                section: section,
                contentLibrary: contentLibrary,
                canvas_token: canvasToken,
                templateVm: vm_dropDown,
                semester: semester,
                description: description,
                // useId amd teacher Id needs to be replaced with the current user ID
                userId: user_id,
                status: "Active",
                teacherId: user_id
            },
            headers: {
                "Authorization": "Bearer " + register_tokenID
            }
        })
            .then(response => {
                console.log(response.data)
                console.log("Here in the send form data to api")
                alert("Your Course was created! ")
                if (confirm("Would you like to add another class?") == true) {
                location.reload()
                }else {
                    window.location.assign("/VMfaculty_dashboard/facultyview.html")
                }
          
            }).catch(function (error) {
                console.log("Here in the error")
                if (error.response.status == 409) {
                    console.log(error.response.status)
                    alert("Class has already been created")
                }
                else {
                    alert("error has occured, check connection")
                    console.log(error.message)
                }

            })
       
}



/*************************************************
 * Func will call the backend API to grab all the 
 * Vm that are available to the professors. It will 
 * then call VMdropDown func which will create the option tags
 * and the become the values for the drop down option
 ******************************** */


const getAllTemplates = () => {
    console.log("here");
    axios({
        method: "get",
        url: `${registerApiUrlroot}/api/vmtable/templates/all`,
        headers: {
            "Authorization": "Bearer " + register_tokenID
        }
    })
        .then(response => {
            console.log(response.data)
            const listOfTemplates = response.data
            console.log(listOfTemplates)
            VmDropDown(listOfTemplates)
        }).catch(function (error) {
            console.log(error.message)
        })
}
getAllTemplates()




/**************************************************
 * This will create the drop down option tag based upon 
 * how many vm images are in the database.
 * ******************************* */
const VmDropDown = (list_of_template) => {
    console.log("Dropdown");
//    console.log(list_of_template);

    const select = document.getElementById("vm_dropDown");

    list_of_template.forEach(element => {
        console.log(element);
        const option = document.createElement("option");
        const txt = document.createTextNode(element.name);
    
         //id, name
        option.setAttribute("value", element.id);
        console.log("list")
        option.appendChild(txt);
        // Add it to the end of default
        select.insertBefore(option, select.lastChild);
       
    })
    
};




