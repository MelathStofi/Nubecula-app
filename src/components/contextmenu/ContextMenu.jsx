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

  function setStyle() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (x >= width - 200) {
      if (y >= height - items.length * 30) {
        return { bottom: height - y, right: width - x };
      }
      return { top: y, right: width - x };
    } else if (y >= height - items.length * 30)
      return { bottom: height - y, left: x };
    return { top: y, left: x };
  }

  return visible && items.length !== 0 ? (
    <div className="context-menu" style={setStyle()}>
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
