import React, { useState } from "react";
import axios from "axios";

const Drive = () => {
  const driveUrl = process.env.REACT_APP_BASE_URL;
  const [files, setFiles] = useState([]);

  const upload = () => {
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
        if (resp) console.log(resp.data);
      });
  };

  return (
    <div>
      <table>
        <thead>+</thead>
        <tbody>
          <tr>
            <td>File to upload:</td>
            <td>
              <input
                type="file"
                name="fileinput"
                webkitdirectory
                multiple
                onChange={(e) => setFiles(e.target.files)}
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
    </div>
  );
};

export default Drive;
