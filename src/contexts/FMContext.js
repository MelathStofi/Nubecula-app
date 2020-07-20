import React, { useState, createContext, useContext } from "react";
import axios from "axios";
import { FilesContext } from "./FilesContext";
import { useLocation } from "react-router-dom";

export const FMContext = createContext();

export const FileManagerProvider = (props) => {
  const [currentFile, setCurrentFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [clipboard, setClipboard] = useState(null);
  const [isCut, setIsCut] = useState(false);
  const [newName, setNewName] = useState("");
  const [isRename, setIsRename] = useState(false);
  const { loadFiles, files, setFiles } = useContext(FilesContext);
  const [name, setName] = useState("");
  const [isAddDir, setIsAddDir] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const location = useLocation();

  const sendData = async (method, url, data) => {
    const resp = await axios({
      method: method,
      url: url,
      withCredentials: true,
      data: data,
    });
    return await resp.data;
  };

  const openFile = () => {
    if (currentFile.directory) loadFiles(currentFile.url, currentFile.id);
  };

  const rename = async () => {
    setIsRename(false);
    const data = {
      id: currentFile.id,
      name: newName === "" ? currentFile.filename : newName,
    };
    try {
      const resp = sendData(
        "put",
        process.env.REACT_APP_BASE_URL + "/" + currentFile.id,
        data
      );
      if (resp) {
        return resp;
      }
    } catch {
      console.log("nem joló");
    }
  };

  const copy = () => {
    setClipboard(selectedFiles);
    setIsCut(false);
  };

  const cut = () => {
    setClipboard(selectedFiles);
    setIsCut(true);
  };

  const paste = async (isLoosePaste) => {
    let data;
    if (isLoosePaste) {
      data = {
        files: clipboard,
        targetDirId: location.search.slice(4),
      };
    } else {
      data = {
        files: clipboard,
        targetDirId: currentFile.id,
      };
    }

    try {
      let resp;
      if (!isCut) {
        resp = await sendData("put", process.env.REACT_APP_COPY_URL, data);
      } else {
        resp = await sendData("put", process.env.REACT_APP_REPLACE_URL, data);
      }
      if (resp) {
        let newArray = files.concat(resp);
        setSelectedFiles(resp);
        setFiles(newArray);
      }
    } catch {
      console.log("nem joló");
    }
  };

  const remove = () => {
    const deletedFiles = selectedFiles.slice();
    let filesClone = files.slice();
    for (let deletedFile of deletedFiles) {
      filesClone = filesClone.filter((file) => deletedFile.id !== file.id);
    }
    setFiles(filesClone);
    try {
      deletedFiles.map(async (file) => {
        await sendData(
          "delete",
          process.env.REACT_APP_BASE_URL + "/" + file["id"],
          null
        );
      });
    } catch {
      console.log("nem joló");
    }
  };

  const share = (fileId = currentFile.id) => {
    const index = files.indexOf(currentFile);
    let newFile = Object.assign({}, files[index]);
    newFile["shared"] = !currentFile.shared;
    let newArray = [...files];
    newArray[index] = newFile;
    setFiles(newArray);
    try {
      sendData("put", process.env.REACT_APP_SHARE_URL + "/" + fileId, null);
    } catch {
      console.log("nem joló");
    }
  };

  const addFolder = async () => {
    const data = {
      id: null,
      name: "New folder",
    };
    const resp = await sendData(
      "post",
      process.env.REACT_APP_BASE_URL +
        "/directories/" +
        location.search.slice(4),
      data
    );
    if (resp) {
      const newArray = files.slice();
      newArray.unshift(resp);
      setFiles(newArray);
      setCurrentFile(resp);
      setIsRename(true);
    }
    setIsAddDir(false);
  };

  const FileDownload = require("js-file-download");
  const download = () => {
    const filename = currentFile.filename + "." + currentFile.extension;
    sendData("get", currentFile.url).then((resp) => {
      FileDownload(resp, filename);
    });
  };

  return (
    <FMContext.Provider
      value={{
        currentFile: currentFile,
        setCurrentFile: setCurrentFile,
        selectedFiles: selectedFiles,
        setSelectedFiles: setSelectedFiles,
        clipboard: clipboard,
        openFile: openFile,
        rename: rename,
        newName: newName,
        setNewName: setNewName,
        isRename: isRename,
        setIsRename: setIsRename,
        copy: copy,
        cut: cut,
        paste: paste,
        remove: remove,
        share: share,
        addFolder: addFolder,
        name: name,
        setName: setName,
        isAddDir: isAddDir,
        setIsAddDir: setIsAddDir,
        download: download,
        showUpload: showUpload,
        setShowUpload: setShowUpload,
      }}
    >
      {props.children}
    </FMContext.Provider>
  );
};
