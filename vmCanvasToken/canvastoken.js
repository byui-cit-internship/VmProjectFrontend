import { getApiRoot } from "../signIn_signOut/getApiRoot.js";

function validate(event) {
    let valid = true;

    const canvasTokenInputElm = document.getElementById("canvasToken");

    // this calls our API which then calls the Canvas API to verufy that the course_id and course Token entered
    // by the professor is correct
    axios({
        method: "put",
        url: getApiRoot() + "/api/user",
        withCredentials:true,
        data: {
            "userId" : sessionStorage.getItem("user_id"),
            "canvasToken": canvasTokenInputElm.value,
            "firstName" : sessionStorage.getItem("firstName"),
            "lastName"  : sessionStorage.getItem("lastName"),
            "email" : sessionStorage.getItem("email"),
            "isAdmin" : sessionStorage.getItem("isAdmin")
        }
    })
        .then(response => {
           console.log('Success!')

        })

    }

    

    const validateButton = document.getElementById("validate");
    validateButton.addEventListener("click", validate);
    