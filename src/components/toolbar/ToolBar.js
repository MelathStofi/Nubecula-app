import React, { useContext, useState } from "react";
import { FMContext } from "../../contexts/FMContext";
import Upload from "../upload/Upload";
import { FilesContext } from "../../contexts/FilesContext";
import FileSearchList from "../search/FileSearchList";
import { useHistory, useLocation } from "react-router-dom";
import "./styles/ToolbarStyle.css";

const ToolBar = ({ user, auth, directory, showTrashBin, itemNum }) => {
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
    // if (auth) history.push("/file-manager?search=" + searched);
    // else history.push("/users/" + user.username + "?search=" + searched);
    if (auth) searchFilesAndSet(process.env.REACT_APP_BASE_URL, searched);
    else
      searchFilesAndSet(
        process.env.REACT_APP_PUBLIC_BASE_URL + "/" + user.username,
        searched,
        user.username
      );
    setSearchedFiles([]);
  };

  const goBack = () => {
    if (directory != null) {
      if (auth) {
        history.push({
          pathname: "/file-manager",
          search:
            directory.type !== "root directory" &&
            directory.parentDirectoryId != null
              ? "?id=" + directory.parentDirectoryId
              : "",
        });
      } else {
        history.push({
          pathname: "/users/" + user.username,
          search:
            directory.type !== "root directory" &&
            directory.parentDirectoryId != null
              ? "?id=" + directory.parentDirectoryId
              : "",
        });
      }
    }
  };

  function getCurrFolder() {
    return (
      <React.Fragment>
        &nbsp;
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
        &nbsp;
        {directory.filename}
      </React.Fragment>
    );
  }

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
            {directory //&& directory.type !== "root directory"
              ? getCurrFolder()
              : ""}
          </div>
          {auth ? (
            <div>{user ? user.inStorage + " / " + user.storage : ""}</div>
          ) : null}
        </div>
      </div>
      <div className="toolbar">
        <div className="toolbar-btn-wrapper">
          {directory != null && directory.type !== "root directory" ? (
            <button className="toolbar-btn back-btn" onClick={() => goBack()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="black"
                width="19px"
                height="25px"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
              </svg>
            </button>
          ) : (
            <div></div>
          )}
          &nbsp;&nbsp;
          {auth ? (
            <React.Fragment>
              <span title="upload files">
                <button
                  className="toolbar-btn"
                  onClick={() => setShowUpload(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    viewBox="0 0 24 24"
                    width="25"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
                  </svg>
                </button>
              </span>
              &nbsp;&nbsp;
              <span title="new folder">
                <button
                  className="toolbar-btn"
                  onClick={() => handleAddFolder()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    width="25px"
                    height="25px"
                  >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z" />
                  </svg>
                </button>
              </span>
            </React.Fragment>
          ) : (
            <div></div>
          )}
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
        <FileSearchList
          searchedFiles={searchedFiles}
          setSearchedFiles={setSearchedFiles}
          search={searchedText}
          user={user}
        />
      </div>
      {showUpload ? <Upload /> : <div></div>}
    </React.Fragment>
  );
};

export default ToolBar;
