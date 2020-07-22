import React, { useContext, useState } from "react";
import { FMContext } from "../../contexts/FMContext";
import Upload from "../upload/Upload";
import { FilesContext } from "../../contexts/FilesContext";
import { UserContext } from "../../contexts/UserContext";
import SearchList from "./SearchList";
import { useHistory } from "react-router-dom";

const ToolBar = () => {
  const { viewedUser, setViewedUser } = useContext(UserContext);
  const { showUpload, setShowUpload, addFolder } = useContext(FMContext);
  const { searchFilesAndSet, getSearchedFiles } = useContext(FilesContext);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const history = useHistory();

  const handleAddFolder = () => {
    addFolder();
  };

  const instantSearch = async (searched) => {
    if (searched === "") setSearchedFiles([]);
    else {
      const resp = await getSearchedFiles(searched, "true");
      setSearchedFiles(resp);
    }
  };

  const search = (searched) => {
    searchFilesAndSet(searched);
  };

  return (
    <React.Fragment>
      <div>
        <div className="fm-title">
          <div
            className="fm-title-text"
            onClick={() => history.push("/file-manager")}
          >
            {viewedUser}
          </div>
        </div>
      </div>

      <div className="toolbar">
        <div className="toolbar-btn-wrapper">
          <button
            className="tpplbar-btn back-btn"
            onClick={() => console.log("back")}
          >
            &lt;
          </button>
          &nbsp;&nbsp;
          <button className="toolbar-btn" onClick={() => setShowUpload(true)}>
            Upload files
          </button>
          &nbsp;&nbsp;
          <button className="toolbar-btn" onClick={() => handleAddFolder()}>
            Create Folder
          </button>
        </div>
        <div className="search-bar-wrapper">
          <input
            className="search-input"
            type="text"
            name="file-search"
            autoComplete="off"
            placeholder="Search..."
            onClick={(e) => instantSearch(e.target.value)}
            onChange={(e) => instantSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) search(e.target.value);
            }}
          />
        </div>
        <SearchList
          searchedFiles={searchedFiles}
          setSearchedFiles={setSearchedFiles}
        />
      </div>
      {showUpload ? <Upload /> : <div></div>}
    </React.Fragment>
  );
};

export default ToolBar;
