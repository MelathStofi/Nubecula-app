import React, { useContext } from "react";
import DirectoryImg from "../../resources/directory.png";
import FileImg from "../../resources/file.png";

import "./styles/FileSearchStyle.css";
import { ClickAwayListener } from "@material-ui/core";
import { FilesContext } from "../../contexts/FilesContext";
import { FMContext } from "../../contexts/FMContext";

const FileSearchList = ({ searchedFiles, setSearchedFiles, search }) => {
  const { loadFiles } = useContext(FilesContext);
  const { setSelectedFiles } = useContext(FMContext);

  const handleClick = (file) => {
    if (file.directory) loadFiles(file.url, file.id);
    else {
      loadFiles(
        process.env.REACT_APP_BASE_URL + "/" + file.parentDirectoryId,
        file.parentDirectoryId
      );
      setSelectedFiles([file]);
    }
    setSearchedFiles([]);
  };

  const getFilename = (filename) => {
    filename = filename.toLowerCase();
    const arr = filename.split(search);
    let str = [];
    for (let i = 0; i < arr.length - 1; i++) {
      str.push(arr[i]);
      str.push(
        <span style={{ fontWeight: "bold", color: "#545454" }} key={i}>
          {search}
        </span>
      );
    }
    str.push(arr[arr.length - 1]);
    return str;
  };

  return searchedFiles.length !== 0 ? (
    <ClickAwayListener onClickAway={() => setSearchedFiles([])}>
      <div className="search-list">
        {searchedFiles.map((file) => (
          <div
            key={file.id}
            className="search-list-row"
            onClick={() => handleClick(file)}
          >
            {file.directory ? (
              <img width="21,5px" height="27px" src={DirectoryImg} alt="DIR" />
            ) : (
              <img width="21,5px" height="27px" src={FileImg} alt="FILE" />
            )}
            <div className="search-list-text">
              &nbsp;&nbsp;{getFilename(file.filename)}
            </div>
          </div>
        ))}
      </div>
    </ClickAwayListener>
  ) : null;
};

export default FileSearchList;
