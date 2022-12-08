import { React, useState, useEffect } from "react";
import Background from "../../background";
import Header from "../../header";
import addvm from "./addvm.module.css";
import { getApiRoot } from "../../utils/getApiRoot";
import TemplateMetadata from "./templateMetadata";
import OSIcon from "./osIcon";
import LoadingSpinner from "../spinner";

function AddVm() {
  const [libraryId, setLibraryId] = useState();
  const [library, setLibrary] = useState();
  const [templates, setTemplates] = useState();
  const [template, setTemplate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const options = {
    method: "Get",
    credentials: "include",
    headers: { "content-type": "application/json" }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("sectionId");

  const postTemplate = async () => {
    const templateData = JSON.parse(template);
    const options = {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        VmTemplateVCenterId: templateData.id,
        VmTemplateName: templateData.name,
        LibraryVCenterId: libraryId
      })
    };

    const response = await fetch(getApiRoot() + "/api/createvm/templates/postTemplate", options);
    if (response.ok) {
      alert("success!");
    } else {
      alert("error");
    }
  };
  useEffect(() => {
    const fetchSection = async () => {
      const response = await fetch(
        getApiRoot() + `/api/course/getSectionById/${courseId}`,
        options
      );
      if (response.ok) {
        const section = await response.json();
        setLibraryId(section.libraryVCenterId);
      } else {
        console.log(response);
      }
    };
    fetchSection();
  }, []);

  useEffect(() => {
    const fetchLibrary = async () => {
      const response = await fetch(
        getApiRoot() + `/api/createvm/libraryById/${libraryId}`,
        options
      );
      if (response.ok) {
        const fetchedData = await response.json();
        setLibrary(fetchedData);
      } else {
        console.log(response);
      }
    };

    const fetchTemplates = async () => {
      const response = await fetch(getApiRoot() + `/api/createvm/templates/${libraryId}`, options);
      setIsLoading(false);
      if (response.ok) {
        const fetchedData = await response.json();
        setTemplates(fetchedData);
      }
    };

    if (libraryId) {
      fetchLibrary();
      fetchTemplates();
    }
  }, [libraryId]);

  return (
    <div className={addvm.addvm}>
      <div className={addvm.container}>
        <div className={addvm.header}>
          <Header userType="facultydashboard" />
        </div>
        <h1>Add VSphere Template</h1>
        <div className={addvm.content}>
          {/* Content Library */}
          <div className={addvm.contentLibrary}>
            <label>Content Library:</label>
            <input
              className={addvm.inputBox}
              name="contentLibrary"
              id={addvm.contentLibrary}
              value={library ? library.name : "-No Libraries Found-"}
              disabled
            />
          </div>
          {/* Virtual Machine */}

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div>
              <div className={addvm.chooseVm}>
                {templates && (
                  <div>
                    <div className={addvm.templateOptionsContainer}>
                      <h3 className={addvm.headerText}>Choose a Virtual Machine Template:</h3>
                      {templates && (
                        <div
                          className={addvm.templates}
                          onChange={(e) => {
                            setTemplate(e.target.value);
                          }}>
                          {templates.map((item) => (
                            <div className={addvm.flexbox} key={item.id}>
                              <label className={addvm.template}>
                                <input type="radio" name="template" value={JSON.stringify(item)} />
                                <span
                                  className={
                                    JSON.stringify(item) != template
                                      ? addvm.uncheckedCheckmark
                                      : addvm.checkedCheckmark
                                  }></span>
                                <OSIcon operatingSystem={item.name} />
                              </label>
                              <div>{item.name}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {template && (
                      <TemplateMetadata
                        templateInfo={template}
                        btnHandler={setIsBtnDisabled}
                        key={template}
                      />
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => postTemplate()}
                disabled={!template}
                id={isBtnDisabled ? addvm.postTemplateDisabled : addvm.postTemplateEnabled}>
                Add
              </button>
            </div>
          )}
        </div>

        <Background templateInfo={template} />
      </div>
    </div>
  );
}

export default AddVm;
