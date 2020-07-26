import React, { useEffect, useContext } from "react";
import axios from "axios";

import FileList from "./FileList";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useLoading, LoadingScreen } from "../../contexts/Loading";

import "./styles/FileManagerStyle.css";

import FileManagerContainer from "../container/FileManagerContainer";
import { FMContext } from "../../contexts/FMContext";
import { ContextMenuContext } from "../../contexts/ContextMenuContext";
import ToolBar from "../../toolbar/ToolBar";
import SideBar from "../sidebar/SideBar";
import { FilesContext } from "../../contexts/FilesContext";
import { UserContext } from "../../contexts/UserContext";

const FileManager = (props) => {
  const { loading, setLoading } = useLoading();
  const { user, setUser } = useContext(UserContext);
  const {
    files,
    setFiles,
    queries,
    setQueries,
    showTrashBin,
    setShowTrashBin,
  } = useContext(FilesContext);
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
    moveToTrash,
    share,
    addFolder,
    download,
    restore,
    restoreAll,
    remove,
    removeAll,
    selectAll,
  } = useContext(FMContext);
  const { currentMenu, setOptionClicked } = useContext(ContextMenuContext);

  useEffect(() => {
    // load currrent user
    setCurrentFile("root");
    axios({
      method: "get",
      url: process.env.REACT_APP_CURRENT_USER_URL,
      withCredentials: true,
    })
      .catch((error) => {
        console.log("no user signed in");
        setLoading(false);
      })
      .then((resp) => {
        if (resp) {
          setUser(resp.data);
        }
      });
    // load files
    let id = new URLSearchParams(location.search).get("id");
    let search = new URLSearchParams(location.search).get("search");
    if (id == null) id = "";
    if (props.match.params.param === "trash-bin") {
      axios({
        method: "get",
        url:
          Array.isArray(queries) && queries.length !== 0
            ? process.env.REACT_APP_TRASH_BIN_URL +
              "/" +
              id +
              "?sort=" +
              queries[0] +
              "&desc=" +
              queries[1]
            : process.env.REACT_APP_TRASH_BIN_URL,
        withCredentials: true,
      }).then((resp) => {
        if (resp) {
          setFiles(resp.data);
          setShowTrashBin(true);
          history.push({
            pathname: "/file-manager/trash-bin",
          });
          setLoading(false);
        }
      });
    } else if (search != null) {
      axios({
        method: "get",
        url:
          process.env.REACT_APP_BASE_URL +
          "?search=" +
          search +
          "&anywhere=false",
        withCredentials: true,
      }).then((resp) => {
        if (resp) {
          setFiles(resp.data);
          setLoading(false);
        }
      });
    } else {
      axios({
        method: "get",
        url:
          Array.isArray(queries) && queries.length !== 0
            ? process.env.REACT_APP_BASE_URL +
              "/" +
              id +
              "?sort=" +
              queries[0] +
              "&desc=" +
              queries[1]
            : process.env.REACT_APP_BASE_URL + "/" + id,
        withCredentials: true,
      }).then((resp) => {
        if (resp) {
          setFiles(resp.data);
          setShowTrashBin(false);
          setLoading(false);
        }
      });
    }
  }, [
    history,
    location.search,
    props.match.params.param,
    queries,
    setCurrentFile,
    setFiles,
    setLoading,
    setShowTrashBin,
    setUser,
  ]);

  const giveContextMenu = () => {
    const contextMenuItems = [];
    if (props.match.params.param === "trash-bin") {
      if (currentMenu === "file-contextmenu") {
        contextMenuItems.push.apply(contextMenuItems, [
          {
            text: "Restore",
            id: "c-m-restore",
            onClick: () => {
              setOptionClicked(true);
              restore();
            },
          },
          {
            text: "Delete forever",
            id: "c-m-delete",
            onClick: () => {
              setOptionClicked(true);
              remove();
            },
          },
        ]);
      } else {
        contextMenuItems.push.apply(contextMenuItems, [
          {
            text: "Restore all",
            id: "c-m-restore",
            onClick: () => {
              setOptionClicked(true);
              restoreAll();
            },
          },
          {
            text: "Delete all",
            id: "c-m-delete",
            onClick: () => {
              setOptionClicked(true);
              removeAll();
            },
          },
        ]);
      }
    } else {
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
        if (files.length !== 0) {
          contextMenuItems.push({
            text: "Select all",
            id: "c-m-select-all",
            onClick: () => {
              setOptionClicked(true);
              selectAll();
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
            text: "Move to trash",
            id: "c-m-trash",
            onClick: () => {
              setOptionClicked(true);
              moveToTrash();
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
          id: "c-m-create-folder",
          onClick: () => {
            addFolder();
          },
        });
        if (files.length !== 0) {
          contextMenuItems.push({
            text: "Select all",
            id: "c-m-select-all",
            onClick: () => {
              setOptionClicked(true);
              selectAll();
            },
          });
        }
        if (clipboard !== null)
          contextMenuItems.push({
            text: "Paste",
            id: "c-m-paste",
            onClick: () => {
              paste(true);
            },
          });
      }
    }
    return contextMenuItems;
  };

  if (loading) return <LoadingScreen />;
  return (
    <React.Fragment>
      {!user ? (
        <div id="no-user-fm" style={{ height: "100vh" }}>
          <div className="fm-title">File Manager</div>
          <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
            <p>
              You must be logged in to use the File Manager.&nbsp;&nbsp;
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
      ) : (
        <React.Fragment>
          <SideBar />
          <div id="user-fm">
            <FileManagerContainer
              id="file-manager-operations"
              menuItems={giveContextMenu()}
            >
              <ToolBar
                user={user}
                auth={true}
                showTrashBin={showTrashBin}
                itemNum={files.length}
              />
              <FileList
                files={files}
                pathWithKeyId={"/file-manager?id="}
                queries={queries}
                setQueries={setQueries}
                trashBin={showTrashBin}
              />
            </FileManagerContainer>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FileManager;
