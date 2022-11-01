import { React, useState, useEffect } from "react";
import Background from "../../background";
import Header from "../../header";
import addvm from "./addvm.module.css";
import Apple from "@mui/icons-material/Apple";

function AddVm() {
  const [templateFolders] = useState([]);

  useEffect(() => {
    console.log("Calling fetch to update a list of template folders");
  }, templateFolders);

  return (
    <div className={addvm.addvm}>
      <div className={addvm.container}>
        <div className={addvm.header}>
          <Header userType="faculty" />
        </div>
        <h1>Add VSphere Template</h1>
        <div className={addvm.content}>
          {/* Folders */}
          <div className={addvm.folder}>
            <label>Choose a Folder:</label>
            <br />
            <select name="folder" id={addvm.folder} required>
              <option name="option" value="Default">
                Default
              </option>
            </select>
          </div>

          {/* Content Library */}
          <div className={addvm.contentLibrary}>
            <label>Choose a Content Library:</label>
            <select name="contentLibrary" id={addvm.contentLibrary} required>
              <option name="option" value="Default">
                Default
              </option>
            </select>
          </div>
          {/* Virtual Machine */}
          <div className={addvm.chooseVm}>
            <label>Choose a Virtual machine:</label>
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
