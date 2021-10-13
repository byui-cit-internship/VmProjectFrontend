
// grabbing the course element/option
const select = document.getElementById("course")

arrayOfCources = ["Cit213", "CS 124", "CS230", "Cit 5000"]

arrayOfCources.forEach(element => {

    // creating a new otion for every course
    const option = document.createElement("option")
    const txt = document.createTextNode(element);
    option.setAttribute("value", element)
    option.appendChild(txt);
    // Add it to the end of default
    select.insertBefore(option, select.lastChild);


});
