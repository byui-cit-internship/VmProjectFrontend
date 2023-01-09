import Background from "../../background";
import Header from "../../header";
import myclasses from "./myclasses.module.css";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useState } from "react";
import { Card } from "@mui/material";

import { getApiRoot } from "../../utils/getApiRoot";
import LoadingSpinner2 from "../spinner2";
import DbLibraryTemplates from "./dbLibraryTemplates";
import ClassesSkeleton from "./classesSkeleton";

function MyClasses() {
  let navigate = useNavigate();
  const [sectionList, setSectionList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [fetchingClasses, setFetchingClasses] = useState(false);

  useEffect(() => {
    setFetchingClasses(true);

    const getclassList = async () => {
      const listResponse = await fetch(getApiRoot() + "/api/course/professor/getAllSections", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json"
        }
      });

      const sections = await listResponse.json();
      setSectionList(sections);
      setFetchingClasses(false);
    };
    getclassList();
  }, []);

  return (
    <div className={myclasses.myclasses}>
      <div className={myclasses.container}>
        <Header userType="facultydashboard" />
        <h1 className={myclasses.title}>My Classes</h1>
        <div id={myclasses.classesAndSearch}>
          <div className={myclasses.searchbar}>
            <input
              id={myclasses.search}
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              type="text"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className={myclasses.tablegrid}>
          <div className={myclasses.table}>
            {fetchingClasses ? (
              <ClassesSkeleton />
            ) : (
              sectionList.map((item) => (
                <div className={myclasses.card} key={item.sectionId}>
                  <Card variant="outlined">
                    <div value={item} className={myclasses.tableheader}>
                      {item.sectionName}
                    </div>
                    <div className={myclasses.tablecontent}>
                      <DbLibraryTemplates libraryId={item.libraryVCenterId} />
                      <div className={myclasses.add}>
                        <button
                          className={myclasses.addbutton}
                          onClick={() => navigate(`/addvm?sectionId=${item.sectionId}`)}>
                          Add Virtual Machine Template
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              ))
            )}
          </div>
        </div>
        <div
          className={myclasses.add_class}
          onClick={() => {
            navigate("/addclass");
          }}>
          <button className={myclasses.submitBt}>Add New Class</button>
        </div>
      </div>

      <Background />
    </div>
  );
}

export default MyClasses;
