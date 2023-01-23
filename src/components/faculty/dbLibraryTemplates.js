import PropTypes from "prop-types";
import { React, useEffect, useState } from "react";
import { getApiRoot } from "../../utils/getApiRoot";
import dblibrarytemplates from "./dbLibraryTemplates.module.css";

const formatDate = (dateString) => {
  let date = new Date(dateString);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let formatedDate = month + "/" + day + "/" + year;
  return formatedDate;
};

const DbLibraryTemplates = (props) => {
  const [templates, setTemplates] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchTemplates = async () => {
      const options = {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      };
      const response = await fetch(
        getApiRoot() + `/api/createvm/templates/bylibraryid/${props.libraryId}`,
        options
      );
      if (response.ok) {
        const backendResponse = await response.json();
        setTemplates(backendResponse);
      } else {
        setError("Error retrieving data.");
      }
    };
    fetchTemplates();
  }, []);

  if (templates) {
    if (templates.length > 0) {
      return (
        <div className={dblibrarytemplates.dblibrarytemplates}>
          {templates.map((template) => (
            <div key={template.id} className={dblibrarytemplates.templateFlexContainer}>
              <div>{template.name}</div>
              <div>{formatDate(template.last_modified_time)}</div>
            </div>
          ))}
        </div>
      );
    } else if (templates.length === 0) {
      return (
        <div>
          <div>No templates have been added for this section</div>
        </div>
      );
    }
  } else if (error) {
    return (
      <div>
        <div>{error}</div>
      </div>
    );
  }
};

DbLibraryTemplates.propTypes = {
  libraryId: PropTypes.string.isRequired
};

export default DbLibraryTemplates;
