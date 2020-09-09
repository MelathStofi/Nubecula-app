import React, { createContext, useState } from "react";

export const FoldersContext = createContext();

export const FoldersProvider = (props) => {
  const [folders, setFolders] = useState([]);
  return (
    <FoldersContext.Provider
      value={{ folders: folders, setFolders: setFolders }}
    >
      {props.children}
    </FoldersContext.Provider>
  );
};
