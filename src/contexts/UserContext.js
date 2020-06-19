import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [roles, setRoles] = useState(localStorage.getItem("roles"));

  return (
    <UserContext.Provider
      value={{
        username: username,
        setUsername: setUsername,
        roles: roles,
        setRoles: setRoles,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
