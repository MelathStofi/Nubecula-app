import React, { useContext } from "react";

import "./styles/AppOptionsStyle.css";
import { AppOptionsContext } from "../../contexts/AppOptionsContext";
import { ClickAwayListener } from "@material-ui/core";

const AppOptions = (props) => {
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
