import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { FilesContext } from "../../contexts/FilesContext";

const CreateFolder = () => {
  const [name, setName] = useState("");
  const [add, setAdd] = useState(false);
  const { files, setFiles } = useContext(FilesContext);
  const history = useHistory();

  const addFolder = () => {
    const data = {
      id: null,
      name: name,
    };
    if (!add) {
      setAdd(true);
    } else if (add) {
      axios({
        method: "post",
        url: process.env.REACT_APP_BASE_URL + "/directories",
        data: data,
        withCredentials: true,
      }).then((resp) => {
        console.log(resp.data);
        if (resp) {
          setFiles(...files, resp.data);
        }
      });
      setAdd(false);
    }
  };

  return (
    <div>
      {add ? (
        <React.Fragment>
          <input
            type="text"
            name="dirname"
            placeholder="folder name"
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => addFolder()}>Create Folder</button>
        </React.Fragment>
      ) : (
        <button onClick={() => addFolder()}>Create Folder</button>
      )}
    </div>
  );
};

export default CreateFolder;
