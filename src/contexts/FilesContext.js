import React, { useState, createContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const FilesContext = createContext();

export const FilesProvider = (props) => {
  const [files, setFiles] = useState([]);
  const history = useHistory();

  const loadFiles = (url, id) => {
    axios({
      method: "get",
      url: url,
      withCredentials: true,
    }).then((resp) => {
      if (resp) {
        setFiles(resp.data);
        history.push({
          pathname: "/file-manager",
          search: "?id=" + id,
        });
      }
      console.log(resp.data);
    });
  };

  return (
    <FilesContext.Provider
      value={{
        files: files,
        setFiles: setFiles,
        loadFiles: loadFiles,
      }}
    >
      {props.children}
    </FilesContext.Provider>
  );
};
