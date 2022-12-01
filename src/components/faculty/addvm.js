import { React, useState, useEffect } from "react";
import Background from "../../background";
import Header from "../../header";
import addvm from "./addvm.module.css";
import Apple from "@mui/icons-material/Apple";
import { getApiRoot } from "../../utils/getApiRoot";
import { library } from "@fortawesome/fontawesome-svg-core";
import TemplateMetadata from "./templateMetadata";

function AddVm() {
  const [libraryId, setLibraryId] = useState();
  const [library, setLibrary] = useState();
  const [templates, setTemplates] = useState();
  const [template, setTemplate] = useState();

  const options = {
    method: "Get",
    credentials: "include",
    headers: { "content-type": "application/json" }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("sectionId");

  const postTemplate = async () => { };

  const radioHandler = async () => { };

  useEffect(() => {
    const fetchSection = async () => {
      const response = await fetch(
        getApiRoot() + `/api/course/getSectionById/${courseId}`,
        options
      );
      if (response.ok) {
        const section = await response.json();
        setLibraryId(section.libraryVCenterId);
      } else {
        console.log(response);
      }
    };
    fetchSection();
  }, []);

  useEffect(() => {
    const fetchLibrary = async () => {
      const response = await fetch(
        getApiRoot() + `/api/createvm/libraryById/${libraryId}`,
        options
      );
      if (response.ok) {
        const fetchedData = await response.json();
        setLibrary(fetchedData);
      } else {
        console.log(response);
      }
    };

    const fetchTemplates = async () => {
      const response = await fetch(getApiRoot() + `/api/createvm/templates/${libraryId}`, options);
      if (response.ok) {
        const fetchedData = await response.json();
        console.log("fetched templates: ", fetchedData);
        setTemplates(fetchedData);
      }
    };

    if (libraryId) {
      fetchLibrary();
      fetchTemplates();
    }
  }, [libraryId]);

  const handleSubmission = (template) => {
    console.log("template: ", template);
  };
  //console.log("chose template: ", JSON.parse(template));
  console.log("templates: ", templates);
  return (
    <div className={addvm.addvm}>
      <div className={addvm.container}>
        <div className={addvm.header}>
          <Header userType="facultydashboard" />
        </div>
        <h1>Add VSphere Template</h1>
        <div className={addvm.content}>
          {/* Content Library */}
          <div className={addvm.contentLibrary}>
            <label>Content Library:</label>
            <input
              name="contentLibrary"
              id={addvm.contentLibrary}
              value={library ? library.name : "-No Libraries Found-"}
              disabled
            />
          </div>

          {/* Virtual Machine */}
          <div className={addvm.chooseVm}>
            <h3>Choose a Virtual Machine Template:</h3>
            {templates && (
              <div>
                <div onChange={e => console.log("the template is: ", e.target.value)}>
                  {templates.map((template) => (
                    <label key={template.id}>
                      <input type="radio" name="template" value={template} />
                      {template.name}
                    </label>
                  ))}
                </div>
                <TemplateMetadata />
              </div>
            )}
          </div>
        </div>
        <button id={addvm.open}>Add</button>
        <Background templateInfo={template} />
      </div>
    </div>
  );
}

export default AddVm;
