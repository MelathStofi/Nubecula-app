import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import FileList from "./FileList";

const Drive = () => {
  const driveUrl = process.env.REACT_APP_BASE_URL;
  const [files, setFiles] = useState([]);
  const fileInput = useRef(null);

  const handleOnChange = (props) => {
    const currFiles = [];
    for (let i = 0; i < props.length; i++) {
      currFiles.push(props[i]);
    }
    setFiles(currFiles);
  };

  const upload = () => {
    fileInput.current.value = "";
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("files", files[i]);
    }

    axios({
      method: "post",
      url: driveUrl,
      data: data,
      withCredentials: true,
    })
      .catch((error) => {
        //console.clear();
        console.log("You cannot upload file");
      })
      .then((resp) => {
        setFiles([]);
        console.log(files);
        if (resp) console.log(resp.data);
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
        {files.map((file) => (
          <li key={uuidv4()}>{file["name"]}</li>
        ))}
      </ul>
      <table>
        <FileList />
      </table>
    </div>
  );
};

export default Drive;
