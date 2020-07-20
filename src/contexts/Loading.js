import React, { createContext, useContext } from "react";

export const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingScreen = () => {
  return (
    <div
      id="loading"
      style={{
        height: "calc(100vh - 5rem)",
        width: "100vw",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <span style={{ margin: "0", position: "absolute", top: "50%" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.0"
          width="80px"
          height="80px"
          viewBox="0 0 128 128"
        >
          <circle cx="64" cy="64" r="12" fill="#90c5ae" />
          <g>
            <circle cx="108.5" cy="89.75" r="12.5" fill="#90c5ae" />
            <circle
              cx="108.5"
              cy="89.75"
              r="12.5"
              fill="#90c5ae"
              transform="rotate(180 64 64)"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 64 64"
              to="180 64 64"
              dur="720ms"
              repeatCount="indefinite"
            ></animateTransform>
          </g>
        </svg>
      </span>
    </div>
  );
};
