import React, { useContext } from "react";
import DirectoryImg from "../../resources/directory.png";
import FileImg from "../../resources/file.png";

import "./styles/SearchListStyle.css";
import { ClickAwayListener } from "@material-ui/core";
import { FilesContext } from "../../contexts/FilesContext";
import { FMContext } from "../../contexts/FMContext";

const SearchList = ({ searchedFiles, setSearchedFiles }) => {
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
            <div className="search-list-text">&nbsp;&nbsp;{file.filename}</div>
          </div>
        ))}
      </div>
    </ClickAwayListener>
  ) : null;
};

export default SearchList;
