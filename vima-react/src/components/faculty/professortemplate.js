import React from 'react'

function ProfessorTemplate() {
  return (
    <div>
        <div class="container">
            <h1>Add templates</h1>

            {/* <!-- Content Library  --> */}
            <label>Choose a Content Library:</label>
            <select name="contentLibrary"  id="contentLibrary" required > 
            <option name="option" value="Default">Default</option>
            </select>

            {/* <!--Virtual machine  --> */}
            <label>Choose a template Virtual machine:</label>
            <select name="templateVm"  id="templateVm"  required > 
            <option name="option" value="Default">Default</option>
            </select>

             <button type="button" id="submit" class="save">Save</button>
        </div> 
    </div>
  )
}

export default ProfessorTemplate
