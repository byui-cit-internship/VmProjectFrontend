import { React, useState, useEffect } from "react";
import Background from "../../background";
import Header from "../../header";
import addvm from "./addvm.module.css";
import Apple from "@mui/icons-material/Apple";
import { getApiRoot } from "../../utils/getApiRoot";

function AddVm() {
  const [libraries, setLibraries] = useState([]);
  const [library, setLibrary] = useState();
  const [templates, setTemplates] = useState();

  // Would we need to add a section dropdown to to select which section?
  // Picks section -> show default library, and allow to select a different one
  // Show templates based on selected library

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("courseId");

  const uniq = (a) => {
    return Array.from(new Set(a));
  };

  const fetchSections = async () => {
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json"
      }
    };
    const response = await fetch(
      getApiRoot() + `/api/course/getSectionsByCourseId/${courseId}`,
      options
    );
    if (response.ok) {
      const fetchedSections = await response.json();

      var librariesArray = [""];

      fetchedSections.forEach((section, index, arr) => {
        librariesArray[index] = section.libraryVCenterId;
      });

      setLibraries(uniq(librariesArray));
    } else {
      console.log(response);
    }
  };

  const postTemplate = async () => {};

  useEffect(() => {
    fetchSections();
  }, []);

  console.log(libraries);
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
            <label>Choose a Content Library:</label>
            <select
              name="contentLibrary"
              id={addvm.contentLibrary}
              onChange={(e) => setLibrary(e.target.value)}
              required>
              <option name="option" value="Default">
                -Select-
              </option>
              {libraries.map((library) => (
                <option key={library} value={library}>
                  {library}
                </option>
              ))}
            </select>
          </div>

          {/* Virtual Machine */}
          <div className={addvm.chooseVm}>
            <label>Choose a Virtual Machine Template:</label>
            <form action="">
              <select name="templateVm" id={addvm.templateVm} required multiple type="checkbox">
                <option className={addvm.apple} name="option">
                  <Apple />
                </option>
                {/* <option name="option" value="Default">Default</option> */}
              </select>
            </form>
          </div>

          <div className={addvm.modalForTemplate}>
            <div className={addvm.modalcontent}>
              <span className={addvm.closeModal}>X</span>
              <h1>Add templates</h1>
              <label>Choose a template Virtual machine:</label>
              <select name="addTemplateVm" id={addvm.addTemplateVm} required>
                <option className={addvm.vm} name="option" value="Default">
                  Default
                </option>
              </select>
              <button id={addvm.more}>
                <i className={addvm.materialicons}>add</i>
              </button>
              <button id={addvm.submitAddTemplates}>save</button>
            </div>
          </div>

          <div className={addvm.modalForTemplate}>
            <div className={addvm.modalcontent}>
              <span className={addvm.closeModal}>X</span>
              <h1>Add templates</h1>
              <label>Choose a template Virtual machine:</label>
              <select className={addvm.addTemplateVm} required>
                <option className={addvm.vm} name="option" value="Default">
                  Default
                </option>
              </select>
              <button id={addvm.more}>
                <i className={addvm.materialicons}>add</i>
              </button>
              <button id={addvm.submitAddTemplates}>save</button>
            </div>
          </div>

          {/* Description */}
          {/* <div className={addvm.description}>
                <label>Description of Virtual Machine:</label>
                <textarea type="text" id={addvm.description} name="description" rows="2" cols="30" placeholder="Describe your course"></textarea>
            </div> */}
        </div>
        {/* Button to open a modal to add more templates */}
        <button id={addvm.open}>Add</button>
        <Background />
      </div>
    </div>
  );
}

export default AddVm;
