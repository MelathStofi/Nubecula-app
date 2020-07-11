import React, { createContext, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [roles, setRoles] = useState(localStorage.getItem("roles"));

  const getUserName = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_USER_URL,
      withCredentials: true,
    }).then((resp) => {
      if (resp) {
        setUsername(resp.data);
        return username;
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        username: getUserName(),
        setUsername: setUsername,
        roles: roles,
        setRoles: setRoles,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
