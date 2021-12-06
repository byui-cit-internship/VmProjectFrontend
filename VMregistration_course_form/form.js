
const tokenID = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzNDFhYmM0MDkyYjZmYzAzOGU0MDNjOTEwMjJkZDNlNDQ1MzliNTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjA2MzU1NDkxNzUyLXBmN21kcTZnMjR0Y3NycHYxcTYxdG9jbXZ1dnU5MnIzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjA2MzU1NDkxNzUyLXBmN21kcTZnMjR0Y3NycHYxcTYxdG9jbXZ1dnU5MnIzLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA2MjYwNzIwODM4MDA4ODM2MjcwIiwiZW1haWwiOiJsZW9uYXJpbmVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJUSnZuYWR2VVRDcFB2YTdpR0lnYV9RIiwibmFtZSI6Ikxlb24gTmFyaW5lIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdqdDF2SmIwQ3ZjT0dRaS1Ia094cG1LcTYwdjJtZ2xIV0pNZHpCc0pRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ikxlb24iLCJmYW1pbHlfbmFtZSI6Ik5hcmluZSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjM4NTcxMDc5LCJleHAiOjE2Mzg1NzQ2NzksImp0aSI6ImU0OGVhYjVhM2MzYzg4ZTc5NzQ5MDY3YzEzNjdlMzU1OGYwMjIzYjkifQ.KwQGMM0mxtNrJw3DH29SO4FEZpUb6scveQXOojincxbLr6BiaTlJQjunFgxocMJWIZ__KhrSDWub4_G0jztwzsXPrVJh-EPhfOtjl_9tAVJndaxSk134AaujjtvhIdVMFj2CyptelgaMwY0DIpFSvsdFtAG-OhNoYCkRjZ83hVMA6v44OyoG3rW9f0t-EG7Jbokg1cSroz34Or_zsEH7zgwSceDoIj7LgMlmrWLvWu32Wabbte47i18_AAtt0uRZ8JqFBkxsm18v830V6VvSOBq6Szxg9u8di1CaS0Q9gg11SeyhT1qO7vgbY-paberzGK9qSpNpIKUB8QDlTVQqMw"

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
                userType = response.data

            }).catch(function (error) {
                console.log(error.message)
            })
    })

}
getFormData()


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
