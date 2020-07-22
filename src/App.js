import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from "./components/auth/Auth";
import MainPage from "./components/MainPage";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import FileManager from "./components/filemanager/FileManager";

import { UserProvider } from "./contexts/UserContext";
import { FilesProvider } from "./contexts/FilesContext";
import { LoadingContext } from "./contexts/Loading";
import { FileManagerProvider } from "./contexts/FMContext";
import { ContextMenuProvider } from "./contexts/ContextMenuContext";
import { AppOptionsProvider } from "./contexts/AppOptionsContext";
import AppOptions from "./components/appoptions/AppOptions";

function App(props) {
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <LoadingContext.Provider
        value={{ loading: loading, setLoading: setLoading }}
      >
        <BrowserRouter>
          <UserProvider>
            <AppOptionsProvider>
              <FilesProvider>
                <FileManagerProvider>
                  <ContextMenuProvider>
                    <Switch>
                      <Route exact path="/sign-up" component={Auth} />
                      <Route exact path="/sign-in" component={Auth} />

                      <div className="container">
                        <Header />

                        <AppOptions />
                        <div className={loading ? "" : "content"}>
                          <Route exact path="/index" component={MainPage} />
                          <Route
                            exact
                            path="/file-manager"
                            component={FileManager}
                          />
                        </div>
                      </div>
                    </Switch>
                  </ContextMenuProvider>
                </FileManagerProvider>
              </FilesProvider>
            </AppOptionsProvider>
          </UserProvider>
        </BrowserRouter>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
