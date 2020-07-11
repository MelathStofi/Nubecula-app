import React, { useEffect, useState } from "react";
import axios from "axios";
import Upload from "./Upload";
import { NubeculaFileManager, Title } from "./styles/FileManagerStyle";

import FileList from "./FileList";
import { Link } from "react-router-dom";
import CreateFolder from "./CreateFolder";
import FileManagerContainer from "../container/FileManagerContainer.jsx";

const FileManager = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_USER_URL,
      withCredentials: true,
    })
      .catch((error) => {
        setLoading(false);
      })
      .then((resp) => {
        setLoading(false);
        if (resp) {
          setUser(resp.data);
        }
      });
  }, [setUser, setLoading]);

  if (loading) {
    return <div>loading...</div>;
  }
  if (!user) {
    return (
      <NubeculaFileManager>
        <Title>File Manager</Title>
        <p>
          You must be logged in to use the FileManager.&nbsp;&nbsp;
          <Link to="/sign-in">{"Log in now!"}</Link>
        </p>
        <p>
          If you have no account yet, then do not hesitate to make
          one!&nbsp;&nbsp;
          <Link to="/sign-in">{"Make an account now!"}</Link>
        </p>
        <FileManagerContainer></FileManagerContainer>
      </NubeculaFileManager>
    );
  }
  return (
    <NubeculaFileManager>
      <FileManagerContainer>
        <Title>File Manager</Title>
        <Upload />
        <CreateFolder />
        <FileList />
      </FileManagerContainer>
    </NubeculaFileManager>
  );
};

export default FileManager;
