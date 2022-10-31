import createVM from "./createvm.module.css";
import Background from "../../background";
import Header from "../../header";
import LaptopIcon from "@mui/icons-material/Laptop";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React, { useState, useRef } from "react";
import { getApiRoot } from "../../utils/getApiRoot";

function CreateVM() {
  const [courseList, setCourseList] = useState([]);
  const [enrollmentId, setEnrollmentId] = useState("");
  // const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const getCourseList = async () => {
      const methods = {
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        method: "GET",
      };

      const courseResponse = await fetch(
        getApiRoot() + "/api/studentcourse",
        methods
      );
      const courseResponseObject = await courseResponse.json();
      setCourseList(courseResponseObject);
    };
    getCourseList();
  }, []);

  const postVm = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: enrollmentId,
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

  return (
    <div className={createVM.createvm}>
      <div className={createVM.container}>
        <Header userType="student" />
        {/* <span
          onClick={() => {
            navigate("/student");
          }}
          id={createVM.backbtn}
        >
          &#8592; Back
        </span> */}
        <div className={createVM.main}>
          <h4 className={createVM.lets}>Let's create a VM</h4>
          <div>
            {!loading ? (
              <div className={createVM.body}>
                {/* <!-- course dropdown -->  */}
                <span className={createVM.material}>
                  <LibraryBooksIcon className={createVM.material} />
                </span>
                <p className={createVM.description}>1. Select Course</p>
                <select
                  className="course"
                  id={createVM.course}
                  onChange={(e) => setEnrollmentId(e.target.value)}
                >
                  <option value="Default">- Select -</option>
                  {courseList.map((course) => (
                    <option value={course.enrollmentId}>
                      {course.courseName}
                    </option>
                  ))}
                </select>

                {/* template vm dropdown - Not needed for MVP */}
                {/* <span className={createVM.material}><LaptopIcon className={createVM.material} /></span>
          <p className={createVM.description}>2. Select VM</p>
          <select name="templatevm" id={createVM.course}>
            <option value="Default">-  Select -</option>
          </select> */}

                {/* <!--Create the VM--> */}
                <span className={createVM.material}>
                  <CheckCircleOutlineIcon className={createVM.material} />
                </span>
                <p className={createVM.description}>2. Create the VM</p>
                <input id="vm_name" type="hidden" value="Default Vm" />
                <button id={createVM.buttonVm} onClick={postVm}>
                  Create
                </button>
              </div>
            ) : (
              <p></p>
            )}
            {loading ? (
              <div className={createVM.loading}>
                <p>Please wait...</p>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <script
          src="https://apis.google.com/js/platform.js?onload=onLoad"
          async
          defer
        ></script>
      </div>
      <Background />
    </div>
  );
}
export default CreateVM;
