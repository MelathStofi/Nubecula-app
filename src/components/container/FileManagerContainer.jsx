import React, { useRef } from "react";
import ContextMenu from "../contextmenu/ContextMenu.jsx";

const FileManagerContainer = ({ children, id, menuItems }) => {
  const containerRef = useRef(null);

  return (
    <div className="file-manager-container" ref={containerRef}>
      {children}
      <ContextMenu parentRef={containerRef} id={id} items={menuItems} />
    </div>
  );
};

export default FileManagerContainer;
