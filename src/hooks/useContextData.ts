import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const useContextData = () => useContext(UserContext);
export default useContextData;
