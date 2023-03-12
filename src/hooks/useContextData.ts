import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const useContextData = () => {
return  useContext(UserContext)
}
export default useContextData