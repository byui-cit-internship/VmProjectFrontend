/***************************************
 * This Api call is run to get a list of courses that this professor
 * is enrolled in for that semster. It then takes those course,
 * creates a drop down menu. Then takes the course_id of each class and calls
 * another API which gives that specific class and a list of all the students
 * for that class. For each student, rows are created in the table and The student name and their
 * Virtual machine status is outputted on those newly created rows
 * ****************** */

// The session token that was stored, this token is used through out every API call

import { getApiRoot } from "../../../signIn_signOut/getApiRoot.js";

const professor_user_name = sessionStorage.getItem("user_name")
const professor_name_element = document.querySelector("#name0fProfessor");
professor_name_element.innerHTML = professor_user_name;
// const tokenID = sessionStorage.getItem("token");

let apiUrl = getApiRoot();