const tokenID = sessionStorage.getItem("token")

console.log("here")

const getFormData = () => {
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
            url: "https://localhost:5001/api/user/admin/createuser",
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
                alert("Your Virtual Machine template was created")

            }).catch(error => {
                if (error.response.status == 409) {
                    alert("Email already exits with a current user")
                }
                console.log("Here in the error")
                console.log(error.message)
                alert("Error occured while creating, check connection")
            })


    })

}
getFormData()