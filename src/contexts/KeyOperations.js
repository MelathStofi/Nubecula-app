import { useState, useEffect } from "react";

function useKeyPress() {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);

  // If pressed key is our target key then set to true
  function downHandler(e) {
    e = e || window.event;
    var key = e.which || e.keyCode; // keyCode detection
    var ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false; // ctrl detection

    if (key === 86 && ctrl) {
      console.log("Ctrl + V Pressed !");
    } else if (key === 67 && ctrl) {
      console.log("Ctrl + C Pressed !");
    }
  }

  // If released key is our target key then set to false
  const upHandler = (e) => {
    console.log("f");
  };

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", (event) => downHandler(event));
    window.addEventListener("keyup", (event) => upHandler(event));
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", (event) => downHandler(event));
      window.removeEventListener("keyup", (event) => upHandler(event));
    };
  }); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}

export default function getPressedKey(props) {
  const keyPressed = useKeyPress();
  return keyPressed;
}
