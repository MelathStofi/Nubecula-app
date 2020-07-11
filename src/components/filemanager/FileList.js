import React, { useEffect, useContext } from "react";
import axios from "axios";

import File from "./File";
import { FilesContext } from "../../contexts/FilesContext";
import {
  Table,
  THead,
  TBody,
  Th,
  FilenameTh,
  CreationDateTh,
} from "./styles/FileManagerStyle";

const FileList = (props) => {
  const { files, setFiles } = useContext(FilesContext);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASE_URL,
      withCredentials: true,
    }).then((resp) => {
      if (resp) {
        setFiles(resp.data);
      }
    });
  }, [setFiles]);

  return (
    <Table>
      <THead>
        <tr>
          <FilenameTh>Name</FilenameTh>
          <CreationDateTh>Creation Date</CreationDateTh>
          <Th>Type</Th>
          <Th>Extension</Th>
          <Th>Size</Th>
          <Th>Shared</Th>
        </tr>
      </THead>
      <TBody>
        {files.map((file) => (
          <File file={file} key={file.id} />
        ))}
      </TBody>
    </Table>
  );
};

export default FileList;
