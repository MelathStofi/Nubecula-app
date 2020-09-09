import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Auth from "./components/auth/Auth";
import MainPage from "./components/MainPage";
import FileManager from "./components/filemanager/FileManager";

import { UserProvider } from "./contexts/UserContext";
import { FilesProvider } from "./contexts/FilesContext";
import { LoadingContext } from "./contexts/Loading";
import { FileManagerProvider } from "./contexts/FMContext";
import { ContextMenuProvider } from "./contexts/ContextMenuContext";
import { AppOptionsProvider } from "./contexts/AppOptionsContext";
import Users from "./components/user/Users";
import PublicFileExplorer from "./components/user/PublicFileExplorer";
import Header from "./components/header/Header";
import AppOptions from "./components/appoptions/AppOptions";
import { FoldersProvider } from "./contexts/FoldersContext";

function App(props) {
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <LoadingContext.Provider
        value={{ loading: loading, setLoading: setLoading }}
      >
        <BrowserRouter>
          <UserProvider>
            <AppOptionsProvider>
              <FoldersProvider>
                <FilesProvider>
                  <FileManagerProvider>
                    <ContextMenuProvider>
                      <div className="container">
                        <Header />
                        <AppOptions />
                        <div className={isAuth || loading ? "" : "content"}>
                          <Switch>
                            <Route exact path="/">
                              <Redirect to="/file-manager" />
                            </Route>
                            <Route
                              path={["/sign-up", "/sign-in"]}
                              render={(props) => (
                                <Auth {...props} setIsAuth={setIsAuth} />
                              )}
                            />
                            <Route exact path="/index" component={MainPage} />
                            <Route
                              path={["/file-manager/:param", "/file-manager"]}
                              component={FileManager}
                            />
                            <Route exact path="/users" component={Users} />
                            <Route
                              exact
                              path="/users/:username"
                              component={PublicFileExplorer}
                            />
                          </Switch>
                        </div>
                      </div>
                    </ContextMenuProvider>
                  </FileManagerProvider>
                </FilesProvider>
              </FoldersProvider>
            </AppOptionsProvider>
          </UserProvider>
        </BrowserRouter>
      </LoadingContext.Provider>
    </div>
  );
}

export default App;
