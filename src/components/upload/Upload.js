import React, { Component, useContext } from "react";
import Dropzone from "./Dropzone";
import Progress from "./Progress";
import axios from "axios";
import "./styles/UploadStyle.css";
import { FMContext } from "../../contexts/FMContext";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullyUploaded: false,
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState((prevState) => ({
      files: prevState.files.concat(files),
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach((file) => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullyUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullyUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    // const data = new FormData();
    // data.append("files", file);

    // axios({
    //   method: "post",
    //   url: process.env.REACT_APP_BASE_URL,
    //   data: data,
    //   withCredentials: true,
    // })
    //   .catch((error) => {
    //     //console.clear();
    //     console.log("You cannot upload file");
    //   })
    //   .then((resp) => {
    //     if (resp) {
    //       setFiles([...files, uploadFiles]);
    //       setUploadFiles([]);
    //     }
    //   });
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100,
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", (event) => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("files", [file]);

      req.open("POST", process.env.REACT_APP_BASE_URL);
      req.send(formData);
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullyUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0,
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullyUploaded) {
      return (
        <button
          onClick={() =>
            this.setState({ files: [], successfullyUploaded: false })
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    return (
      <div className="upload-card">
        <div className="Upload">
          <div className="Upload-header">
            <span className="Title">Upload Files</span>
            <span
              className="Close"
              onClick={() => console.log("it should close but it doesn't")}
            >
              X
            </span>
          </div>
          <div className="Content">
            <div>
              <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={
                  this.state.uploading || this.state.successfullyUploaded
                }
              />
            </div>
            <div className="Files">
              {this.state.files.map((file) => {
                return (
                  <div key={file.name} className="Row">
                    <span className="Filename">{file.name}</span>
                    {this.renderProgress(file)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>
        </div>
      </div>
    );
  }
}

export default Upload;
