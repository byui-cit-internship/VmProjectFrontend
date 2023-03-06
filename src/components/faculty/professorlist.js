import Background from "../../background";
import Header from "../../header";
import professorList from "./professorlist.module.css";
import { useNavigate } from "react-router-dom";
import { getApiRoot } from "../../utils/getApiRoot";
import { React, useEffect, useState, useRef } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import ApproveProfessorPopup from "../approveprofessorpop.js";
import LoadingSpinner from "../spinner.js";
import Popup from "./Popup.js";
import Checkbox from '@mui/material/Checkbox';
import { green } from '@mui/material/colors';

// import ReactDOM from 'react-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// const element = <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />

function ProfessorList() {
  const body = document.querySelector("body");
  const urlParams = window.location.href.split("/")[3];

  //*****************************************************************/
  //All useStates and variable for this page
  //******************************************************************/
  let navigate = useNavigate();
  const [professorsList, setProfessorList] = useState([]);
  const [inputText, setInputText] = useState("");
  const [professorApprove, setProfessorApprove] = useState({});
  const [popupMessage, setPopupMessage] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState();
  const [success, setIsSuccess] = useState();
  const [popupAgainMessage, setPopupAgainMessage] = useState();
  const selectElement = useRef();
  const [isLoading, setIsLoading] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [approveCheck, setApproveCheck] = useState(false);

  // Removes styles from the body tag
  // Apply this useEffect on any page you go from this page
  useEffect(() => {
    if (urlParams !== "addprofessor") {
      body.style.height = "unset";
      body.style.display = "unset";
      body.style.justifyContent = "unset";
      body.style.alignItems = "unset";
    }
  });

  //*****************************************************************/
  //Gets all professors and professor user information
  //******************************************************************/
  useEffect(() => {
    const getProfessorInfo = async () => {
      const listResponse = await fetch(getApiRoot() + "/api/user/allProfessors", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      console.log("listResponse; ", listResponse);

      const profList = await listResponse.json();
      console.log("classes; ", profList);
      setProfessorList(profList);
    };
    getProfessorInfo();
  }, []);

  //*****************************************************************/
  //Filtering Professor list when input is given in the search bar
  //******************************************************************/
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const filteredData = professorsList.filter((i) => {
    if (inputText === "") {
      return i;
    } else {
      const fullName = i.firstName + " " + i.lastName;
      return fullName.toLowerCase().includes(inputText);
    }
  });

  //*****************************************************************/
  //Put call to approve professors when a button is clicked
  //******************************************************************/
  useEffect(() => {
    const approveProfessor = async () => {
      togglePopup();
      setIsLoading(true);
      const listResponse = await fetch(getApiRoot() + "/api/user/approve", {
        method: "PUT",
        body: JSON.stringify(professorApprove),
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });
      setIsLoading(false);
      console.log("listResponse; ", listResponse);
      if (listResponse.ok) {
        setPopupMessage("Professor Approved succesfully");
        setPopupAgainMessage("Approve Another Professor");
        setIsSuccess(true);
      } else {
        setPopupMessage("Error approving professor");
        setPopupAgainMessage("Try again");
        setIsSuccess(false);
      }
      setIsPopupOpen(true);
    };
    if (approveCheck) {
      approveProfessor();
    }
  }, [approveCheck]);

  const closePopup = (closeBool) => {
    setIsPopupOpen(closeBool);
    window.location.reload(false);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  //****************************/
  //Returns all JSX
  //****************************/
  return (
    <div className={professorList.professorList}>
      <div className={professorList.container}>
        <Header userType="facultydashboard" />
        {/* <span onClick={() => {navigate("/student")}} id={professorList.backbtn}>&#8592; back</span> */}
        <h1>Professor List</h1>
        <div id={professorList.professorsAndSearch}>
          <div className={professorList.tableHeader}>
            <div className={professorList.searchbar}>
              {/* <FontAwesomeIcon id={professorList.MGlass} icon={faMagnifyingGlass} /> */}
              <input
                onChange={inputHandler}
                id={professorList.search}
                type="text"
                placeholder="Search..."
              />
            </div>
          </div>

          <div className={professorList.table}>
            <table>
              <thead>
                <tr>
                  <th>Users</th>
                  <th>Email</th>
                  <th>Approved</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((professor, index) => (
                  <tr key={professor.userId} style={index%2==0 || index==0? {
                    backgroundColor:'#F0F0F0'}:{}}>
                    <td>
                      {professor.firstName} {professor.lastName}
                    </td>
                    <td>{professor.email}</td>
                    <td>
                      {(() => {
                        if (professor.approveStatus == "approved") {
                          return (
                            <div className={professorList.checkMark}>
                              <Checkbox
                                checked={true}
                                disabled
                                sx={{
                                  color: green[500],
                                  '&.Mui-checked': {
                                    color: green[500],
                                  },
                                }}
                              />
                            </div>
                          );
                        } else {
                          return (
                            <button
                              className={professorList.approveStatus}
                              onMouseEnter={() => setProfessorApprove(professor)}
                              onClick={togglePopup}
                              disabled={isLoading}>
                              Approve Professor
                            </button>
                          );
                        }
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button
          className={professorList.button}
          onClick={() => {
            navigate("/addprofessor");
          }}>
          Add Professor
        </button>
      </div>
      {isPopupOpen && (
        <ApproveProfessorPopup
          closeHandler={closePopup}
          message={popupMessage}
          againOptionMessage={popupAgainMessage}
          success={success}
        />
      )}
      {isLoading && <LoadingSpinner />}

      {isOpen && (
        <Popup
          content={
            <>
              <div className={professorList.popupbox}>
                <div className={professorList.box}>
                  <img className={professorList.logo} src="../../images/LOGO-VIMA.png" alt="logo" />
                  <h2>Are you Sure you want to approve this professor?</h2>
                  <h3 className={professorList.h3}>
                    {professorApprove.firstName} {professorApprove.lastName}:{" "}
                    {professorApprove.email}
                  </h3>
                  <div className={professorList.checkbuttons}>
                    <button
                      className={professorList.confluence}
                      onClick={() => {
                        setApproveCheck(true);
                      }}>
                      Yes
                    </button>
                    <button className={professorList.confluence} onClick={togglePopup}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}

      <Background />
    </div>
  );
}

export default ProfessorList;
