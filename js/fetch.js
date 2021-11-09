
async function fetchStudentJSON(){
    // console.log("hello");
    let response = {};
    try{
    response = await fetch('https://localhost:5001/api/user/userdetails/1', {
      headers: {
        "Authorization": "Bearer " + "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3YzcyNjE5ZDA5MzVhMjkwYzQxYzNmMDEwMTY3MTM4Njg1ZjdlNTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTA0Mzc0NzMxMzM2MS0wcm01ZWJ0ZjJ0cmpmazZlcWdnNWl2YXM4dWJzYW43di5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjEwNDM3NDczMTMzNjEtMHJtNWVidGYydHJqZms2ZXFnZzVpdmFzOHVic2FuN3YuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ2NzI3MDc4NTY2MDIzNTkyMDUiLCJlbWFpbCI6InRub2xhc2NvNTRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiI0ZGZScHJ5VDRBbU1BSWoxQ3BvcFhRIiwibmFtZSI6IlRhbW15IE5vbGFzY28iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2l6aHc1WVpPalBhVTBwVjY3V0dILTFRV2h3Q2dCNXliUFFxUDlRQUE9czk2LWMiLCJnaXZlbl9uYW1lIjoiVGFtbXkiLCJmYW1pbHlfbmFtZSI6Ik5vbGFzY28iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTYzNjM5NDUwMywiZXhwIjoxNjM2Mzk4MTAzLCJqdGkiOiI1ZGFlNzRmMGQzODU3NDZlMDA2ZTliZGUyNzU5NjRjM2ZiNzYyMjQ0In0.jNcMb5eTatsIO2lTCNLnuU4Xc-R2MY1ByQAR2MfIB80y26ZvCkrFEd2vvUZoABhP_v_LcmmM2YEEKcYr-UWQ-aAy1ZeX5yvoFqCe8aLTnusfu68huhKn_ZS52v08XmuMMBW3Wr872Zb94nVC3_7oz_i40an8iLR0NUnYOvrHWXq6-K8UMl6Gh2WvsqQTd1S1YMyc7xFaNnZzhunIPQDXRjnfw5hnyZDFNBBFCng0aUBvXoU7Nnnc1iTatJdT7Z98ftuF0yUHkgzh0eRJzdy7mW4zqvneyiYJ6bx0UHLJ7lYrpgxjJnCdYfP4_mUm_sWDkCp-utHVZ5pnORMo8VxloA"
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
            for (var i = 0; i < enrollmentList.enrollments; i++) {
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
            
            document.getElementById('msg').innerHTML = '<br />You can later <a href="https://www.encodedna.com/javascript/dynamically-add-remove-rows-to-html-table-using-javascript-and-save-data.htm" target="_blank" style="color:#1464f4;text-decoration:none;">get all the data from table and save it in a database.</a>';
            
        }
        fetchStudentJSON()