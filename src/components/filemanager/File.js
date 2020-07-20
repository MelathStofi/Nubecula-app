import React, { useState, useContext } from "react";
import axios from "axios";
import BoxImg from "../../resources/box1-01.png";
import TickedBoxImg from "../../resources/ticked_box.png";
import DirectoryImg from "../../resources/directory.png";
import FileImg from "../../resources/file.png";

import { FilesContext } from "../../contexts/FilesContext";
import ShowWindowDimensions from "../WindowDimension";
import { FMContext } from "../../contexts/FMContext";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { ContextMenuContext } from "../../contexts/ContextMenuContext";
import { useLocation } from "react-router-dom";

const File = (props) => {
  const location = useLocation();
  const [selected, setSelected] = useState(false);
  const { files, setFiles, loadFiles } = useContext(FilesContext);
  const {
    currentFile,
    setCurrentFile,
    isRename,
    selectedFiles,
    setSelectedFiles,
    setIsRename,
    newName,
    setNewName,
    rename,
    isCut,
  } = useContext(FMContext);
  const { setCurrentMenu } = useContext(ContextMenuContext);

  const loadData = () => {
    if (props.file.directory) {
      loadFiles(props.file.url, props.file.id);
      setCurrentFile(props.file);
    }
  };

  const handleContextMenu = (e) => {
    if (!selectedFiles.includes(props.file)) handleSelection(e);
    setCurrentMenu("file-contextmenu");
    setCurrentFile(props.file);
  };

  const renameFile = (e) => {
    if (e.target.value !== "" && e.target.value !== props.file.filename) {
      rename();
      const newArray = [...files];
      const newFile = Object.assign({}, props.file);
      const index = files.indexOf(props.file);
      newFile["filename"] = newName;
      newArray[index] = newFile;
      setFiles(newArray);
    } else setIsRename(false);
  };

  const shareFile = () => {
    axios({
      method: "put",
      url: process.env.REACT_APP_SHARE_URL + "/" + props.file.id,
      withCredentials: true,
    })
      .catch((error) => {
        console.log("couldn't share " + props.file.filename);
      })
      .then((resp) => {
        if (resp) {
          loadFiles(
            process.env.REACT_APP_BASE_URL + location.search.slice(4),
            location.search.slice(4)
          );
        }
      });
  };

  const handleSelection = (e) => {
    setSelected(!selected);
    let newArray = selectedFiles;
    if (e.ctrlKey) {
      if (!selectedFiles.includes(props.file)) {
        setSelectedFiles([...selectedFiles, props.file]);
      } else {
        newArray.splice(newArray.indexOf(props.file), 1);
        setSelectedFiles(newArray);
      }
    } else if (e.shiftKey) {
      if (!selectedFiles.includes(props.file) && selectedFiles.length !== 0) {
        const firstInd = files.indexOf(props.file);
        const secondInd = files.indexOf(
          selectedFiles[selectedFiles.length - 1]
        );
        firstInd < secondInd
          ? newArray.slice(firstInd, secondInd)
          : newArray.slice(secondInd, firstInd);
        setSelectedFiles(newArray);
      } else {
        newArray.splice(newArray.indexOf(props.file), 1);
        setSelectedFiles(newArray);
      }
    } else {
      setSelectedFiles([props.file]);
    }
  };

  const setClassName = () => {
    if (selectedFiles.includes(props.file)) {
      if (isCut) {
        return "table-row selected-table-row cut-table-row";
      }
      return "table-row selected-table-row";
    }
    return "table-row";
  };

  return (
    <div
      id={props.file.id}
      className={setClassName()}
      onContextMenu={(event) => {
        handleContextMenu(event);
      }}
      onClick={
        ShowWindowDimensions() < 900 ? null : (event) => handleSelection(event)
      }
    >
      <div
        onDoubleClick={() => loadData()}
        onClick={ShowWindowDimensions() < 900 ? () => loadData() : null}
        className="filename-cell table-cell"
      >
        <div className="filename-text">
          {props.file.directory ? (
            <img width="21,5px" height="27px" src={DirectoryImg} alt="DIR" />
          ) : (
            <img width="21,5px" height="27px" src={FileImg} alt="FILE" />
          )}
          <span className="filename cell-span">
            &nbsp;&nbsp;
            {isRename && currentFile.id === props.file.id ? (
              <ClickAwayListener onClickAway={() => setIsRename(false)}>
                <input
                  className="rename-input"
                  type="text"
                  placeholder="new name"
                  defaultValue={props.file.filename}
                  selected="selected"
                  autoFocus
                  onFocus={(e) => e.target.select()}
                  onBlur={(e) => renameFile(e)}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.keyCode === 13) renameFile(e);
                  }}
                />
              </ClickAwayListener>
            ) : (
              props.file.filename
            )}
          </span>
        </div>
      </div>
      <div
        align="left"
        onDoubleClick={() => loadData()}
        className={
          ShowWindowDimensions() < 666 ? "hidden-div" : "date-cell table-cell"
        }
      >
        <span className="date cell-span">{props.file.modificationDate}</span>
      </div>
      <div
        align="left"
        onDoubleClick={() => loadData()}
        className={
          ShowWindowDimensions() < 666 ? "hidden-div" : "type-cell table-cell"
        }
      >
        <span className="type cell-span">{props.file.type}</span>
      </div>
      <div
        align="left"
        onDoubleClick={() => loadData()}
        className={
          ShowWindowDimensions() < 666
            ? "hidden-div"
            : "extension-cell table-cell"
        }
      >
        <span className="extension cell-span">
          {props.file.extension ? props.file.extension : " "}
        </span>
      </div>
      <div
        align="left"
        onDoubleClick={() => loadData()}
        className={
          ShowWindowDimensions() < 666 ? "hidden-div" : "size-cell table-cell"
        }
      >
        <span className="size cell-span">
          {!props.file.directory ? props.file.size : " "}
        </span>
      </div>
      <div
        align="left"
        className={
          ShowWindowDimensions() < 666 ? "hidden-div" : "shared-cell table-cell"
        }
      >
        <span className="shared cell-span">
          <img
            width="19,5px"
            height="14px"
            alt={props.file.shared ? "yes" : "no"}
            src={props.file.shared ? TickedBoxImg : BoxImg}
            onClick={() => shareFile()}
          />
        </span>
      </div>
    </div>
  );
};

export default File;
