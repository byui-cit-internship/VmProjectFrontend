import React from "react"; 
import createvm from './createvm.module.css';
import Background from "../../background";

function CreateVm() {
    return (
        <>
        <div className={createvm.container}>
            <h1>Create Virtual Machine</h1>
            <div className={createvm.content}>

                {/* Folders */}
                    <label>Choose a Folder:</label>
                        <select name="folder" id={createvm.folder} required > 
                            <option name="option" value="Default">Default</option>
                        </select>

                {/* Content Library */}
                    <label>Choose a Content Library:</label>
                        <select name="contentLibrary" id={createvm.contentLibrary} required > 
                            <option name="option" value="Default">Default</option>
                        </select>


                {/* Year */}
                <label>Professor Page Year:</label>
                    <select name="semester" id={createvm.semester} required>
                        <option name="option" value="">Default</option>
                        <option name="option" value="Summer">2022</option>
                        <option name="option" value="Spring">2021</option>
                        <option name="option" value="Fall">2020</option>
                        <option name="option" value="Winter">2019</option>
                    </select>

                {/* Semester */}
                    <label>Choose Semester:</label>
                        <select name="semester" id="semester" required>
                            <option name="option" value="">Default</option>
                            <option name="option" value="Summer">Summer</option>
                            <option name="option" value="Spring">Spring</option>
                            <option name="option" value="Fall">Fall</option>
                            <option name="option" value="Winter">Winter</option>
                        </select>

                {/* Virtual Machine */}
                <label>Choose a Virtual machine:</label>
                    <form action="">
                        <select name="templateVm" id={createvm.templateVm} required multiple type="checkbox">
                            <option name="option" value="Default">Default</option>
                        </select>
                    </form>

                {/* Button to open a modal to add more templates */}
                    {/* <button id={createvm.open}><i className={createvm.materialicons}>add_circle</i>Add more templates</button> */}
            
                    <div className={createvm.modalForTemplate} id={createvm.modalForTemplate}>
                        <div className={createvm.modalcontent}>
                        <span className={createvm.closeModal}>X</span>
                            <h1>Add templates</h1>
                            <label>Choose a template Virtual machine:</label>
                            <select name="addTemplateVm" id={createvm.addTemplateVm} required > 
                                <option name="option" value="Default">Default</option>
                            </select>
                            <button id={createvm.more}><i className={createvm.materialicons}>add</i></button>
                            <button id={createvm.submitAddTemplates}>save</button>
                        </div>
                    </div>
            
                {/* Description */}
                    <label>Description of Virtual Machine:</label>
                    <textarea type="text" id={createvm.description} name="description" rows="2" cols="30" placeholder="Describe your course"></textarea>
            </div>
        </div>
        <Background/>
        </>
    )        
}

export default CreateVm;