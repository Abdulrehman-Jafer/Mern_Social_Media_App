import { useEffect, RefObject } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, action: () => void) => {
  const handleOutSideClick = (event: MouseEvent) => {
    if (!ref.current?.contains(event.target as Node)) action();
  };
  useEffect(() => {
    window.addEventListener("click", handleOutSideClick);
    return () => window.removeEventListener("click", handleOutSideClick);
  }, []);
};

export default useClickOutside;
