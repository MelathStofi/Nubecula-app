import React, { useState, useEffect } from "react";
import "./styles/ContextMenuStyles.css";

const ContextMenu = ({ parentRef }) => {
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    console.log(parentRef.current);
    const parent = parentRef.current;
    if (!parent) return;

    const showMenu = (event) => {
      event.preventDefault();
      setVisible(true);
      setX(event.clientX);
      setY(event.clientY);
    };

    const closeMenu = (event) => {
      event.preventDefault();
      setVisible(false);
      setX(0);
      setY(0);
    };

    parent.addEventListener("contextmenu", showMenu);
    window.addEventListener("click", closeMenu);

    return function cleanUp() {
      parent.removeEventListener("contextmenu", showMenu);
      window.removeEventListener("click", closeMenu);
    };
  }, [setVisible, setX, setY, parentRef]);

  return visible ? (
    <div className="custom-context" id="text">
      menu
    </div>
  ) : (
    <div></div>
  );
};

export default ContextMenu;
