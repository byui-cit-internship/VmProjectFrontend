import { getApiRoot } from "../../signIn_signOut/getApiRoot.js";

const getVmFormData = () => {
    const tokenID = sessionStorage.getItem("token")
    let apiUrl = getApiRoot()
    const vmForm_el = document.getElementById("vmsetUp")

    vmForm_el.addEventListener("submit", function (event) {
        event.preventDefault()

        const formData = new FormData(this)
        console.log(formData.get("CourseName"))

        // Send the form data to the backend API
        axios({
            method: "post",
            url: `${apiUrl}/api/vmtable`,
            headers: {
                "Authorization": "Bearer " + tokenID,
            },
            data: {
                vm_image: formData.get("CourseName")
            }
        })
            .then(response => {
                console.log(response.data)
                alert("Your Virtual Machine template was created")

            }).catch(error => {
                console.log("Here in the error")
                console.log(error)
                alert("Error occured while creating, check connection")
            })


    })

}
getVmFormData()