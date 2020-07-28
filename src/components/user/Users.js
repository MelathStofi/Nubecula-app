import React, { useEffect, useContext } from "react";
import axios from "axios";
import UserList from "./UserList";
import "./styles/UserExplorerStyle.css";
import { useLoading, LoadingScreen } from "../../contexts/Loading";
import { UserContext } from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";

const Users = () => {
  const { loading, setLoading } = useLoading();
  const { users, setUsers } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const search = new URLSearchParams(location.search).get("search");
    if (search != null) {
      axios({
        method: "get",
        url:
          process.env.REACT_APP_USERS_URL +
          "?search=" +
          search +
          "&anywhere=true",
        withCredentials: true,
      }).then((resp) => {
        if (resp) {
          setUsers(resp.data);
          setLoading(false);
        }
      });
    } else {
      let id = new URLSearchParams(location.search).get("id");
      if (id == null) id = "";
      axios({
        method: "get",
        url: process.env.REACT_APP_USERS_URL + id,
        withCredentials: true,
      })
        .catch((error) => {
          setLoading(false);
        })
        .then((resp) => {
          if (resp) {
            setUsers(resp.data);
            setLoading(false);
          }
        });
    }
  }, [setUsers, setLoading, location.search]);

  if (loading) return <LoadingScreen />;
  return (
    <div>
      <UserList users={users} />
    </div>
  );
};

export default Users;
