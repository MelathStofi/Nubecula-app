import React, { useEffect, useContext } from "react";
import axios from "axios";

import File from "./File";
import { FilesContext } from "../../contexts/FilesContext";
import { useLocation } from "react-router-dom";
import ShowWindowDimensions from "../WindowDimension";
import { ClickAwayListener } from "@material-ui/core";
import { FMContext } from "../../contexts/FMContext";
import { ContextMenuContext } from "../../contexts/ContextMenuContext";

const FileList = (props) => {
  const { files, setFiles } = useContext(FilesContext);
  const { setSelectedFiles } = useContext(FMContext);
  const { optionClicked, setOptionClicked } = useContext(ContextMenuContext);
  const location = useLocation();

  useEffect(() => {
    let id = new URLSearchParams(location.search).get("id");
    if (id == null) id = "";
    axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL + "/" + id,
      withCredentials: true,
    }).then((resp) => {
      if (resp) {
        setFiles(resp.data);
      }
    });
  }, [location, setFiles]);

  const handleClickAway = () => {
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
          <div className="filename-th th">
            <span className="head-span cell-span">Name</span>
          </div>
          <div className="date-th th">
            <span className="head-span cell-span">Modification Date</span>
          </div>
          <div className="type-th th">
            <span className="head-span cell-span">Type</span>
          </div>
          <div className="extension-th th">
            <span className="head-span cell-span">Extension</span>
          </div>
          <div className="size-th th">
            <span className="head-span cell-span">Size</span>
          </div>
          <div className="shared-th th">
            <span className="head-span cell-span">Shared</span>
          </div>
        </div>
      </div>

      <div className="t-body">
        <ClickAwayListener onClickAway={() => handleClickAway()}>
          <div>
            {files.map((file) => (
              <File file={file} key={file.id} />
            ))}
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};

export default FileList;
