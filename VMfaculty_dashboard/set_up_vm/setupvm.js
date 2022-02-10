
import { getApiRoot } from "../../signIn_signOut/getApiRoot.js"

const register_tokenID = sessionStorage.getItem("token");
const user_id = sessionStorage.getItem("user_id");


let apiUrl = getApiRoot();


/*******************************************
 * This function will collect the Data from the form
 * then it will call the vm API to get all the templates
 * that already has created. 
 * *********************************/

const getAllTemplates = () => {
    console.log("here");
    axios({
        method: "GET",
        url: `${apiUrl}/api/vmtable/templates/all`,
        headers: {
            "Authorization": "Bearer " + register_tokenID
        }
    })
        .then(response => {
            // console.log(response.data)
            const listOfTemplates = response.data
            // console.log(listOfVms)
            VmDropDown(listOfTemplates)
        }).catch(function (error) {
            console.log(error.message)
        })
}
getAllTemplates()


/**************************************************
 * This will create the dropdown list
 * ******************************* */

const VmDropDown = (list_of_template) => {
    console.log("Dropdown");
//    console.log(list_of_template);

    const select = document.getElementById("vm_dropDown");

    list_of_template.forEach(element => {
        console.log(element);
        const option = document.createElement("option");
        const txt = document.createTextNode(element.name);
    
         //id, name
        option.setAttribute("value", element.id);
        console.log("list")
        option.appendChild(txt);
        // Add it to the end of default
        select.insertBefore(option, select.lastChild);
       
    })
};


