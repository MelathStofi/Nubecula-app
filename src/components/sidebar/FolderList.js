import React, { useEffect, useState } from "react";
import Folder from "./Folder";
import axios from "axios";

const FolderList = ({ url }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: url,
      withCredentials: true,
    }).then((resp) => {
      setFolders(resp.data);
    });
    return () => setFolders([]);
  }, [setFolders, url]);

  return (
    <div className="folder-list">
      {folders.map((folder) => (
        <Folder key={folder.id} folder={folder} />
      ))}
    </div>
  );
};

export default FolderList;
