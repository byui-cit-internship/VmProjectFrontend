import React from "react";
import Spinner from "./spinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={Spinner.modal}>
            <div className={Spinner.loadingSpinner}>
        </div>
    </div>
  );
}