import { getApiRoot } from "../signIn_signOut/getApiRoot.js";

const addProFormData = () => {
    const apiUrl = getApiRoot()
    const tokenID = sessionStorage.getItem("token")
    const proForm_el = document.getElementById("professorSignup")

    proForm_el.addEventListener("submit", function (event) {
        event.preventDefault()

        const formData = new FormData(this)
        console.log(formData.get("email"))
        console.log(formData.get("firstName"))

        console.log(formData.get("lastName"))

        // Send the form data to the backend API
        axios({
            method: "post",
            url: `${apiUrl}/api/user/admin/createuser`,
            headers: {
                "Authorization": "Bearer " + tokenID,
            },
            data: {
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                email: formData.get("email"),
                usertype: "Professor",
                userAccess: true
            }
        })
            .then(response => {
                console.log(response.data)
                alert("Professor was created")

            }).catch(error => {
                if (error.response.status == 409) {
                    alert("Email already exits with a current user")
                }
                else {
                    console.log("Here in the error")
                    console.log(error.message)
                    alert("Error occured while creating, check connection")
                }

            })
    })

}
addProFormData()