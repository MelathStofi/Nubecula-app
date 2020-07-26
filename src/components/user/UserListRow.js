import React from "react";
import { useHistory } from "react-router-dom";
import { useLoading } from "../../contexts/Loading";
import DefaultProfPic from "../../resources/def_prof_pic.png";

const UserListRow = ({ user }) => {
  const history = useHistory();
  const { setLoading } = useLoading();

  const handleClick = async () => {
    setLoading(true);
    history.push("/users/" + user.username);
  };

  return (
    <div className="user-list-row" onClick={() => handleClick()}>
      <div className="user-list-row-text">
        <img
          width="55px"
          height="50px"
          src={user.profilePicture ? user.profilePicture : DefaultProfPic}
          alt=""
        />
        &nbsp;&nbsp;{user.username}
      </div>
    </div>
  );
};

export default UserListRow;
