import React, { useContext } from "react";

import File from "./File";
import ShowWindowDimensions from "../WindowDimension";
import { ClickAwayListener } from "@material-ui/core";
import { FMContext } from "../../contexts/FMContext";
import { ContextMenuContext } from "../../contexts/ContextMenuContext";

const FileList = ({ files, pathWithKeyId, queries, setQueries, trashBin }) => {
  const { setSelectedFiles, setIndexOfSelected } = useContext(FMContext);
  const { optionClicked, setOptionClicked } = useContext(ContextMenuContext);

  const handleClickAway = () => {
    setIndexOfSelected(null);
    if (!optionClicked) {
      setSelectedFiles([]);
    }
    setOptionClicked(false);
  };

  return (
    <div className="fm-table">
      <div
        className={ShowWindowDimensions() < 666 ? "hidden-t-head" : "t-head"}
      >
        <div className="table-head-row">
          <div
            className="filename-th th"
            onClick={() => setQueries(["filename", !queries[1]])}
          >
            <span className="head-span cell-span">Name</span>
          </div>
          <div className="date-th th">
            <span
              className="head-span cell-span"
              onClick={() => setQueries(["modificationDate", !queries[1]])}
            >
              Modification Date
            </span>
          </div>
          <div className="type-th th">
            <span
              className="head-span cell-span"
              onClick={() => setQueries(["type", !queries[1]])}
            >
              Type
            </span>
          </div>
          <div className="extension-th th">
            <span
              className="head-span cell-span"
              onClick={() => setQueries(["extension", !queries[1]])}
            >
              Extension
            </span>
          </div>
          <div className="size-th th">
            <span
              className="head-span cell-span"
              onClick={() => setQueries(["size", !queries[1]])}
            >
              Size
            </span>
          </div>
          <div className="shared-th th">
            <span
              className="head-span cell-span"
              onClick={() => setQueries(["shared", !queries[1]])}
            >
              Shared
            </span>
          </div>
        </div>
      </div>

      <div className="t-body">
        <ClickAwayListener onClickAway={() => handleClickAway()}>
          {files.length !== 0 ? (
            <div>
              {files.map((file) => (
                <File
                  file={file}
                  key={file.id}
                  pathWithKeyId={pathWithKeyId}
                  trashBin={trashBin}
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "20%" }}>
              Empty folder
            </div>
          )}
        </ClickAwayListener>
      </div>
    </div>
  );
};

export default FileList;
