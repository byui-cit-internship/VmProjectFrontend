import { React, useState, useEffect } from "react";
import Background from "../../background";
import Header from "../../header";
import addvm from "./addvm.module.css";
import Apple from "@mui/icons-material/Apple";
import { getApiRoot } from "../../utils/getApiRoot";
import { library } from "@fortawesome/fontawesome-svg-core";
import TemplateMetadata from "./templateMetadata";
import { getOSIcon } from "react-os-icons";

const WindowsIcon = getOSIcon({ os: "Windows", className: "icon windows" });
const UbuntuIcon = getOSIcon({ os: "Ubunty", className: "icon ubuntu" });
const DebianIcon = getOSIcon({ os: "Debian", className: "icon debian" });
const LinuxIcon = getOSIcon({ os: "Linux", className: "icon linux" });
const MacIcon = getOSIcon({ os: "Mac OS", className: "icon mac" });
const FedoraIcon = getOSIcon({ os: "Fedora", className: "icon fedora" });
const ArchIcon = getOSIcon({ os: "Arch", className: "icon arch" });
const LinuxMintIcon = getOSIcon({ os: "Linux Mint", className: "icon linux-mint" });

function AddVm() {
  const [libraryId, setLibraryId] = useState();
  const [library, setLibrary] = useState();
  const [templates, setTemplates] = useState();
  const [template, setTemplate] = useState();

  const options = {
    method: "Get",
    credentials: "include",
    headers: { "content-type": "application/json" }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("sectionId");

  const postTemplate = async () => {};

  const radioHandler = async () => {};

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
                      {templates.map((template) => (
                        <div className={addvm.flexbox}>
                          <label key={template.id} className={addvm.template}>
                            <input type="radio" name="template" value={JSON.stringify(template)} />
                            {WindowsIcon}
                          </label>
                          <div>{template.name}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <TemplateMetadata templateInfo={template} key={template} />
              </div>
            )}
          </div>
          <button id={addvm.open}>Add</button>
        </div>

        <Background templateInfo={template} />
      </div>
    </div>
  );
}

export default AddVm;
