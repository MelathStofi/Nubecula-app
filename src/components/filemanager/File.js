import React, { useState, useContext } from "react";
import BoxImg from "../../resources/box1-01.png";
import TickedBoxImg from "../../resources/ticked_box.png";
import DirectoryImg from "../../resources/directory.png";
import FileImg from "../../resources/file.png";

import { FilesContext } from "../../contexts/FilesContext";
import ShowWindowDimensions from "../WindowDimension";
import { FMContext } from "../../contexts/FMContext";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { ContextMenuContext } from "../../contexts/ContextMenuContext";

const File = (props) => {
  const [selected, setSelected] = useState(false);
  const { files, setFiles, loadFiles } = useContext(FilesContext);
  const {
    currentFile,
    setCurrentFile,
    selectFiles,
    isRename,
    selectedFiles,
    setIsRename,
    newName,
    setNewName,
    rename,
    isCut,
    share,
  } = useContext(FMContext);
  const { setCurrentMenu } = useContext(ContextMenuContext);

  const loadData = (e) => {
    if (props.file.directory) {
      loadFiles(props.file.url, props.file.id);
      setCurrentFile(props.file);
    }
  };

  const handleSelection = (e) => {
    files.indexOf(currentFile);
    setSelected(!selected);
    selectFiles(e, props.file);
  };

  const handleContextMenu = (e) => {
    if (!selectedFiles.includes(props.file)) handleSelection(e, props.file);
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
    share();
  };

  const setClassName = () => {
    if (selectedFiles.includes(props.file)) {
      return "table-row selected-table-row";
    }
    return "table-row";
  };

  return (
    <div
      id={props.file.id}
      className={setClassName()}
      onDoubleClick={(event) => loadData(event)}
      onContextMenu={(event) => {
        handleContextMenu(event);
      }}
    >
      <div
        onClick={
          ShowWindowDimensions() < 900
            ? null
            : (event) => handleSelection(event)
        }
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
        onClick={
          ShowWindowDimensions() < 900
            ? null
            : (event) => handleSelection(event)
        }
        className={
          ShowWindowDimensions() < 666 ? "hidden-div" : "date-cell table-cell"
        }
      >
        <span className="date cell-span">{props.file.modificationDate}</span>
      </div>
      <div
        align="left"
        onClick={
          ShowWindowDimensions() < 900
            ? null
            : (event) => handleSelection(event)
        }
        className={
          ShowWindowDimensions() < 666 ? "hidden-div" : "type-cell table-cell"
        }
      >
        <span className="type cell-span">
          {!props.file.directory ? props.file.type : "folder"}
        </span>
      </div>
      <div
        align="left"
        onClick={
          ShowWindowDimensions() < 900
            ? null
            : (event) => handleSelection(event)
        }
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
        onClick={
          ShowWindowDimensions() < 900
            ? null
            : (event) => handleSelection(event)
        }
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
