import React, { createContext, useState } from "react";

export const ContextMenuContext = createContext();

export const ContextMenuProvider = (props) => {
  const [currentMenu, setCurrentMenu] = useState("-");
  const [optionClicked, setOptionClicked] = useState(false);

  return (
    <ContextMenuContext.Provider
      value={{
        currentMenu: currentMenu,
        setCurrentMenu: setCurrentMenu,
        optionClicked: optionClicked,
        setOptionClicked: setOptionClicked,
      }}
    >
      {props.children}
    </ContextMenuContext.Provider>
  );
};
