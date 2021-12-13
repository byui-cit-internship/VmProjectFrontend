
const addprofessortokenID = sessionStorage.getItem("token")
const addProGetApiRoot = () => {
    const hashTag = window.location.hostname;
    console.log('Hash tag ' + hashTag);
    let apiRoot = hashTag === 'localhost'
        ? 'https://localhost:5001'
        : 'http://dev-vm-api.citwdd.net';

    if (window.location.hostname.includes('dev-vm')) {
        apiRoot = 'http://dev-vm-api.citwdd.net';
    } else if (window.location.hostname.includes('test-vm')) {
        apiRoot = 'http://test-vm-api.citwdd.net';
    } else if (window.location.hostname.includes('prod-vm')) {
        apiRoot = 'http://prod-vm-api.citwdd.net';
    }
    return apiRoot
}
let addProApiUrlroot = addProGetApiRoot()

console.log("here")

const addProFormData = () => {
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
            url: addProApiUrlroot + "/api/user/admin/createuser",
            headers: {
                "Authorization": "Bearer " + addprofessortokenID,
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