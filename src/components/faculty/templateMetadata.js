import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getApiRoot } from "../../utils/getApiRoot";

const TemplateMetadata = (props) => {
  const [metadata, setMetadata] = useState();
  const [template, setTemplate] = useState(
    props.templateInfo ? JSON.parse(props.templateInfo) : false
  );
  var options = { year: "numeric", month: "numeric", day: "numeric" };

  if (props.templateInfo) console.log("template info: ", JSON.parse(props.templateInfo));

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
        console.log("metadata: ", data);
        setMetadata(data);
      } else {
        console.log(response);
      }
    };

    if (template) {
      fetchTemplateMetadata();
    } else {
      console.log("no template");
    }
  }, [template]);

  return (
    <div>
      {metadata && (
        <div>
          <div>
            <div>Creation Date: </div>
            <div>{date.toLocaleString("en-US", options)}</div>
          </div>
          <div>
            <div>Last modified: </div>
            <div>{date2.toLocaleDateString("en-US", options)}</div>
          </div>
          <div>
            <div>Memory: </div>
            <div>{metadata.memory / 1000} GB</div>
          </div>
          <div>
            <div>CPU count: </div>
            <div>{metadata.cpuCount}</div>
          </div>
          <div>
            <div>Operating System: </div>
            <div>{metadata.os}</div>
          </div>
        </div>
      )}
    </div>
  );
};

TemplateMetadata.propTypes = {
  templateInfo: PropTypes.string
};

export default TemplateMetadata;
