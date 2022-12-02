import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getApiRoot } from "../../utils/getApiRoot";

const TemplateMetadata = (props) => {
  const [metadata, setMetadata] = useState();
  const [template, setTemplate] = useState(
    props.templateInfo ? JSON.parse(props.templateInfo) : false
  );

  if (props.templateInfo) console.log("template info: ", JSON.parse(props.templateInfo));

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

  if (metadata) {
    return <div></div>;
  }
};

TemplateMetadata.propTypes = {
  templateInfo: PropTypes.string
};

export default TemplateMetadata;
