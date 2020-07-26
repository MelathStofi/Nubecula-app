import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(localStorage.getItem("username"));
  const [roles, setRoles] = useState(localStorage.getItem("roles"));

  const [viewedUser, setViewedUser] = useState(user);
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios({
      method: "get",
      url: process.env.REACT_APP_CURRENT_USER_URL,
      withCredentials: true,
    })
      .catch((error) => {
        console.log("No user is signed in");
      })
      .then((resp) => {
        if (resp) {
          setUser(resp.data);
        }
      });
  }, [setUser]);

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

  const loadCurrentUser = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_CURRENT_USER_URL,
      withCredentials: true,
    })
      .catch((error) => {
        console.log("No user is signed in");
      })
      .then((resp) => {
        if (resp) {
          setUser(resp.data);
          console.log(resp.data);
        }
      });
  };

  const searchUsersAndSet = async (searched) => {
    if (searched !== "") {
      const resp = await getSearchedUsers(searched, "false");
      setUsers(resp);
      history.push({
        pathname: "/users",
        search: "?search=" + searched,
      });
    }
  };

  const getSearchedUsers = async (searched, anywhere) => {
    const resp = await axios({
      method: "get",
      url:
        process.env.REACT_APP_USERS_URL +
        "?search=" +
        searched +
        "&anywhere=" +
        anywhere,
      withCredentials: true,
    });
    return await resp.data;
  };

  const loadViewedUser = async (viewedUsername) => {
    try {
      const resp = await getViewedUser(viewedUsername);
      setViewedUser(resp);
    } catch {
      alert("No such user: " + viewedUsername);
    }
  };

  const getViewedUser = async (viewedUsername) => {
    const resp = await axios({
      method: "get",
      url: process.env.REACT_APP_USERS_URL + viewedUsername,
      withCredentials: true,
    });
    return await resp.data;
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
        user: user,
        setUser: setUser,
        roles: roles,
        setRoles: setRoles,
        viewedUser: viewedUser,
        setViewedUser: setViewedUser,
        users: users,
        setUsers: setUsers,
        loadUsers: loadUsers,
        loadCurrentUser: loadCurrentUser,
        loadViewedUser: loadViewedUser,
        getViewedUser: getViewedUser,
        renameCurrentUser: renameCurrentUser,
        deleteAccount: deleteAccount,
        getSearchedUsers: getSearchedUsers,
        searchUsersAndSet: searchUsersAndSet,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
