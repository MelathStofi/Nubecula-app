import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import SignUp from "./components/security/SignUp";
import SignIn from "./components/security/SignIn";
import MainPage from "./components/MainPage";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={MainPage} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/sign-in" component={SignIn} />
      </BrowserRouter>
    </div>
  );
}

export default App;
