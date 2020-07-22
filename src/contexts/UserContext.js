import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [roles, setRoles] = useState(localStorage.getItem("roles"));

  const [viewedUser, setViewedUser] = useState(username);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_VERIFY_USER_URL,
      withCredentials: true,
    })
      .catch((error) => {
        setUsername(localStorage.getItem("username"));
      })
      .then((resp) => {
        if (resp) {
          setUsername(resp.data);
          setViewedUser(resp.data);
        }
      });
  }, [setUsername]);

  const loadUsers = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_USERS_URL,
      withCredentials: true,
    })
      .catch((error) => {
        setUsers([]);
      })
      .then((resp) => {
        if (resp) {
          setUsers(resp.data);
        }
      });
  };

  const loadViewedUser = (viewedUsername = username) => {
    axios({
      method: "get",
      url: process.env.REACT_APP_USERS_URL + "/" + viewedUsername,
      withCredentials: true,
    })
      .catch((error) => {
        alert("No such user");
      })
      .then((resp) => {
        if (resp) {
          setViewedUser(resp.data);
        }
      });
  };

  const renameCurrentUser = (newName) => {
    const data = {
      id: null,
      username: newName,
    };
    axios({
      method: "post",
      url: process.env.REACT_APP_USERS_URL + "/delete",
      withCredentials: true,
      data: data,
    })
      .catch((error) => {
        alert("Cannot rename!");
      })
      .then((resp) => {
        setViewedUser(resp.data);
      });
  };

  const deleteAccount = () => {
    axios({
      method: "post",
      url: process.env.REACT_APP_USERS_URL + "/delete",
      withCredentials: true,
    })
      .catch((error) => {
        alert("No such user");
      })
      .then((resp) => {
        if (resp) {
        }
      });
  };

  return (
    <UserContext.Provider
      value={{
        user: username,
        setUser: setUsername,
        roles: roles,
        setRoles: setRoles,
        viewedUser: viewedUser,
        setViewedUser: setViewedUser,
        users: users,
        setUsers: setUsers,
        loadUsers: loadUsers,
        loadViewedUser: loadViewedUser,
        renameCurrentUser: renameCurrentUser,
        deleteAccount: deleteAccount,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
