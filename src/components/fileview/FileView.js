import React from "react";
import { ClickAwayListener } from "@material-ui/core";

import "./styles/FileViewStyle.css";

const FileView = ({ file, types, type, showFile, setShowFile }) => {
  const getFileView = () => {
    if (type === types.audio)
      return (
        <audio controls autoPlay className="audio-controls">
          <source
            className="file-view"
            src={process.env.REACT_APP_PUBLIC_BASE_URL + "/media/" + file.id}
            type={file.type}
            crossOrigin="use-credentials"
          />
          Your browser does not support the audio tag.
        </audio>
      );
    else if (type === types.video)
      return (
        <video
          className="file-view"
          autoPlay={true}
          controls
          src={process.env.REACT_APP_PUBLIC_BASE_URL + "/media/" + file.id}
          type={file.type}
          crossOrigin="use-credentials"
        />
      );
    else if (type === types.image)
      return <img className="file-view" src={file.url} alt="Cannot view" />;
    else if (type === types.text)
      return (
        <iframe
          src={process.env.REACT_APP_PUBLIC_BASE_URL + "/texts/" + file.id}
          title={file.filename}
        ></iframe>
      );
    else if (file.directory) return null;
    else return null;
  };

  const handleClickAway = () => {
    setShowFile(false);
  };

  if (!showFile) return null;
  return (
    <ClickAwayListener onClickAway={() => handleClickAway()}>
      <div className="file-view-card">
        <div>{file.filename}</div>
        {getFileView()}
      </div>
    </ClickAwayListener>
  );
};

export default FileView;
