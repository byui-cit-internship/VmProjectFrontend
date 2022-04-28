// /***********************************************  
 
// Code not needed

// This code is fetching the API and creating a table with the data in the API
// I left it here because I think it will be helpful for the future interns to 
// see all the code that we created and they can use in future scenarios

// ***********************************************/

// async function fetchStudentJSON(){

//     // let usertoken = ""; //initialize to empty string
//     // let email = "";
    
//     // let hash = location.hash; //will include the #
//     // let hashparts = hash.split("#");
//     // if (hashparts.length < 2) {
//     //   window.location = "/"; //there is no login token on the url, so they must not have logged in yet, we will help redirect them here
//     // } else {
    
//     // usertoken = hashparts[1]; 
//     // // console.log(usertoken)
//     //   // validateToken(); //check if token is expired, if not display the email, if expired send to login
//     // }
    
//     let response = {};
//     try{
//     response = await fetch('https://localhost:5001/api/studentcourse/', {
//       headers: {
//         "Authorization": "Bearer " + usertoken
//       }
//     });

//     } catch(exception){
//         console.log("had error calling api for enrollment: " + exception);
//     }

//     let student = await response.json();
//     let enrollmentList = data;
//     console.log("this is ", data);
//     // Get the Course object
//     // let course = enrollmentList[0].course.courseName;
//     console.log("this is course", course)
//      // Extract value from table header. 
//             var col = [];
//             for (var i = 0; i < enrollmentList; i++) {
//                 console.log(enrollmentList)
//                 for (var key in enrollmentList[i]) {
//                     if (col.indexOf(key) === -1) {
//                         col.push(key);
//                     }
//                 }
//             }
    
//             // Create a table.
//             var table = document.createElement("table");
    
//             // Create table header row using the extracted headers above.
//             var tr = table.insertRow(-1);                   // table row.
    
//             for (var i = 0; i < col.length; i++) {
//                 var th = document.createElement("th");      // table header.
//                 th.innerHTML = col[i];
//                 tr.appendChild(th);
//             }
    
//             // add json data to the table as rows.
//             for (var i = 0; i < enrollmentList.length; i++) {
    
//                 tr = table.insertRow(-1);
    
//                 for (var j = 0; j < col.length; j++) {
//                     var tabCell = tr.insertCell(-1);
//                     tabCell.innerHTML = enrollmentList[i][col[j]];
//                 }
//             }
    
//             // Now, add the newly created table with json data, to a container.
//             var divShowData = document.getElementById('showData');
//             divShowData.innerHTML = "";
//             divShowData.appendChild(table);
            
//         }
//         fetchStudentJSON()