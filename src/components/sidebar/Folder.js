import React, { useState } from "react";
import FolderList from "./FolderList";
import FolderImg from "../../resources/directory.png";
import { useHistory } from "react-router-dom";

const Folder = ({ folder }) => {
  const [genFol, setGenFol] = useState(false);
  const history = useHistory();

  function handleClick() {
    setGenFol(!genFol);
  }

  function renderFolderList() {
    if (genFol)
      return (
        <FolderList
          url={process.env.REACT_APP_DIRECTORIES_URL + "/" + folder.id}
        />
      );
  }

  function getChevron() {
    if (genFol)
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          className="s-b-icon"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
      );
    else
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          className="s-b-icon"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      );
  }

  return (
    <React.Fragment>
      <div className="folder-row">
        <div onClick={() => handleClick()}>{getChevron()}</div>
        <div
          className="folder-row-content"
          onClick={() => history.push("file-manager/?id=" + folder.id)}
        >
          <img width="16,5px" height="22px" src={FolderImg} alt={""} />
          &nbsp;
          <span>{folder.filename}</span>
        </div>
      </div>
      {renderFolderList()}
    </React.Fragment>
  );
};

export default Folder;
