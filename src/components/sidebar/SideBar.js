import React from "react";

import { NubeculaSideBar, Link } from "./styles/SideBarStyle";

export default function SideBar() {
  return (
    <NubeculaSideBar>
      <Link to="/file-manager">File Manager</Link>
      <Link to="/">About</Link>
      <Link to="/">Contact</Link>
    </NubeculaSideBar>
  );
}
