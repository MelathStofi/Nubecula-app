import React, { useContext, useState } from "react";
import Dropzone from "./Dropzone";
import Progress from "./Progress";
import "./styles/UploadStyle.css";
import { FMContext } from "../../contexts/FMContext";
import { useLocation } from "react-router-dom";
import { FilesContext } from "../../contexts/FilesContext";
import { UserContext } from "../../contexts/UserContext";

const Upload = (props) => {
  var respFiles = [];
  const { files, setFiles } = useContext(FilesContext);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [successfullyUploaded, setSuccessfullyUploaded] = useState(false);
  const { setShowUpload } = useContext(FMContext);
  const { loadCurrentUser } = useContext(UserContext);
  const location = useLocation();

  function onFilesAdded(files) {
    setUploadedFiles(uploadedFiles.concat(files));
  }

  const uploadFiles = async () => {
    setUploadProgress({});
    setUploading(true);
    const promises = [];
    uploadedFiles.forEach((file) => {
      promises.push(sendRequest(file));
    });
    try {
      await Promise.all(promises);
      setTimeout(() => {
        const newFiles = files.concat(respFiles);
        setFiles(newFiles);
        loadCurrentUser();
      }, 2000);
      setSuccessfullyUploaded(true);
      setUploading(false);
    } catch (e) {
      // not ready
      alert("Upload failed");
      setSuccessfullyUploaded(true);
      setUploading(false);
    }
  };

  const sendRequest = (file) => {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.responseType = "json";
      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const copy = { ...uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100,
          };
          setUploadProgress(copy);
        }
      });

      req.upload.addEventListener("load", (event) => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        setUploadProgress(copy);
        resolve(req.response);
      });

      req.upload.addEventListener("error", (event) => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        setUploadProgress(copy);
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file);

      let id = new URLSearchParams(location.search).get("id");
      if (id == null) id = "";
      req.open("POST", process.env.REACT_APP_BASE_URL + "/" + id);
      req.withCredentials = true;

      req.onload = () => {
        const resp = req.response;
        respFiles = [...respFiles, resp];
      };

      req.send(formData);
    });
  };

  const renderProgress = (file) => {
    const progress = uploadProgress[file.name];
    if (uploading || successfullyUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={progress ? progress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity: progress && progress.state === "done" ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  };

  const renderActions = () => {
    if (successfullyUploaded) {
      return (
        <button
          className="upload-btn"
          onClick={() => {
            setUploadedFiles([]);
            setSuccessfullyUploaded(false);
          }}
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          className="upload-btn"
          disabled={uploadedFiles.length < 0 || uploading}
          onClick={() => uploadFiles()}
        >
          Upload
        </button>
      );
    }
  };

  const getSizeOfFiles = () => {
    let size = 0;
    const filesClone = uploadedFiles.slice();
    for (let file of filesClone) {
      size += file.size;
    }
    if (size >= 1000) {
      if (size >= 1000000) {
        if (size >= 1000000000) {
          return <div>{(Math.round(size) / 1000000000).toFixed(2)} GB</div>;
        }
        return <div>{(Math.round(size) / 1000000).toFixed(2)} MB</div>;
      }
      return <div>{(Math.round(size) / 1000).toFixed(0)} KB</div>;
    }
    return <div>{size} B</div>;
  };

  return (
    <div className="upload-card">
      <div className="Upload">
        <div className="Upload-header">
          <span className="Title">Upload Files</span>
        </div>
        <div className="Content">
          <div>
            <Dropzone
              onFilesAdded={onFilesAdded}
              disabled={uploading || successfullyUploaded}
            />
          </div>
          <div className="Files">
            {uploadedFiles.map((file) => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>

        <div className="Actions">{renderActions()}</div>
        <div>{getSizeOfFiles()}</div>
      </div>
      <span className="Close" onClick={() => setShowUpload(false)}>
        X
      </span>
    </div>
  );
};

export default Upload;
