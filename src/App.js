import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import MainPage from "./components/MainPage";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import Drive from "./components/drive/Drive";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <SideBar />
        <div style={{ margin: "0 15%" }}>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/drive" component={Drive} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
