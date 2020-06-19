import React, { useState, createContext } from "react";

export const FilesContext = createContext();

export const FilesProvider = (props) => {
  const [files, setFiles] = useState([]);

  return (
    <FilesContext.Provider
      value={{
        files: files,
        setFiles: setFiles,
      }}
    >
      {props.children}
    </FilesContext.Provider>
  );
};
