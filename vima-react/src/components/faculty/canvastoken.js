import React from "react";
import Squares from "../../pages/squares";

function CanvasToken() {
    return (
        <main>
            <div class="tool-tip">
                <label class="canvasToken" for="canvasToken">Please enter your Canvas Token: <i class="tool-tip__icon">i</i></label>
    
                 <p class="tool-tip__info">
                <span class="info">
                    For more information<a href="https://confluence.cit362.com/display/IMD/Get+your+Canvas+API+Token">&nbsp;click here!</a></span>
                 </p>
            </div>
            <input type="text" id="canvasToken"  name="canvas_token" placeholder="Enter your class token" required/> 
            <button id="validate">Submit</button>
            <Squares />
        </main>
    )
}
export default CanvasToken;