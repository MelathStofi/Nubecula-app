import { useRef, useEffect } from "react";

export function usePrevious(path) {
  const ref = useRef();
  useEffect(() => {
    ref.current = path;
  });
  return ref.current;
}
