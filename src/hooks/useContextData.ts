import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useContextData = () => useContext(UserContext);
export default useContextData;
