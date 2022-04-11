import { getApiRoot } from "../signIn_signOut/getApiRoot.js"

const user_name = sessionStorage.getItem("user_name");
const studentName = document.querySelector(".nameofStudent");
const register_tokenID = sessionStorage.getItem("token");
studentName.innerHTML = user_name;
let enrollment_id = "";

let registerApiUrlroot = getApiRoot();


//get list of courses

const getAllCourses = () => {
  console.log("here");
  axios({
      method: "get",
      url: `${registerApiUrlroot}/api/studentcourse`,
      withCredentials:true
  })
      .then(response => {
          console.log(response.data)
          const listOfCourses = response.data
          console.log(listOfCourses)
          courseDropDown(listOfCourses)
      }).catch(function (error) {
          console.log(error.message)
      })
}
 getAllCourses();

//course dropdown 

const courseDropDown = (list_of_course) => {
  console.log("courses");
//    console.log(list_of_template);

  const select = document.getElementById("course");

  list_of_course.forEach(element => {
      console.log(element);
      const option = document.createElement("option");
      const txt = document.createTextNode(element.course_name);
  
      option.setAttribute("value", element.enrollment_id);
      console.log("list")
      option.appendChild(txt);
      // Add it to the end of default
      select.insertBefore(option, select.lastChild);
     })
  
};

//get list of vm


// const getAllvm = () => {
//     console.log("here");
//     axios({
//         method: "get",
//         url: `${registerApiUrlroot}/api/`,
//         headers: {
//             "Authorization": "Bearer " + register_tokenID
//         }
//     })
//         .then(response => {
//             console.log(response.data)
//             const listOfVm = response.data
//             console.log(listOfVm)
//             vmDropDown(listOfVm)
//         }).catch(function (error) {
//             console.log(error.message)
//         })
//   }
//    getAllvm();

//vm dropdown

// const vmDropDown = (list_of_vm) => {
//     console.log("vm");
//     const select = document.getElementById("templatevm");
  
//     list_of_vm.forEach(element => {
//         console.log(element);
//         const option = document.createElement("option");
//         const txt = document.createTextNode(element.name);
    
//         option.setAttribute("value", element.id);
//         console.log("list")
//         option.appendChild(txt);
//         // Add it to the end of default
//         select.insertBefore(option, select.lastChild);
//        })
//   };



// post the template to vmcenter to create vm

const postTemplate = () =>{
    axios({
        method:"post",
        url: `${registerApiUrlroot}/api/deployvm?enrollment_id=${enrollment_id}`,
        withCredentials:true
    }) .then(response => {
            console.log(response.data);
            alert("Your vm was created!")
      
        }).catch(function (error) {
            console.log("There is an error");
    
         }

        )
    }

    //button to create vm

const vmButton = () => {
    const select = document.querySelector("#course");
    select.addEventListener("change",(event)=>{
    
        let vm_name = document.getElementById("vm_name")
         vm_name.value = event.target.value;
        enrollment_id = event.target.value;

         let submitData = document.getElementById("buttonVm")
         submitData.onclick=postTemplate;
    }    
    )}
    vmButton();

    
