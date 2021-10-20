document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signup").addEventListener("submit", handleForm)

})

const handleForm = (event) => {
    //  this helps so that the page does not go to the appointed page without saving the data
    event.preventDefault();
    let myForm = event.target;
    let dataForm = new FormData(myForm);

    // saving and converting the Formdata to ajson object to send to the backend
    let object = {};
    dataForm.forEach((value, key) => {
        object[key] = value;
    })
    let dataJson = JSON.stringify(object)

    // console.log(dataJson)
}

// we are using axios to get the data from the backend to the frontend
const postData = () => {
    axios({
        method: "post",
        url: "https://localhost:5001/api/course",
        data: dataJson
        // data: {
        //     // ID: "7987987989789",
        //     className: "",
        //     section: "",
        //     description: "",
        //     classToken: "",
        //     semester: "",
        // }
    })
        .then(response => {
            console.log(response.data)
            dataJson = response.data
            
postData()
}
        )}

function myFunction() {
    var tt = document.getElementById("tooltipdemo");
    tt.classList.toggle("show");
}