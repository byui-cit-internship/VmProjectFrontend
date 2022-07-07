import React from "react";
import Background from "../../background";
// import Header from "../../header";
import addvm from "./addvm.module.css";

function AddVm() {
    return (
        <div className={addvm.addvm}>
        <div className={addvm.container}>
            <div className={addvm.header}>
                <Header />
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

          {/* Year */}
          <div className={addvm.year}>
            <label>Professor Page Year:</label>
            <select name="semester" id={addvm.semester} required>
              <option name="option" value="">
                Default
              </option>
              <option name="option" value="Summer">
                2022
              </option>
              <option name="option" value="Spring">
                2021
              </option>
              <option name="option" value="Fall">
                2020
              </option>
              <option name="option" value="Winter">
                2019
              </option>
            </select>
          </div>

          {/* Semester */}
          <div className={addvm.semester}>
            <label>Choose Semester:</label>
            <select name="semester" id="semester" required>
              <option name="option" value="">
                Default
              </option>
              <option name="option" value="Summer">
                Summer
              </option>
              <option name="option" value="Spring">
                Spring
              </option>
              <option name="option" value="Fall">
                Fall
              </option>
              <option name="option" value="Winter">
                Winter
              </option>
            </select>
          </div>

          {/* Virtual Machine */}
          <div className={addvm.chooseVm}>
            <label>Choose a Virtual machine:</label>
            <form action="">
              <select
                name="templateVm"
                id={addvm.templateVm}
                required
                multiple
                type="checkbox"
              >
                <option name="option" value="Default">
                  Default
                </option>
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
                            <select name="addTemplateVm" id={addvm.addTemplateVm} required > 
                                <option className={addvm.vm} name="option" value="Default"  >Default</option>
                            </select>
                            <button id={addvm.more}><i className={addvm.materialicons}>add</i></button>
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
                    <button id={addvm.addtemplate}>Add</button>
        </div>
        <Background/>
        </div>
        {/* Button to open a modal to add more templates */}
        <button id={addvm.open}>Add</button>
      </div>
      <Background />
    </div>
  );
}

export default AddVm;
