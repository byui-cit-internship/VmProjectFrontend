import React from "react";
import "../../background.css";

function CanvasToken() {
  return (
    <main>
      <div className="tool-tip">
        <label className="canvasToken" htmlFor="canvasToken">
          Please enter your Canvas Token: <i className="tool-tip__icon">i</i>
        </label>
        <p className="tool-tip__info">
          <span className="info">
            For more information
            <a href="https://confluence.cit362.com/display/IMD/Get+your+Canvas+API+Token">
              &nbsp;click here!
            </a>
          </span>
        </p>
      </div>
      <input
        type="text"
        id="canvasToken"
        name="canvas_token"
        placeholder="Enter your class token"
        required></input>
      <button id="validate">Submit</button>
    </main>
  );
}
export default CanvasToken;
