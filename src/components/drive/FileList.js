import React, { useEffect, useContext } from "react";
import axios from "axios";

import File from "./File";
import { FilesContext } from "../../contexts/FilesContext";

const FileList = (props) => {
  const { files, setFiles } = useContext(FilesContext);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    }).then((resp) => {
      if (resp) {
        setFiles(resp.data);
      }
      console.log(resp.data);
    });
  }, [setFiles]);

  const loadDirectory = (file) => {
    if (file.directory) {
      axios({
        method: "get",
        url: process.env.REACT_APP_BASE_URL + "/" + file.id,
        withCredentials: true,
      }).then((resp) => {
        if (resp) {
          setFiles(resp.data);
        }
        console.log(resp.data);
      });
    }
  };

  return files.map((file) => <File file={file} />);
};

export default FileList;
