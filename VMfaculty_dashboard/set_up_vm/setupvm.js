
const tokenID = sessionStorage.getItem("token")
const vmForm_el = document.getElementById("vmsetUp")


const getFormData = () => {
    const vmForm_el = document.getElementById("vmsetUp")

    vmForm_el.addEventListener("submit", function (event) {
        event.preventDefault()

        const formData = new FormData(this)
        console.log(formData.get("CourseName"))

        // Send the form data to the backend API
        axios({
            method: "post",
            url: "https://localhost:5001/api/vmtable",
            headers: {
                "Authorization": "Bearer " + tokenID,
            },
            data: {
                vm_image: formData.get("description")
            }
        })
            .then(response => {
                console.log(response.data)

            }).catch(error => {
                console.log("Here in the error")
                console.log(error.message)
            })


    })

}
getFormData()