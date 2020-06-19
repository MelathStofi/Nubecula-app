import React, { useEffect, useContext } from "react";
import axios from "axios";

import { FilesContext } from "../../contexts/FilesContext";

const File = (props) => {
  return (
    <tr>
      <td>{props.file.filename}</td>
      <td>{props.file.creationDate}</td>
      <td>{props.file.type}</td>
      <td>{props.file.extension ? props.file.extension : ""}</td>
      <td>{props.file.size ? props.file.size : ""}</td>
      <td>{props.file.shared}</td>
    </tr>
  );
};

export default File;
