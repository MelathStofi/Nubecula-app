import React, { useContext, useState } from "react";
import { FMContext } from "../contexts/FMContext";
import Upload from "../components/upload/Upload";
import { FilesContext } from "../contexts/FilesContext";
import FileSearchList from "../components/search/FileSearchList";
import { useHistory, useLocation } from "react-router-dom";
import "./styles/ToolbarStyle.css";

const ToolBar = ({ user, auth, showTrashBin, itemNum }) => {
  const { showUpload, setShowUpload, addFolder } = useContext(FMContext);
  const { searchFilesAndSet, getSearchedFiles } = useContext(FilesContext);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const [searchedText, setSearchedText] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleAddFolder = () => {
    addFolder();
  };

  const instantSearch = async (searched) => {
    setSearchedText(searched);
    if (searched === "") setSearchedFiles([]);
    else {
      const resp = await getSearchedFiles(
        auth
          ? process.env.REACT_APP_BASE_URL
          : process.env.REACT_APP_PUBLIC_BASE_URL + "/" + user.username,
        searched,
        "true"
      );
      setSearchedFiles(resp);
    }
  };

  const search = (searched) => {
    searchFilesAndSet(
      auth
        ? process.env.REACT_APP_BASE_URL
        : process.env.REACT_APP_PUBLIC_BASE_URL + "/" + user.username,
      searched
    );
  };

  if (showTrashBin)
    return (
      <React.Fragment>
        <div>
          <div>
            <div className="fm-title">
              <div
                className="fm-title-text"
                onClick={() => history.push(location.pathname)}
              >
                Trash Bin
              </div>
              {itemNum}
              {itemNum < 2 ? " item" : " items"}
            </div>
          </div>
        </div>
        <div className="toolbar"></div>
      </React.Fragment>
    );
  return (
    <React.Fragment>
      <div>
        <div className="fm-title">
          <div
            className="fm-title-text"
            onClick={() => history.push(location.pathname)}
          >
            {user ? user.username : ""}
          </div>
          {auth ? (
            <div>{user ? user.inStorage + " / " + user.storage : ""}</div>
          ) : null}
        </div>
      </div>
      <div className="toolbar">
        {auth ? (
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
        ) : (
          <div></div>
        )}
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
        <FileSearchList
          searchedFiles={searchedFiles}
          setSearchedFiles={setSearchedFiles}
          search={searchedText}
        />
      </div>
      {showUpload ? <Upload /> : <div></div>}
    </React.Fragment>
  );
};

export default ToolBar;
