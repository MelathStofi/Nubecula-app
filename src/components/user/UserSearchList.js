import React, { useContext } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import "./styles/UserSearchStyle.css";
import DefaultProfPic from "../../resources/def_prof_pic.png";
import { useHistory } from "react-router-dom";

const UserSearchList = ({ searchedUsers, setSearchedUsers, search }) => {
  const { setViewedUser } = useContext(UserContext);
  const history = useHistory();

  const handleClick = (user) => {
    setViewedUser(user);
    history.push("/users/" + user.username);
  };

  const getUsername = (username) => {
    username = username.toLowerCase();
    const arr = username.split(search);
    let str = [];
    for (let i = 0; i < arr.length - 1; i++) {
      str.push(arr[i]);
      str.push(
        <span style={{ fontWeight: "bold", color: "#545454" }} key={i}>
          {search}
        </span>
      );
    }
    str.push(arr[arr.length - 1]);
    return str;
  };

  return searchedUsers.length !== 0 ? (
    <ClickAwayListener onClickAway={() => setSearchedUsers([])}>
      <div className="u-search-list">
        {searchedUsers.map((user) => (
          <div
            key={user.id}
            className="u-search-list-row"
            onClick={() => handleClick(user)}
          >
            <img
              width="28px"
              height="27px"
              src={user.profilePicture ? user.profilePicture : DefaultProfPic}
              alt=""
            />
            <div className="u-search-list-text">
              &nbsp;&nbsp;{getUsername(user.username)}
            </div>
          </div>
        ))}
      </div>
    </ClickAwayListener>
  ) : null;
};

export default UserSearchList;
