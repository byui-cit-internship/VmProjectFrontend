
const vmUsertokenID = sessionStorage.getItem("token")
const vmForm_el = document.getElementById("vmsetUp")

const GetVmApiRoot = () => {
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
let vmApiUrlroot = GetVmApiRoot()


const getVmFormData = () => {
    const vmForm_el = document.getElementById("vmsetUp")

    vmForm_el.addEventListener("submit", function (event) {
        event.preventDefault()

        const formData = new FormData(this)
        console.log(formData.get("CourseName"))

        // Send the form data to the backend API
        axios({
            method: "post",
            url: vmApiUrlroot + "/api/vmtable",
            headers: {
                "Authorization": "Bearer " + vmUsertokenID,
            },
            data: {
                vm_image: formData.get("description")
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