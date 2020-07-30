import React from "react";
import { ClickAwayListener } from "@material-ui/core";

import "./styles/FileViewStyle.css";

const FileView = ({ file, showFile, setShowFile }) => {
  const getFileView = () => {
    const types = {
      image: "image",
      audio: "audio",
      video: "video",
      app: "application",
      text: "text",
    };
    if (file.type.substring(0, types.audio.length) === types.audio)
      return (
        <audio controls>
          <source
            src={file.url}
            type={file.type}
            crossOrigin="use-credentials"
          />
          Your browser does not support the audio tag.
        </audio>
      );
    else if (file.type.substring(0, types.video.length) === types.video)
      return <video src={file.url} type={file.type} />;
    else if (file.type.substring(0, types.image.length) === types.image)
      return <img className="file-view" src={file.url} alt="Cannot view" />;
    else if (file.directory) return null;
    else return null;
  };

  const handleClickAway = () => {
    setShowFile(false);
  };

  if (!showFile) return null;
  return (
    <ClickAwayListener onClickAway={() => handleClickAway()}>
      <div className="file-view-card">{getFileView()}</div>
    </ClickAwayListener>
  );
};

export default FileView;
