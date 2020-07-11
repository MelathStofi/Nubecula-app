import React, { useState, useContext } from "react";
import axios from "axios";
import BoxImg from "./resources/box1-01.png";
import TickedBoxImg from "./resources/ticked_box.png";
import DirectoryImg from "./resources/directory.png";
import FileImg from "./resources/file.png";

import {
  SharedIcon,
  Tr,
  Td,
  OverflowText,
  FilenameTd,
  CreationDateTd,
} from "./styles/FileManagerStyle";

import { FilesContext } from "../../contexts/FilesContext";

const File = (props) => {
  const [file, setFile] = useState(props.file);
  const { loadFiles } = useContext(FilesContext);

  const loadData = () => {
    if (file.directory) {
      loadFiles(file.url, file.id);
    }
  };

  const share = (id) => {
    axios({
      method: "put",
      url: process.env.REACT_APP_BASE_URL + "/toggle-share/" + id,
      withCredentials: true,
    })
      .catch((error) => {
        //console.clear();
        console.log("You cannot share this file");
      })
      .then((resp) => {
        if (resp) {
          const newFile = Object.assign({}, file);
          newFile["shared"] = !file.shared;
          setFile(newFile);
        }
      });
  };

  return (
    <Tr>
      <FilenameTd onClick={() => loadData()}>
        <OverflowText>
          {file.directory ? (
            <img width="21,5px" height="27px" src={DirectoryImg} alt="DIR" />
          ) : (
            <img width="21,5px" height="27px" src={FileImg} alt="FILE" />
          )}
          {"  "}
          {file.filename}
        </OverflowText>
      </FilenameTd>
      <CreationDateTd onClick={() => loadData()}>
        <OverflowText>{file.createDate}</OverflowText>{" "}
      </CreationDateTd>
      <Td onClick={() => loadData()}>
        <OverflowText>{file.type}</OverflowText>
      </Td>
      <Td onClick={() => loadData()}>{file.extension ? file.extension : ""}</Td>
      <Td onClick={() => loadData()}>{file.size ? file.size : ""}</Td>
      <Td>
        {file.shared ? (
          <SharedIcon
            width="19,5px"
            height="14px"
            alt="yes"
            src={TickedBoxImg}
            onClick={() => share(file.id)}
          />
        ) : (
          <SharedIcon
            width="19,5px"
            height="14px"
            alt="no"
            src={BoxImg}
            onClick={() => share(file.id)}
          />
        )}
      </Td>
    </Tr>
  );
};

export default File;
