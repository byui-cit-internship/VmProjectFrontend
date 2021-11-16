
async function fetchStudentJSON(){

    const postItem = () => {
        axios({
          method: "post",
          url: "https://localhost:5001/api/token/#"+ user_num,
          data: {
            ID: "7987987989789",
            token: id_token,
          },
        }).then((response) => {
          console.log("whatever", response.data);
          user = response.data;

    // console.log("hello");
    let response = {};
    try{
    response = await fetch('https://localhost:5001/api/user/userdetails/1', {
      headers: {
        "Authorization": "Bearer " + "id_token"
      }
    });

    } catch(exception){
        console.log("had error calling api for enrollment: " + exception);
    }

    let student = await response.json();
    let enrollmentList = student.enrollments;
    console.log("this is ", enrollmentList);
    // Get the Course object
    let course = enrollmentList[0].course.courseName;
    console.log("this is course", course)
     // Extract value from table header. 
            var col = [];
            for (var i = 0; i < enrollmentList; i++) {
                for (var key in enrollmentList[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
    
            // Create a table.
            var table = document.createElement("table");
    
            // Create table header row using the extracted headers above.
            var tr = table.insertRow(-1);                   // table row.
    
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");      // table header.
                th.innerHTML = col[i];
                tr.appendChild(th);
            }
    
            // add json data to the table as rows.
            for (var i = 0; i < enrollmentList.length; i++) {
    
                tr = table.insertRow(-1);
    
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = enrollmentList[i][col[j]];
                }
            }
    
            // Now, add the newly created table with json data, to a container.
            var divShowData = document.getElementById('showData');
            divShowData.innerHTML = "";
            divShowData.appendChild(table);
            
        }
        fetchStudentJSON()