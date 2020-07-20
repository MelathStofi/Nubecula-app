import React from "react";

import { NubeculaSideBar, Link } from "./styles/SideBarStyle";
import { useLoading } from "../../contexts/Loading";

const SideBar = (props) => {
  const { loading } = useLoading();

  if (loading) return null;
  return (
    <React.Fragment>
      <NubeculaSideBar>
        <Link to="/file-manager">File Manager</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
      </NubeculaSideBar>
    </React.Fragment>
  );
};

export default SideBar;
