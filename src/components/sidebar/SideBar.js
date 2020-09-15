import React, { useContext, useState } from "react";

import { useLoading } from "../../contexts/Loading";
import { FilesContext } from "../../contexts/FilesContext";
import { useHistory } from "react-router-dom";
import "./styles/SideBarStyle.css";
import FolderList from "./FolderList";

const SideBar = (props) => {
  const [isGenFolders, setIsGenFolders] = useState(false);
  const { loading } = useLoading();
  const { loadTrashBin } = useContext(FilesContext);
  const history = useHistory();

  const handleFileManager = () => {
    history.push("/file-manager");
  };

  const handleFolderList = () => {
    setIsGenFolders(!isGenFolders);
  };

  const handleTrashBin = () => {
    loadTrashBin();
  };

  function generateFolderList() {
    if (isGenFolders)
      return <FolderList url={process.env.REACT_APP_DIRECTORIES_URL} />;
  }

  if (loading) return null;
  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="sidebar-field">
          <span onClick={() => handleFolderList()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              className="s-b-icon"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d={
                  isGenFolders
                    ? "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                    : "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                }
              />
            </svg>
            &nbsp;
          </span>
          <span
            className="sidebar-field-title"
            onClick={() => handleFileManager()}
          >
            My Files
          </span>
        </div>
        {generateFolderList()}
        <div className="sidebar-field" onClick={() => handleTrashBin()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="s-b-icon"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
          </svg>
          &nbsp;
          <span className="sidebar-field-title">Trash bin</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
