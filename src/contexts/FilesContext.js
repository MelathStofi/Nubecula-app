import React, { useState, createContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const FilesContext = createContext();

export const FilesProvider = (props) => {
  const [files, setFiles] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);
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
          search: id ? "?id=" + id : "",
        });
      }
    });
  };

  const searchFilesAndSet = async (searched) => {
    if (searched !== "") {
      const resp = await getSearchedFiles(searched, "false");
      setFiles(resp);
      history.push({
        pathname: "/file-manager",
        search: "?search=" + searched,
      });
    }
  };

  const getSearchedFiles = async (searched, anywhere) => {
    const resp = await axios({
      method: "get",
      url:
        process.env.REACT_APP_BASE_URL +
        "?search=" +
        searched +
        "&anywhere=" +
        anywhere,
      withCredentials: true,
    });
    return await resp.data;
  };

  return (
    <FilesContext.Provider
      value={{
        files: files,
        setFiles: setFiles,
        loadFiles: loadFiles,
        searchFilesAndSet: searchFilesAndSet,
        getSearchedFiles: getSearchedFiles,
        searchedFiles: searchedFiles,
        setSearchedFiles: setSearchedFiles,
      }}
    >
      {props.children}
    </FilesContext.Provider>
  );
};
