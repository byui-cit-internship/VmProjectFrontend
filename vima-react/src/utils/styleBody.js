import { useEffect } from "react";

const body = document.querySelector("body");
const urlParams = window.location.href.split("/")[3];

export function addBodyStyles() {
  useEffect(() => {
    if (urlParams === "addprofessor") {
      body.style.height = "100vh";
      body.style.display = "flex";
      body.style.justifyContent = "center";
      body.style.alignItems = "center";
    }
  });
}

export function removeBodyStyles() {
  useEffect(() => {
    if (urlParams !== "addprofessor") {
      body.style.height = "unset";
      body.style.display = "unset";
      body.style.justifyContent = "unset";
      body.style.alignItems = "unset";
    }
  });
}
