import React, { useRef, useCallback } from "react";
import { ContextMenu } from "react-contextmenu";

const FileManagerContainer = ({ children }) => {
  const containerRef = useRef(null);

  const myRef = useCallback((node) => {
    if (node !== null) {
    }
  }, []);

  return (
    <div className="file-manager-container" ref={containerRef}>
      {children}
      <ContextMenu parentRef={containerRef} />
    </div>
  );
};

export default FileManagerContainer;
