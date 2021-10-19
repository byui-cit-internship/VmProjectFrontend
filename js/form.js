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

    console.log(dataJson)

}