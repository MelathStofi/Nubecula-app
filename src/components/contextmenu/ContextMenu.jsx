import React, { useState, useEffect } from "react";
import "./styles/ContextMenuStyle.css";
import { useContext } from "react";
import { ContextMenuContext } from "../../contexts/ContextMenuContext";

const ContextMenu = ({ parentRef, id, items }) => {
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { setCurrentMenu } = useContext(ContextMenuContext);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) {
      return;
    }

    const showMenu = (event) => {
      setCurrentMenu("");
      event.preventDefault();
      setVisible(true);
      setX(event.clientX);
      setY(event.clientY);
    };

    const closeMenu = () => {
      setVisible(false);
      setCurrentMenu("");
    };

    parent.addEventListener("contextmenu", showMenu);
    window.addEventListener("click", closeMenu);

    return function cleanup() {
      parent.removeEventListener("contextmenu", showMenu);
      window.removeEventListener("click", closeMenu);
    };
  });

  const style = {
    top: y,
    left: x,
  };

  return visible ? (
    <div className="context-menu" style={style}>
      {items.map((item, index) => {
        return (
          <div
            key={index}
            id={item.id}
            onClick={item.onClick}
            className="context-menu__item"
          >
            {item.text}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default ContextMenu;
