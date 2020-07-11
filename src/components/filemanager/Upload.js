import React, { useRef, useContext, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FilesContext } from "../../contexts/FilesContext";

import { XIcon } from "./styles/FileManagerStyle";

const Upload = () => {
  const fileManagerUrl = process.env.REACT_APP_BASE_URL;
  const [uploadFiles, setUploadFiles] = useState([]);
  const { setFiles } = useContext(FilesContext);
  const fileInput = useRef(null);

  const handleOnChange = (props) => {
    const currFiles = [];
    for (let i = 0; i < props.length; i++) {
      currFiles.push(props[i]);
    }
    setUploadFiles(currFiles);
  };

  const upload = () => {
    fileInput.current.value = "";
    const data = new FormData();

    for (let i = 0; i < uploadFiles.length; i++) {
      data.append("files", uploadFiles[i]);
    }

    axios({
      method: "post",
      url: fileManagerUrl,
      data: data,
      withCredentials: true,
    })
      .catch((error) => {
        //console.clear();
        console.log("You cannot upload file");
      })
      .then((resp) => {
        if (resp) {
          console.log(resp.data);
          setUploadFiles([]);
        }
      });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>+</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>File to upload:</td>
            <td>
              <input
                type="file"
                name="fileinput"
                multiple
                onChange={(e) => handleOnChange(e.target.files)}
                ref={fileInput}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="submit" value="Upload" onClick={() => upload()} />
            </td>
          </tr>
        </tbody>
      </table>
      <ul>
        {uploadFiles.map((file) => (
          <li key={uuidv4()}>
            {file["name"]}&nbsp;
            <XIcon />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Upload;
