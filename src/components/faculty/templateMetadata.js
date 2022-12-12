import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getApiRoot } from "../../utils/getApiRoot";
import templateMetadata from "./templateMetadata.module.css";
import LoadingSpinner2 from "../spinner2";

const TemplateMetadata = (props) => {
  const [metadata, setMetadata] = useState();
  const [metadataResponse, setMetadataResponse] = useState(false);
  const template = props.templateInfo ? JSON.parse(props.templateInfo) : false;
  var options = { year: "numeric", month: "numeric", day: "numeric" };

  var date;
  var date2;
  if (template) {
    date = new Date(template.creation_time);
    date2 = new Date(template.last_modified_time);
  }

  useEffect(() => {
    const fetchTemplateMetadata = async () => {
      const options = {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      };
      const response = await fetch(
        `${getApiRoot()}/api/createvm/vCenterTemplate/metadata/${template.id}`,
        options
      );
      if (response.ok) {
        const data = await response.json();
        setMetadata(data);
        setMetadataResponse("success");
      } else {
        setMetadataResponse("Error fetching data.");
      }
      props.btnHandler(false);
    };

    if (template) {
      fetchTemplateMetadata();
    } else {
      console.log("no template");
    }
  }, []);

  if (metadataResponse) {
    if (metadataResponse !== "Error fetching data.") {
      return (
        <div className={templateMetadata.templateMetadata}>
          <div className={templateMetadata.metaDataContainer}>
            <div className={templateMetadata.dataContainer}>
              <div>Creation Date: </div>
              <div>{date.toLocaleString("en-US", options)}</div>
            </div>
            <div className={templateMetadata.dataContainer}>
              <div>Last modified: </div>
              <div>{date2.toLocaleDateString("en-US", options)}</div>
            </div>
            <div className={templateMetadata.dataContainer}>
              <div>Memory: </div>
              <div>{metadata.memory / 1000} GB</div>
            </div>
            <div className={templateMetadata.dataContainer}>
              <div>CPU count: </div>
              <div>{metadata.cpuCount}</div>
            </div>
            <div className={templateMetadata.dataContainer}>
              <div>Operating System: </div>
              <div>{metadata.os}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={templateMetadata.errorMessage}>
          <div>{metadataResponse}</div>
        </div>
      );
    }
  } else {
    return <LoadingSpinner2 />;
  }
};

TemplateMetadata.propTypes = {
  templateInfo: PropTypes.string,
  btnHandler: PropTypes.func
};

export default TemplateMetadata;
