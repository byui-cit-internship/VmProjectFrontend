import React from "react";
import background from "./background.module.css";

function Background() {
  return (
    <div className={background.background}>
      <div className={background.area}>
        <ul className={background.circles}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
export default Background;
