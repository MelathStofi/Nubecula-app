import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const AppOptionsContext = createContext();

export const AppOptionsProvider = (props) => {
  const [showAppOptions, setShowAppOptions] = useState(false);
  const { setUser } = useContext(UserContext);

  const logout = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_SIGN_OUT_URL,
      withCredentials: true,
    }).then((resp) => {
      if (resp) {
        setUser(null);
        window.location.reload();
      }
    });
  };

  return (
    <AppOptionsContext.Provider
      value={{
        showAppOptions: showAppOptions,
        setShowAppOptions: setShowAppOptions,
        logout: logout,
      }}
    >
      {props.children}
    </AppOptionsContext.Provider>
  );
};
