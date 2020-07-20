import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Upload from "../upload/Upload";

import FileList from "./FileList";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useLoading, LoadingScreen } from "../../contexts/Loading";

import "./styles/FileManagerStyle.css";
import "./styles/ToolbarStyle.css";
import FileManagerContainer from "../container/FileManagerContainer";
import { FMContext } from "../../contexts/FMContext";
import { ContextMenuContext } from "../../contexts/ContextMenuContext";

const FileManager = (props) => {
  const { loading, setLoading } = useLoading();
  const [user, setUser] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const {
    openFile,
    currentFile,
    setCurrentFile,
    setIsRename,
    copy,
    cut,
    clipboard,
    paste,
    remove,
    share,
    addFolder,
    download,
    showUpload,
    setShowUpload,
  } = useContext(FMContext);
  const { currentMenu, setOptionClicked } = useContext(ContextMenuContext);

  useEffect(() => {
    setCurrentFile("root");
    axios({
      method: "get",
      url: process.env.REACT_APP_USER_URL,
      withCredentials: true,
    })
      .catch((error) => {
        setLoading(false);
      })
      .then((resp) => {
        setLoading(false);
        if (resp) {
          setUser(resp.data);
        }
      });
  }, [setCurrentFile, setUser, setLoading, history]);

  const giveContextMenu = () => {
    const contextMenuItems = [];
    if (currentMenu === "file-contextmenu") {
      if (currentFile["directory"]) {
        contextMenuItems.push({
          text: "Open",
          id: "c-m-open",
          onClick: () => {
            setOptionClicked(true);
            openFile();
          },
        });
      } else {
        contextMenuItems.push({
          text: "Download",
          id: "c-m-open",
          onClick: () => {
            setOptionClicked(true);
            download();
          },
        });
      }
      contextMenuItems.push.apply(contextMenuItems, [
        {
          text: "Rename",
          id: "c-m-rename",
          onClick: () => {
            setOptionClicked(true);
            setIsRename(true);
          },
        },
        {
          text: "Cut",
          id: "c-m-cut",
          onClick: () => {
            setOptionClicked(true);
            cut();
          },
        },
        {
          text: "Copy",
          id: "c-m-copy",
          onClick: () => {
            setOptionClicked(true);
            copy();
          },
        },
      ]);
      if (
        clipboard !== null &&
        currentFile["directory"] &&
        !clipboard.includes(currentFile)
      )
        contextMenuItems.push({
          text: "Paste",
          id: "c-m-paste",
          onClick: () => {
            setOptionClicked(true);
            paste(false);
          },
        });
      contextMenuItems.push.apply(contextMenuItems, [
        {
          text: "Delete",
          id: "c-m-delete",
          onClick: () => {
            setOptionClicked(true);
            remove();
          },
        },
      ]);
      if (currentFile["shared"] === true) {
        contextMenuItems.push({
          text: "Stop sharing",
          id: "c-m-share",
          onClick: () => {
            setOptionClicked(true);
            share();
          },
        });
      } else {
        contextMenuItems.push({
          text: "Share",
          id: "c-m-share",
          onClick: () => {
            setOptionClicked(true);
            share();
          },
        });
      }
    } else {
      contextMenuItems.push({
        text: "New folder",
        id: "k-9",
        onClick: () => {
          addFolder();
        },
      });
      if (clipboard !== null)
        contextMenuItems.push({
          text: "Paste",
          id: "c-m-paste",
          onClick: () => {
            paste(true);
          },
        });
    }
    return contextMenuItems;
  };

  const handleAddFolder = () => {
    addFolder();
  };

  if (loading) return <LoadingScreen />;
  if (!user) {
    return (
      <div id="no-user-fm" style={{ height: "100vh" }}>
        <div className="fm-title">File Manager</div>
        <div style={{ paddingLeft: "20px" }}>
          <p>
            You must be logged in to use the FileManager.&nbsp;&nbsp;
            <Link to="/sign-in">{"Log in now!"}</Link>
          </p>
          <p>
            If you have no account yet, then do not hesitate to make
            one!&nbsp;&nbsp;
            <Link to={{ pathname: "/sign-up", prevPath: location.pathname }}>
              {"Make an account now!"}
            </Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <div id="user-fm">
      <FileManagerContainer
        id="file-manager-operations"
        menuItems={giveContextMenu()}
      >
        <div className="fm-title">File Manager</div>
        <div className="toolbar">
          <div style={{ paddingRight: "10px" }}>
            <button className="toolbar-btn" onClick={() => setShowUpload(true)}>
              Upload files
            </button>
          </div>
          <button className="toolbar-btn" onClick={() => handleAddFolder()}>
            Create Folder
          </button>
        </div>
        {showUpload ? <Upload /> : null}
        <FileList />
      </FileManagerContainer>
    </div>
  );
};

export default FileManager;
