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
            "canvasToken": canvasTokenInputElm.value
        }
    })
        .then(response => {
           console.log('Success!')

        })

    }

    

    const validateButton = document.getElementById("validate");
    validateButton.addEventListener("click", validate);
    