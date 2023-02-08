import createVM from "./createvm.module.css";
import Background from "../../background";
import Header from "../../headerStudent";
// import LaptopIcon from "@mui/icons-material/Laptop";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React, { useState } from "react";
import { getApiRoot } from "../../utils/getApiRoot";

function CreateVM() {
  const [courseList, setCourseList] = useState([]);
  const [enrollment, setEnrollment] = useState({});
  const [templateList, setTemplateList] = useState([]);
  // inside the quotations just for testing and need to be change when the vm template dropdown is done
  const [templateId, setTemplateId] = useState("");
  const [vmInstanceName, setVmInstanceName] = useState("");
  const [vmCreationDate, setVmCreationDate] = useState("");
  const [libraryId, setLibraryId] =useState("");//this will store the library id of the selected course
  // const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(null);

  let navigate = useNavigate();

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
      console.log(courseResponseObject)
      
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

      const templatelistResponse = await fetch(getApiRoot() + `/api/vmtable/templates/all?libraryId=${enrollment.libraryVCenterId}`, methods);
      // console.log(templatelistResponse)
      const templatelistResponseObject = await templatelistResponse.json();
      console.log(templatelistResponseObject)
      setTemplateList(templatelistResponseObject);
    };
    if (enrollment.libraryVCenterId){
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
        enrollment_id: enrollment.enrollmentId,
        vmInstanceName: vmInstanceName,
        vmInstanceCreationDate: vmCreationDate,
        templateId: templateId,
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
        <div className={createVM.main}>
          <h4 className={createVM.lets}>Let's create a VM</h4>
          <div>
            {!loading ? (
              <div className={createVM.body}>
                {/* <!-- course dropdown -->  */}
                <span className={createVM.material}>
                  <LibraryBooksIcon className={createVM.material} />
                </span>
                <p className={createVM.description}>1. Select Section</p>
                <select
                  className="course"
                  id={createVM.course}
                  onChange={(e) => {
                    const course=JSON.parse(e.target.value) 
                    console.log(e.target.value)
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
                  <LibraryBooksIcon className={createVM.material} />
                </span>
                <p className={createVM.description}>2. Select VM Template</p>   
                <select 
                className="template" id={createVM.course}
                onChange={(e) => setTemplateId(e.target.value)}>
                <option value="Default">-  Select -</option>

                {templateList.map((template) => (
                  <option key={template.id} value={template.templateId}>
                    {template.name}
                  </option>
                ))}
                </select>

                {/* <!-- VM Instance Name -->  */}
                <span className={createVM.material}>
                  <LibraryBooksIcon className={createVM.material} />
                </span>
                <p className={createVM.description}>3. Name Your VM</p>
                <input
                  onChange={(e) => setVmInstanceName(e.target.value)}
                  type="text"
                  id={createVM.vmName}
                  placeholder="VM Name"
                />

                {/* <!--Create the VM--> */}
                <span className={createVM.material}>
                  <CheckCircleOutlineIcon className={createVM.material} />
                </span>
                <p className={createVM.description}>4. Create the VM</p>
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
                <p>Please check back to My VM's tab in 5 minutes</p>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </div>
        <script src="https://apis.google.com/js/platform.js?onload=onLoad" async defer></script>
      </div>
      <Background />
    </div>
  );
}
export default CreateVM;
