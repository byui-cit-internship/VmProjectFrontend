import createVM from "./createvm.module.css";
import Background from "../../background";
import Header from "../../headerStudent";
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import LaptopChromebookOutlinedIcon from '@mui/icons-material/LaptopChromebookOutlined';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import { getApiRoot } from "../../utils/getApiRoot";
import SubmissionPopup from "../submissionpop"; //added this NK

function CreateVM() {
  const [courseList, setCourseList] = useState([]);
  const [enrollment, setEnrollment] = useState([]);
  const [templateList, setTemplateList] = useState([]);
  // inside the quotations just for testing and need to be change when the vm template dropdown is done
  const [templateId, setTemplateId] = useState("");
  const [vmInstanceName, setVmInstanceName] = useState("");
  const [vmCreationDate, setVmCreationDate] = useState("");
  const [libraryId, setLibraryId] = useState(""); //this will store the library id of the selected course
  // const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(null);
  //for pop up message when we get an error
  const [isPopupOpen, setIsPopupOpen] = useState();
  const [popupMessage, setPopupMessage] = useState();
  const [popupAgainMessage, setPopupAgainMessage] = useState();
  const [success, setIsSuccess] = useState();

  let navigate = useNavigate();
  //This is to check if the field is filled out before creating VM
  const validateForm = async () => {
    console.log("validate form here");
    let allFieldsValid = true;
    if (
      enrollment === null ||
      enrollment.length === 0 ||
      enrollment === "Default" ||
      courseList === null ||
      courseList.length === 0 ||
      courseList === "Default" ||
      templateId === null ||
      templateId.length === 0 ||
      templateId === "Default" ||
      vmInstanceName === null ||
      vmInstanceName.length === 0
    ) {
      allFieldsValid = false;
    }
    if (allFieldsValid) {
      postVm();
    } else {
      {
        setPopupMessage("Error adding the course");
        setPopupAgainMessage("Try again");
        setIsSuccess(false);
        setIsPopupOpen(true);
      }
    }
  };

  useEffect(() => {
    const getCourseList = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };

      const courseResponse = await fetch(getApiRoot() + "/api/StudentCourse/section", methods);
      const courseResponseObject = await courseResponse.json();
      console.log(courseResponseObject);

      // const arrUniq = [...new Map(courseResponseObject.map((v) => [v.id, v])).values()];
      setCourseList(courseResponseObject);
    };
    getCourseList();
  }, []);

  useEffect(() => {
    const getTemplateList = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        method: "GET"
      };

      const templatelistResponse = await fetch(
        getApiRoot() + `/api/vmtable/templates/all?libraryId=${enrollment.libraryVCenterId}`,
        methods
      );
      // console.log(templatelistResponse)
      const templatelistResponseObject = await templatelistResponse.json();
      console.log(templatelistResponseObject);
      setTemplateList(templatelistResponseObject);
    };
    if (enrollment.libraryVCenterId) {
      getTemplateList();
    }
  }, [enrollment]);

  const postVm = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        enrollmentId: enrollment.userSectionRoleId,
        templateId: templateId,
        vmInstanceName: vmInstanceName,
        vmInstanceCreationDate: vmCreationDate
      })
    };

    const response = await fetch(`${getApiRoot()}/api/deployvm`, options);

    if (response.ok) {
      alert("Virtual machine created");
      navigate("/success");
    } else {
      alert("Failed to create virtual machine");
      setLoading(null);
    }
  };

  //Gets the current date for the creation date of the vm instance
  useEffect(() => {
    var currentDate = new Date();
    const offset = currentDate.getTimezoneOffset();
    currentDate = new Date(currentDate.getTime() - offset * 60 * 1000);
    const creationDate = currentDate.toISOString().split("T")[0];
    setVmCreationDate(creationDate);
  }, []);

  const closePopup = (closeBool) => {
    setVmInstanceName("");
    setIsPopupOpen(closeBool);
  };

  return (
    <div className={createVM.createvm}>
      <div className={createVM.container}>
        <Header userType="studentdashboard" />
        {/* <span
          onClick={() => {
            navigate("/student");
          }}
          id={createVM.backbtn}
        >
          &#8592; Back
        </span> */}
        <h1> Let's Create a VM</h1>
        <div className={createVM.main}>
          <div>
            {!loading ? (
              <div className={createVM.body}>
                {/* <!-- course dropdown -->  */}
                <span className={createVM.material}>
                  <ClassOutlinedIcon className={createVM.material} />
                </span>
                <p className={createVM.description}>1. Select Class</p>
                <select
                  className="course"
                  id={createVM.course}
                  onChange={(e) => {
                    const course = JSON.parse(e.target.value);
                    console.log(e.target.value);
                    setEnrollment(course);

                    // getTemplateList();
                    // setLibraryId(course.libraryVCenterId);
                  }}>
                  <option value="Default">- Select -</option>
                  {courseList.map((course) => (
                    <option key={course.canvasSectionId} value={JSON.stringify(course)}>
                      {course.sectionName}
                    </option>
                  ))}
                </select>

                {/* <!-- VM Template dropdown --> */}
                <span className={createVM.material}>
                  <LaptopChromebookOutlinedIcon className={createVM.material} />
                </span>
                <p className={createVM.description}>2. Select VM Template</p>
                <select
                  className="template"
                  id={createVM.course}
                  onChange={(e) => setTemplateId(e.target.value)}>
                  <option value="Default">- Select -</option>

                  {templateList.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>

                {/* <!-- VM Instance Name -->  */}
                <span className={createVM.material}>
                  <DriveFileRenameOutlineOutlinedIcon className={createVM.material} />
                </span>
                <p className={createVM.description}>3. Name your VM</p>
                <input
                  onChange={(e) => setVmInstanceName(e.target.value)}
                  type="text"
                  id={createVM.vmName}
                  placeholder="VM Name"
                />

                {/* <!--Create the VM--> */}
                {/* <span className={createVM.material}>
                  <CheckCircleOutlineIcon className={createVM.material} />
                </span> */}
                {/* <p className={createVM.description}>4. Create the VM</p> */}
                <input id="vm_name" type="hidden" value="Default Vm" />
                <button id={createVM.buttonVm} onClick={validateForm}>
                  Create
                </button>
              </div>
            ) : (
              <p></p>
            )}
            {loading ? (
              <div className={createVM.loading}>
                <p>Please check back to My VM's tab in 5 minutes</p>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
      </div>

      {isPopupOpen && ( //added this for popup like the add class
        <SubmissionPopup
          closeHandler={closePopup}
          message={popupMessage}
          againOptionMessage={popupAgainMessage}
          success={success}
        />
      )}
      <Background />
    </div>
  );
}
export default CreateVM;
