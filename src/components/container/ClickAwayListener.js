import React, { useContext } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { FMContext } from "../../contexts/FMContext";

export default function ClickAway(props) {
  const { setIsRename } = useContext(FMContext);

  const handleClickAway = () => {
    setIsRename(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      {props.children}
    </ClickAwayListener>
  );
}
