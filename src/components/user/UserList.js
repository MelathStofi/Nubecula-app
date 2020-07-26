import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import UserListRow from "./UserListRow";
import UserSearchList from "./UserSearchList";

const UserList = ({ users }) => {
  const [searchedText, setSearchedText] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const { getSearchedUsers, searchUsersAndSet } = useContext(UserContext);

  const instantSearch = async (searched) => {
    setSearchedText(searched);
    if (searched === "") setSearchedUsers([]);
    else {
      const resp = await getSearchedUsers(searched, "true");
      setSearchedUsers(resp);
    }
  };

  const search = (searched) => {
    searchUsersAndSet(searched);
  };

  return (
    <React.Fragment>
      <div className="user-toolbar">
        <div className="users-title">Users</div>
        <div className="user-search-input-wrapper">
          <input
            className="search-input user-search-input"
            type="text"
            name="user-search"
            autoComplete="off"
            placeholder="Search for users..."
            onClick={(e) => instantSearch(e.target.value)}
            onChange={(e) => instantSearch(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) search(e.target.value);
            }}
          />
        </div>
      </div>

      <UserSearchList
        searchedUsers={searchedUsers}
        setSearchedUsers={setSearchedUsers}
        search={searchedText}
      />
      <div className="user-list">
        {users.map((user) => (
          <UserListRow user={user} key={user.id} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default UserList;
