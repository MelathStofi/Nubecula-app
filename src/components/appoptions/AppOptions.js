import React, { useContext } from "react";

import "./styles/AppOptionsStyle.css";
import { AppOptionsContext } from "../../contexts/AppOptionsContext";
import { ClickAwayListener } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const AppOptions = (props) => {
  const history = useHistory();
  const { showAppOptions, setShowAppOptions, logout } = useContext(
    AppOptionsContext
  );

  const options = [
    {
      text: "Me",
      id: "me-opt",
      onClick: () => {
        setShowAppOptions(false);
      },
    },
    {
      text: "My files",
      id: "file-manager-opt",
      onClick: () => {
        history.push("/file-manager");
        setShowAppOptions(false);
      },
    },
    {
      text: "Users",
      id: "users-opt",
      onClick: () => {
        setShowAppOptions(false);
      },
    },
    {
      text: "Log out",
      id: "logout-opt",
      onClick: () => {
        logout();
        setShowAppOptions(false);
      },
    },
  ];

  return showAppOptions ? (
    <ClickAwayListener onClickAway={() => setShowAppOptions(false)}>
      <div className="App-options-card">
        <div className="App-options">
          {options.map((item, index) => {
            return (
              <div
                key={index}
                id={item.id}
                onClick={item.onClick}
                className="app-option_item"
              >
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
    </ClickAwayListener>
  ) : null;
};

export default AppOptions;
