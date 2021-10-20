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

    let jsonObject = JSON.parse(dataJson)
    console.log(jsonObject.courseName)
    // dataJson.forEach(element => {
    //     console.log("this is an element", element)
    // });
    const postItem = () => {
        axios({
            method: "post",
            url: "https://localhost:5001/api/course",
            data: jsonObject
        })
            .then(response => {
                console.log(response.data)
                userType = response.data
            }).catch(function (error) {
                console.log(error.message)
            })
    }
    postItem()
}


// we are using axios to get the data from the backend to the frontend


function myFunction() {
    var tt = document.getElementById("tooltipdemo");
    tt.classList.toggle("show");
}
