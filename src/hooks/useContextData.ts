import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useContextData = () => {
  return useContext(UserContext);
};
export default useContextData;
