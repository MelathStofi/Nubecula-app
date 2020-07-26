import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import MainPage from "./MainPage";
import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";
import FileManager from "./filemanager/FileManager";
import { useLoading } from "../contexts/Loading";

const Routes = (props) => {
  const { loading } = useLoading();
  return (
    <div className="container">
      <Header />
      <SideBar />
      <div className={loading ? "" : "content"}>
        <Route exact path="/file-manager" component={FileManager} />
        <Route exact path="/" component={MainPage} />
      </div>
    </div>
  );
};

export default Routes;
